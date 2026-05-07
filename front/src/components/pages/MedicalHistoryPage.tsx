import { Heart, ArrowLeft, ArrowRight } from 'lucide-react';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { FormData } from '../Dashboard';

interface MedicalHistoryPageProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onBack: () => void;
  onNext: () => void;
}

export function MedicalHistoryPage({ formData, updateFormData, onBack, onNext }: MedicalHistoryPageProps) {
  return (
    <Card className="p-8 shadow-2xl bg-slate-800/50 backdrop-blur-sm border-purple-500/30">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
          <Heart className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">Medical History</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-pink-400 mb-4">Medical History Features (Relevant health conditions)</h3>
          <div className="space-y-4 bg-slate-900/30 p-6 rounded-lg border border-purple-500/20">
            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-purple-500/10 transition-colors border border-purple-500/20">
              <Label
                htmlFor="MH12RENA"
                className="text-gray-300 cursor-pointer flex-1"
              >
                MH12RENA <span className="text-gray-500 text-sm">(Renal/Urinary condition)</span>
              </Label>
              <Switch
                id="MH12RENA"
                checked={formData.MH12RENA}
                onCheckedChange={(checked) => updateFormData({ MH12RENA: checked })}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-pink-500"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-purple-500/10 transition-colors border border-purple-500/20">
              <Label
                htmlFor="MH2NEURL"
                className="text-gray-300 cursor-pointer flex-1"
              >
                MH2NEURL <span className="text-gray-500 text-sm">(Neurological condition)</span>
              </Label>
              <Switch
                id="MH2NEURL"
                checked={formData.MH2NEURL}
                onCheckedChange={(checked) => updateFormData({ MH2NEURL: checked })}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-pink-500"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-purple-500/10 transition-colors border border-purple-500/20">
              <Label
                htmlFor="MH16SMOK"
                className="text-gray-300 cursor-pointer flex-1"
              >
                MH16SMOK <span className="text-gray-500 text-sm">(Smoking history)</span>
              </Label>
              <Switch
                id="MH16SMOK"
                checked={formData.MH16SMOK}
                onCheckedChange={(checked) => updateFormData({ MH16SMOK: checked })}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-pink-500"
              />
            </div>
          </div>
        </div>

        {/* Arabic Tip */}
        <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
          <p className="text-gray-300 text-sm">
            <span className="text-pink-400">Advice:</span> Please fill all required fields carefully to get the most accurate prediction.
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="border-pink-400/50 bg-slate-900/50 text-pink-400 hover:bg-pink-400/10 hover:border-pink-400 px-6 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Back</span>
          </Button>
          <Button
            onClick={onNext}
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-400 hover:via-purple-400 hover:to-pink-400 text-white px-6 rounded-lg shadow-lg shadow-pink-500/30"
          >
            <span>View Results</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
