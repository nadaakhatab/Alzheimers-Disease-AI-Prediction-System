# 🧠 Alzheimer’s Disease Prediction System

### AI-Powered Early Cognitive Risk Assessment Platform
---

## 🌟 Project Overview

This project is an AI-based system designed to help predict cognitive conditions related to Alzheimer’s Disease using clinical, demographic, genetic, imaging, and medical-history features.

The system uses Machine Learning and XGBoost to classify patients into three categories:

* **Normal Cognition**
* **Mild Cognitive Impairment (MCI)**
* **Alzheimer’s Disease**

The goal of this project is **not** to replace doctors or medical diagnosis.
Instead, it works as a supportive intelligent system that may help with:

* early risk detection
* medical research
* AI healthcare experiments
* educational purposes
* clinical decision support

---

# ❤️ Why This Project Matters

Alzheimer’s disease affects millions of people worldwide.
One of the biggest challenges is detecting cognitive decline early enough.

This project tries to explore how Artificial Intelligence can help by analyzing different types of medical data together instead of looking at only one factor.

The model combines:

* cognitive test scores
* age and gender
* genetics (APOE alleles)
* imaging biomarkers
* medical history

This creates a more complete understanding of patient risk.

---

# 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │     React Frontend  │
                    │  User Input Form    │
                    └──────────┬──────────┘
                               │ HTTP Request
                               ▼
                    ┌─────────────────────┐
                    │     Flask API       │
                    │      app.py         │
                    └──────────┬──────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
                ▼                             ▼
      ┌─────────────────┐         ┌──────────────────┐
      │ Data Processing │         │ Feature Engineering│
      │ Scaling / Logs  │         │ APOE Risk System  │
      └─────────────────┘         └──────────────────┘
                │
                ▼
      ┌─────────────────────┐
      │   XGBoost Model     │
      │ Multi-Class AI      │
      └──────────┬──────────┘
                 │
                 ▼
      ┌─────────────────────┐
      │ Prediction Results  │
      │ Confidence Scores   │
      │ Medical Advice      │
      └─────────────────────┘
```

---

# 📁 Project Structure

```text
TRY8/
│
├── front/                 → Frontend folder (React + Vite)
│   ├── src/
│   ├── node_modules/
│   ├── package.json
│   └── vite.config.ts
│
├── test/                  → Test examples and sample values
│   ├── T1.png
│   ├── T2.png
│   └── T3.png
│
├── app.py                 → Flask backend API
├── Model.py               → Main model training code
├── Model.ipynb            → Jupyter notebook version
├── AIBL.csv               → Dataset file
├── model.joblib           → Saved trained model
├── scaler.joblib          → Saved scaler
├── requirements.txt       → Python dependencies
└── README.md
```

---

# 🧪 Dataset Information

Dataset used in this project:

## AIBL Dataset

**Australian Imaging, Biomarkers and Lifestyle Study of Ageing**

The dataset contains multiple categories of patient information, including:

* Clinical cognitive scores
* MRI/PET imaging biomarkers
* Genetic information
* Medical history
* Demographic data

---

# 🧬 Machine Learning Workflow

The project follows a full ML pipeline from preprocessing to explainability.

---

## 1️⃣ Data Cleaning

The system first cleans and prepares the dataset by:

* removing missing values
* filtering invalid ages
* handling categorical variables
* dropping unused columns

Example:

```python
df = df[(df['Age'] >= 50) & (df['Age'] <= 100)]
```

---

## 2️⃣ Feature Engineering

Several custom transformations were applied.

### Age Calculation

```python
df['Age'] = df['Examyear'] - df['PTDOBYear']
```

### Gender Encoding

```python
df['PTGENDER'] = df['PTGENDER'].map({1:0, 2:1})
```

### APOE Genetic Risk Multiplier

One of the most important parts of the project.

The model converts APOE alleles into a meaningful genetic risk score.

Example:

| APOE Type | Risk       |
| --------- | ---------- |
| e3/e3     | Average    |
| e3/e4     | High       |
| e4/e4     | Very High  |
| e2/e2     | Protective |

This creates a more medically meaningful feature instead of using raw genetic numbers.

---

## 3️⃣ Feature Groups

The project analyzes different categories separately before building the final model.

### Clinical Features

* CDGLOBAL
* MMSCORE
* LIMMTOTAL
* LDELTOTAL

### Demographic Features

* Age
* PTGENDER

### Genetic Features

* APGEN1
* APGEN2

### Imaging Features

* RCT392
* RCT6
* HMT3
* HMT40
* and more...

### Medical Features

* smoking history
* neurological conditions
* renal history
* other diseases

---

# 📊 Models Used

This project compares multiple Machine Learning models.

---

## 🌲 Random Forest

Used for:

* feature importance analysis
* baseline classification
* comparison studies

---

## 📉 Logistic Regression (LASSO)

Used with:

* L1 regularization
* feature selection
* interpretability

---

## 🚀 XGBoost (Final Model)

The final production model uses XGBoost because it achieved the best overall performance.

### Why XGBoost?

* strong performance
* handles complex relationships
* works well with tabular medical data
* good feature importance analysis
* scalable and fast

---

# 📈 Model Evaluation

The project includes several evaluation methods:

* Accuracy
* Classification Report
* Confusion Matrix
* Macro F1 Score
* Balanced Accuracy
* Cross Validation

---

# 🔍 Explainable AI (SHAP)

A very important part of this project is explainability.

The system uses SHAP analysis to understand:

* which features affect predictions most
* how features influence Alzheimer’s risk
* model behavior transparency

This helps make the AI system more understandable and trustworthy.

---

# ⚡ Backend API

The backend is built using Flask.

Main file:

```text
app.py
```

The backend:

* loads the trained model
* processes input data
* performs prediction
* returns JSON results

---

## Example API Response

```json
{
  "prediction": "Mild Cognitive Impairment (MCI)",
  "confidence": 0.91,
  "recommendation": "Possible early memory issues. See a doctor soon."
}
```

---

# 🎨 Frontend

The frontend was built using:

* React
* Vite
* JavaScript/TypeScript

The interface allows users to:

* enter patient information
* submit data
* view prediction results
* see confidence levels

---

# 🛠️ Technologies Used

## Programming Languages

* Python
* JavaScript
* TypeScript

## Machine Learning

* Scikit-learn
* XGBoost
* SHAP

## Backend

* Flask
* Flask-CORS

## Frontend

* React
* Vite

## Data Visualization

* Matplotlib
* Seaborn

---

# ▶️ How to Run the Project

# 🚀 How To Run

## Step 1 — Install Frontend Packages

### (ONLY DONE ONCE)

Goal: prepare the frontend project.

Open terminal and write:

```bash
cd front
npm install
```

---

## Step 2 — Run Backend + Frontend

Open **TWO terminals**.

---

### Terminal 1 → Run Flask Backend

```bash
python app.py
```

---

### Terminal 2 → Run Frontend

```bash
cd front
npm run dev
```

---

## Step 3 — Test The System

Go to the:

```text
test/
```

folder and try the provided test values/images.

---

# 🧠 Prediction Classes

| Class | Meaning                   |
| ----- | ------------------------- |
| 0     | Normal Cognition          |
| 1     | Mild Cognitive Impairment |
| 2     | Alzheimer’s Disease       |

---

# 📦 Saved Files

## model.joblib

Contains the trained XGBoost model.

## scaler.joblib

Contains the trained StandardScaler used during preprocessing.

---

# 🔐 Important Note

This project is for:

* educational purposes
* AI experimentation
* research exploration

It is **NOT** a replacement for professional medical diagnosis.

Always consult medical professionals for real clinical decisions.

---

# 🌍 Future Improvements

Possible future upgrades:

* Deep Learning integration
* MRI image processing
* Better UI/UX
* Cloud deployment
* Real-time dashboards
* Doctor portal
* Patient history tracking
* More explainable AI visualizations

---

# 👩‍💻 About The Developer

Built with passion by Nada ❤️

A student who loves:

* Artificial Intelligence
* healthcare technology
* creativity
* problem solving
* building meaningful systems

This project combines AI, medicine, data science, and software engineering into one complete intelligent platform.

---

# 🤝 Final Words

This project was not only about building a model.

It was about learning:

* how real ML pipelines work
* how healthcare AI systems are designed
* how data becomes decisions
* and how technology can support people in difficult situations

If you are reading this as a student:

keep building.
keep experimenting.
your projects do not need to be perfect to matter.

Real growth comes from trying hard things anyway. 🚀
