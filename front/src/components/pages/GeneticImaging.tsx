import { Dna, Brain, ArrowLeft, ArrowRight } from 'lucide-react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { FormData } from '../Dashboard';

interface GeneticImagingProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onBack: () => void;
  onNext: () => void;
}

export function GeneticImaging({ formData, updateFormData, onBack, onNext }: GeneticImagingProps) {
  return (
    <Card className="p-8 shadow-2xl bg-slate-800/50 backdrop-blur-sm border-purple-500/30">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
          <Dna className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">Genetic & Imaging Data</h2>
      </div>

      <div className="space-y-6">
        {/* Genetic Features */}
        <div>
          <h3 className="text-pink-400 mb-4 flex items-center gap-2">
            <Dna className="w-5 h-5" />
            Genetic Features (APOE4 genotype markers)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="APGEN1" className="text-gray-300">APGEN1</Label>
              <Input
                id="APGEN1"
                type="text"
                placeholder="Example: 3 or 4"
                value={formData.APGEN1}
                onChange={(e) => updateFormData({ APGEN1: e.target.value })}
                className="rounded-lg bg-slate-900/50 border-purple-500/30 text-white placeholder:text-gray-500 focus-visible:border-pink-400 focus-visible:ring-pink-400/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="APGEN2" className="text-gray-300">APGEN2</Label>
              <Input
                id="APGEN2"
                type="text"
                placeholder="Example: 3 or 4"
                value={formData.APGEN2}
                onChange={(e) => updateFormData({ APGEN2: e.target.value })}
                className="rounded-lg bg-slate-900/50 border-purple-500/30 text-white placeholder:text-gray-500 focus-visible:border-pink-400 focus-visible:ring-pink-400/50"
              />
            </div>
          </div>
        </div>

        {/* Imaging Features */}
        <div>
          <h3 className="text-pink-400 mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5" />
            🧠 Imaging Features (MRI/PET scan values)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="RCT392" className="text-gray-300">RCT392</Label>
              <Input
                id="RCT392"
                type="text"
                placeholder="Enter value"
                value={formData.RCT392}
                onChange={(e) => updateFormData({ RCT392: e.target.value })}
                className="rounded-lg bg-slate-900/50 border-purple-500/30 text-white placeholder:text-gray-500 focus-visible:border-pink-400 focus-visible:ring-pink-400/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="RCT6" className="text-gray-300">RCT6</Label>
              <Input
                id="RCT6"
                type="text"
                placeholder="Enter value"
                value={formData.RCT6}
                onChange={(e) => updateFormData({ RCT6: e.target.value })}
                className="rounded-lg bg-slate-900/50 border-purple-500/30 text-white placeholder:text-gray-500 focus-visible:border-pink-400 focus-visible:ring-pink-400/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="RCT20" className="text-gray-300">RCT20</Label>
              <Input
                id="RCT20"
                type="text"
                placeholder="Enter value"
                value={formData.RCT20}
                onChange={(e) => updateFormData({ RCT20: e.target.value })}
                className="rounded-lg bg-slate-900/50 border-purple-500/30 text-white placeholder:text-gray-500 focus-visible:border-pink-400 focus-visible:ring-pink-400/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="HMT3" className="text-gray-300">HMT3</Label>
              <Input
                id="HMT3"
                type="text"
                placeholder="Enter value"
                value={formData.HMT3}
                onChange={(e) => updateFormData({ HMT3: e.target.value })}
                className="rounded-lg bg-slate-900/50 border-purple-500/30 text-white placeholder:text-gray-500 focus-visible:border-pink-400 focus-visible:ring-pink-400/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="HMT40" className="text-gray-300">HMT40</Label>
              <Input
                id="HMT40"
                type="text"
                placeholder="Enter value"
                value={formData.HMT40}
                onChange={(e) => updateFormData({ HMT40: e.target.value })}
                className="rounded-lg bg-slate-900/50 border-purple-500/30 text-white placeholder:text-gray-500 focus-visible:border-pink-400 focus-visible:ring-pink-400/50"
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
            <span>Next</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
