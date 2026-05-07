import { Check } from 'lucide-react';

interface ProgressStepperProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressStepper({ currentStep, totalSteps }: ProgressStepperProps) {
  const steps = [
    'Clinical & Demographic',
    'Genetic & Imaging',
    'Medical History',
    'Result',
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  index < currentStep
                    ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg'
                    : index === currentStep
                    ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white ring-4 ring-pink-400/40 shadow-lg shadow-pink-500/50'
                    : 'bg-slate-700 text-gray-400 border border-slate-600'
                }`}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={`text-xs mt-2 text-center max-w-[80px] ${
                  index <= currentStep ? 'text-pink-400' : 'text-gray-500'
                }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 rounded transition-all ${
                  index < currentStep ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500' : 'bg-slate-700'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
