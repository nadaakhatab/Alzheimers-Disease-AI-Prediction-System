import pandas as pd
import numpy as np
import xgboost as xgb
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

app = Flask(__name__)
CORS(app)  # Works with your React/Vue frontend

FEATURES = [
    'CDGLOBAL',           # Clinical score
    'Age', 'PTGENDER',    # Demographics
    'APOE_risk_multiplier',  # ← NEW: genetic risk (we calculate it inside)
    'RCT392', 'RCT6', 'RCT20', 'HMT3', 'HMT40',   # Best imaging
    'MH12RENA', 'MH2NEURL', 'MH16SMOK'           # Medical history
]

# Imaging columns that need log transform
LOG_FEATURES = ['RCT6', 'RCT20', 'RCT392']

def get_apoe_risk_multiplier(apgen1, apgen2):
    """Convert APOE alleles → risk multiplier (0.4 to 12.0)"""
    # Mapping: 2=e2, 3=e3, 4=e4
    alleles = []
    if apgen1 in [2,3,4]: alleles.append(apgen1)
    if apgen2 in [2,3,4]: alleles.append(apgen2)
    if not alleles: return 1.0  # default if missing

    e2_count = alleles.count(2)
    e3_count = alleles.count(3)
    e4_count = alleles.count(4)

    # Real medical risk values
    if e4_count == 2:      return 12.0   # e4/e4 → very high
    if e4_count == 1 and e3_count == 1: return 3.2   # e3/e4
    if e4_count == 1 and e2_count == 1: return 2.0   # e2/e4
    if e4_count == 0 and e3_count == 2: return 1.0   # e3/e3 (average)
    if e2_count == 1:      return 0.5   # any e2 → protective
    if e2_count == 2:      return 0.4   # e2/e2 → very protective
    return 1.0

MODEL_FILE = "model.joblib"
SCALER_FILE = "scaler.joblib"

def train_and_save():
    print("First time → training the model...")
    df = pd.read_csv("AIBL.csv")

    # Create label
    df['DX'] = np.select([df['DXNORM']==1, df['DXMCI']==1, df['DXAD']==1], [0,1,2], default=0)
    df = df.drop(columns=['DXNORM','DXMCI','DXAD','DXCURREN'], errors='ignore')

    # Age & gender
    df['Age'] = df['Examyear'] - df['PTDOBYear']
    df['PTGENDER'] = df['PTGENDER'].map({1:0, 2:1})
    df = df[(df['Age'] >= 50) & (df['Age'] <= 100)]

    # Add genetic risk multiplier
    df['APOE_risk_multiplier'] = df.apply(
        lambda row: get_apoe_risk_multiplier(row['APGEN1'], row['APGEN2']), axis=1
    )

    # Log transform skewed imaging
    for col in LOG_FEATURES:
        if col in df.columns:
            df[col] = np.log1p(np.abs(df[col]))

    # Clean data
    df = df.dropna(subset=FEATURES + ['DX'])

    X = df[FEATURES]
    y = df['DX']

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)

    # Class weights (Alzheimer is rare)
    weights = y_train.map({0:1.0, 1:4.5, 2:6.0})

    dtrain = xgb.DMatrix(X_train_scaled, label=y_train, weight=weights)

    params = {
        'objective': 'multi:softprob',
        'num_class': 3,
        'max_depth': 5,
        'learning_rate': 0.05,
        'subsample': 0.8,
        'colsample_bytree': 0.8,
        'eval_metric': 'mlogloss'
    }

    model = xgb.train(params, dtrain, num_boost_round=300,
                    early_stopping_rounds=50,
                    evals=[(dtrain,'train')], verbose_eval=False)

    joblib.dump(model, MODEL_FILE)
    joblib.dump(scaler, SCALER_FILE)
    print("Model saved! Next time it will load fast.")

try:
    model = joblib.load(MODEL_FILE)
    scaler = joblib.load(SCALER_FILE)
    print("Model loaded – ready!")
except:
    train_and_save()
    model = joblib.load(MODEL_FILE)
    scaler = joblib.load(SCALER_FILE)

# ===================== TEXT RESULTS =====================
DIAGNOSIS = {0:"Normal Cognition", 1:"Mild Cognitive Impairment (MCI)", 2:"Alzheimer's Disease"}
RECOMMEND = {
    0: "No problems found. Keep healthy lifestyle.",
    1: "Possible early memory issues. See a doctor soon.",
    2: "High risk of Alzheimer's. Visit a neurologist now!"
}

# ===================== API =====================
@app.route('/')
def home():
    return jsonify({"message": "Alzheimer AI ready", "date": "2025"})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)

        # ----- Get values (same names as your old frontend) -----
        input_data = {
            'CDGLOBAL': float(data.get('CDGLOBAL', 0)),
            'Age': int(data.get('Age', 70)),
            'PTGENDER': 0 if str(data.get('PTGENDER','male')).lower().startswith('m') else 1,

            # Genetic (raw alleles)
            'APGEN1': int(data.get('APGEN1', 3)),
            'APGEN2': int(data.get('APGEN2', 3)),

            # Imaging
            'RCT392': float(data.get('RCT392', 1.0)),
            'RCT6':   float(data.get('RCT6', 35)),
            'RCT20':  float(data.get('RCT20', 160)),
            'HMT3':   float(data.get('HMT3', 4.5)),
            'HMT40':  float(data.get('HMT40', 14)),

            # Medical history yes/no
            'MH12RENA': 1 if data.get('MH12RENA') else 0,
            'MH2NEURL': 1 if data.get('MH2NEURL') else 0,
            'MH16SMOK': 1 if data.get('MH16SMOK') else 0,
        }

        # ----- Add genetic risk multiplier -----
        input_data['APOE_risk_multiplier'] = get_apoe_risk_multiplier(
            input_data['APGEN1'], input_data['APGEN2']
        )

        # ----- Log transform imaging -----
        df_input = pd.DataFrame([input_data])
        for col in LOG_FEATURES:
            df_input[col] = np.log1p(np.abs(df_input[col]))

        # ----- Scale and predict -----
        X = df_input[FEATURES]
        X_scaled = scaler.transform(X)
        dmatrix = xgb.DMatrix(X_scaled)
        probs = model.predict(dmatrix)[0]

        pred = int(np.argmax(probs))
        confidence = float(max(probs))

        result = {
            "prediction": DIAGNOSIS[pred],
            "confidence": round(confidence, 3),
            "probabilities": {
                "Normal": round(float(probs[0]), 3),
                "MCI": round(float(probs[1]), 3),
                "Alzheimers": round(float(probs[2]), 3)
            },
            "recommendation": RECOMMEND[pred],
            "genetic_risk_multiplier": round(input_data['APOE_risk_multiplier'], 2)
        }
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)