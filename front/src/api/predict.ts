import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/predict';

export interface PredictionResponse {
  prediction: string;
  confidence: number;
  probabilities: {
    Normal: number;
    MCI: number;
    Alzheimers: number;
  };
  recommendation: string;
  genetic_risk_multiplier?: number;   // ← This is the important addition
}

export const predictAlzheimer = async (formData: any): Promise<PredictionResponse> => {
  const payload = {
    CDGLOBAL: parseFloat(formData.CDGLOBAL) || 0,
    Age: parseInt(formData.Age) || 70,
    PTGENDER: formData.PTGENDER || "Female",
    MMSCORE: parseInt(formData.MMSCORE) || 24,
    LIMMTOTAL: parseInt(formData.LIMMTOTAL) || 10,
    LDELTOTAL: parseInt(formData.LDELTOTAL) || 7,
    APGEN1: parseInt(formData.APGEN1) || 3,
    APGEN2: parseInt(formData.APGEN2) || 3,
    RCT392: parseFloat(formData.RCT392) || 1.0,
    RCT6: parseFloat(formData.RCT6) || 35.0,
    RCT20: parseFloat(formData.RCT20) || 160.0,
    HMT3: parseFloat(formData.HMT3) || 4.0,
    HMT40: parseFloat(formData.HMT40) || 12.0,
    HMT13: parseFloat(formData.HMT13) || 240,
    HMT102: parseFloat(formData.HMT102) || 30,
    MH12RENA: formData.MH12RENA ? 1 : 0,
    MH2NEURL: formData.MH2NEURL ? 1 : 0,
    MH16SMOK: formData.MH16SMOK ? 1 : 0,
    MH6HEPAT: formData.MH6HEPAT ? 1 : 0,
    MH4CARD: formData.MH4CARD ? 1 : 0,
  };

  const response = await axios.post<PredictionResponse>(API_URL, payload, {
    headers: { 'Content-Type': 'application/json' },
    timeout: 30000,
  });

  return response.data;
};