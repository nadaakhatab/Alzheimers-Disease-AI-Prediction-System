import { Activity, ArrowRight } from 'lucide-react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { FormData } from '../Dashboard';

interface ClinicalDemographicProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
}

export function ClinicalDemographic({ formData, updateFormData, onNext }: ClinicalDemographicProps) {
  return (
    <Card className="p-8 shadow-2xl bg-slate-800/50 backdrop-blur-sm border-purple-500/30">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
          <Activity className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">Clinical & Demographic Data</h2>
      </div>

      <div className="space-y-6">
        {/* Clinical Feature */}
        <div>
          <h3 className="text-pink-400 mb-4">Clinical Feature</h3>
          <div className="space-y-2">
            <Label htmlFor="CDGLOBAL" className="text-gray-300">
              CDGLOBAL <span className="text-gray-500 text-sm">(Overall clinical dementia rating)</span>
            </Label>
            <Input
              id="CDGLOBAL"
              type="text"
              placeholder="Example: 0, 0.5, 1, 2, or 3"
              value={formData.CDGLOBAL}
              onChange={(e) => updateFormData({ CDGLOBAL: e.target.value })}
              className="rounded-lg bg-slate-900/50 border-purple-500/30 text-white placeholder:text-gray-500 focus-visible:border-pink-400 focus-visible:ring-pink-400/50"
            />
          </div>
        </div>

        {/* Demographic Features */}
        <div>
          <h3 className="text-pink-400 mb-4">Demographic Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="Age" className="text-gray-300">
                Age <span className="text-gray-500 text-sm">(Patient's age in years)</span>
              </Label>
              <Input
                id="Age"
                type="number"
                placeholder="Example: 65"
                value={formData.Age}
                onChange={(e) => updateFormData({ Age: e.target.value })}
                className="rounded-lg bg-slate-900/50 border-purple-500/30 text-white placeholder:text-gray-500 focus-visible:border-pink-400 focus-visible:ring-pink-400/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="PTGENDER" className="text-gray-300">
                PTGENDER <span className="text-gray-500 text-sm">(Gender: Male/Female)</span>
              </Label>
              <Select value={formData.PTGENDER} onValueChange={(value) => updateFormData({ PTGENDER: value })}>
                <SelectTrigger className="rounded-lg bg-slate-900/50 border-purple-500/30 text-white focus:border-pink-400 focus:ring-pink-400/50">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-purple-500/30">
                  <SelectItem value="Male" className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20">Male</SelectItem>
                  <SelectItem value="Female" className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Arabic Tip */}
        <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
          <p className="text-gray-300 text-sm">
            <span className="text-pink-400">Advice:</span> Please fill all required fields carefully to get the most accurate prediction.
          </p>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={onNext}
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-400 hover:via-purple-400 hover:to-pink-400 text-white px-6 rounded-lg shadow-lg shadow-pink-500/30"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
