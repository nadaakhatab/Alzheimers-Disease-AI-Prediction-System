import { Brain, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import brainDnaImage from 'figma:asset/bb183a11cbc7c525c4c011d6b61fb802e3f0e0e5.png';

interface HomeProps {
  onNavigate: () => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={brainDnaImage}
          alt="Brain DNA Background"
          className="w-full h-full object-cover"
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full space-y-8 text-center">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl ring-4 ring-pink-400/40">
            <Brain className="w-14 h-14 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-2xl">
          Alzheimer Diagnosis AI
        </h1>

        {/* Description */}
        <div className="max-w-3xl mx-auto">
          <p className="text-base md:text-lg text-gray-100 leading-relaxed drop-shadow-lg">
            This platform uses AI models to assist in the early detection of Alzheimer's Disease through clinical and biomarker (genomic) data.
            It helps researchers and clinicians identify Alzheimer's risk at an early stage.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={onNavigate}
            size="lg"
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-400 hover:via-purple-400 hover:to-pink-400 text-white px-8 py-6 rounded-xl shadow-2xl hover:shadow-pink-500/50 transition-all transform hover:scale-105"
          >
            <span>Try the Model</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
