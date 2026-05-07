import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { ProgressStepper } from './ProgressStepper';
import { ClinicalDemographic } from './pages/ClinicalDemographic';
import { GeneticImaging } from './pages/GeneticImaging';
import { MedicalHistoryPage } from './pages/MedicalHistoryPage';
import { Result } from './pages/Result';

export type PageType = 'clinical' | 'genetic' | 'medical' | 'result';

interface DashboardProps {
  onNavigateHome: () => void;
}

export interface FormData {
  // Clinical & Demographic
  CDGLOBAL: string;
  Age: string;
  PTGENDER: string;
  // Genetic & Imaging
  APGEN1: string;
  APGEN2: string;
  RCT392: string;
  RCT6: string;
  RCT20: string;
  HMT3: string;
  HMT40: string;
  // Medical History
  MH12RENA: boolean;
  MH2NEURL: boolean;
  MH16SMOK: boolean;
}

export function Dashboard({ onNavigateHome }: DashboardProps) {
  const [currentPage, setCurrentPage] = useState<PageType>('clinical');
  const [formData, setFormData] = useState<FormData>({
    CDGLOBAL: '',
    Age: '',
    PTGENDER: '',
    APGEN1: '',
    APGEN2: '',
    RCT392: '',
    RCT6: '',
    RCT20: '',
    HMT3: '',
    HMT40: '',
    MH12RENA: false,
    MH2NEURL: false,
    MH16SMOK: false,
  });

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const pages: PageType[] = ['clinical', 'genetic', 'medical', 'result'];
  const currentIndex = pages.indexOf(currentPage);

  return (
    <div className="flex min-h-screen">
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
        onNavigateHome={onNavigateHome}
      />
      
      <div className="flex-1 ml-64">
        <div className="max-w-5xl mx-auto p-8">
          <ProgressStepper 
            currentStep={currentIndex} 
            totalSteps={pages.length - 1}
          />
          
          <div className="mt-8">
            {currentPage === 'clinical' && (
              <ClinicalDemographic
                formData={formData}
                updateFormData={updateFormData}
                onNext={() => setCurrentPage('genetic')}
              />
            )}
            {currentPage === 'genetic' && (
              <GeneticImaging
                formData={formData}
                updateFormData={updateFormData}
                onBack={() => setCurrentPage('clinical')}
                onNext={() => setCurrentPage('medical')}
              />
            )}
            {currentPage === 'medical' && (
              <MedicalHistoryPage
                formData={formData}
                updateFormData={updateFormData}
                onBack={() => setCurrentPage('genetic')}
                onNext={() => setCurrentPage('result')}
              />
            )}
            {currentPage === 'result' && (
              <Result
                formData={formData}
                onBack={() => setCurrentPage('medical')}
                onNavigateHome={onNavigateHome}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
