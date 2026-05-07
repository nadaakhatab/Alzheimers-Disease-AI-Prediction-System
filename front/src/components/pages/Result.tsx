import { useState, useEffect } from "react";
import {
  Search,
  Home,
  AlertCircle,
  CheckCircle2,
  Info,
  Loader2,
} from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { FormData } from "../Dashboard";
import { predictAlzheimer, PredictionResponse } from "../../api/predict";

// Helper function for genetic risk label
const getGeneticRiskLabel = (multiplier?: number): string => {
  if (multiplier === undefined) return "Not available";
  if (multiplier <= 0.7) return "Low (Protective)";
  if (multiplier <= 2.5) return "Moderate";
  if (multiplier <= 3.5) return "High";
  return "Very High";
};

interface ResultProps {
  formData: FormData;
  onBack: () => void;
  onNavigateHome: () => void;
}

export function Result({ formData, onBack, onNavigateHome }: ResultProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const analyze = async () => {
      try {
        setError(null);
        const prediction = await predictAlzheimer(formData);
        setResult(prediction);
      } catch (err: any) {
        console.error("AI Prediction failed:", err);
        setError(
          "Could not connect to AI server. Is the backend running on port 5000?"
        );
      } finally {
        setIsAnalyzing(false);
      }
    };
    analyze();
  }, [formData]);

  // Safely get result info
  const resultInfo = result
    ? result.prediction.includes("Normal") ||
      result.prediction.includes("Healthy")
      ? {
          title: "Normal Cognitive Function",
          description: result.recommendation || "No significant risk detected.",
          icon: CheckCircle2,
          color: "text-green-400",
          bgColor: "bg-green-500/20",
          borderColor: "border-green-500/50",
        }
      : result.prediction.includes("MCI") || result.prediction.includes("Mild")
      ? {
          title: "Mild Cognitive Impairment (MCI)",
          description: result.recommendation,
          icon: Info,
          color: "text-yellow-400",
          bgColor: "bg-yellow-500/20",
          borderColor: "border-yellow-500/50",
        }
      : {
          title: "Alzheimer's Disease Detected",
          description: result.recommendation,
          icon: AlertCircle,
          color: "text-red-400",
          bgColor: "bg-red-500/20",
          borderColor: "border-red-500/50",
        }
    : null;

  return (
    <Card className="p-8 shadow-2xl bg-slate-800/50 backdrop-blur-sm border-purple-500/30">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
          <Search className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">
          AI Analysis Result
        </h2>
      </div>

      <div className="space-y-6">
        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-16 h-16 text-pink-400 animate-spin mb-6" />
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
              Analyzing with Artificial Intelligence...
            </h3>
            <p className="text-gray-400 mt-3">
              Processing 20+ clinical & biological markers
            </p>
          </div>
        ) : error ? (
          <div className="text-red-400 text-center py-8">
            <AlertCircle className="w-16 h-16 mx-auto mb-4" />
            <p className="text-xl font-semibold">{error}</p>
            <p className="text-sm mt-2">Make sure: python app.py is running</p>
          </div>
        ) : resultInfo ? (
          <div
            className={`border-2 ${resultInfo.borderColor} ${resultInfo.bgColor} rounded-xl p-8`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-16 h-16 ${resultInfo.bgColor} rounded-xl flex items-center justify-center flex-shrink-0 border ${resultInfo.borderColor}`}
              >
                <resultInfo.icon className={`w-10 h-10 ${resultInfo.color}`} />
              </div>
              <div className="flex-1">
                <h3 className={`text-2xl font-bold ${resultInfo.color}`}>
                  {resultInfo.title}
                </h3>
                <p className="text-gray-300 mt-3 text-lg">
                  {resultInfo.description}
                </p>

                {/* Confidence removed - no longer shown */}

                {/* GENETIC RISK SECTION */}
                {result?.genetic_risk_multiplier !== undefined && (
                  <div className="mt-6 pt-6 border-t border-gray-700/50">
                    <h4 className="text-lg font-semibold text-white mb-3">
                      APOE Gene Risk Factor
                    </h4>
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="text-3xl font-bold text-purple-300">
                        {result.genetic_risk_multiplier.toFixed(1)}×
                      </div>
                      <div
                        className={`px-5 py-2 rounded-full text-sm font-medium ${
                          result.genetic_risk_multiplier <= 0.7
                            ? "bg-green-900/50 text-green-300"
                            : result.genetic_risk_multiplier <= 2.5
                            ? "bg-yellow-900/50 text-yellow-300"
                            : result.genetic_risk_multiplier <= 3.5
                            ? "bg-orange-900/50 text-orange-300"
                            : "bg-red-900/50 text-red-300"
                        }`}
                      >
                        {getGeneticRiskLabel(result.genetic_risk_multiplier)}
                      </div>
                    </div>
                    <p className="text-gray-400 mt-3 text-sm">
                      Relative risk compared to average person (based on APOE gene status).
                      This is one of many factors considered.
                    </p>
                  </div>
                )}
                {/* END OF GENETIC RISK */}
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex gap-4 pt-6">
          <Button
            onClick={onBack}
            variant="outline"
            className="border-pink-400/50 bg-slate-900/50 text-pink-400 hover:bg-pink-400/10 px-8"
          >
            Back to Edit
          </Button>
          <Button
            onClick={onNavigateHome}
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 shadow-lg shadow-pink-500/30"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </Card>
  );
}