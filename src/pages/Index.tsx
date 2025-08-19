import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BodyTypeAssessment from "@/components/BodyTypeAssessment";
import BodyTypeResults from "@/components/BodyTypeResults";
import { QuestionnaireData } from "@/services/aiService";

const Index = () => {
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData | null>(null);

  const handleAnalysisComplete = (results: any, questionnaire: QuestionnaireData) => {
    setAnalysisResults(results);
    setQuestionnaireData(questionnaire);
    
    // Scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <BodyTypeAssessment onAnalysisComplete={handleAnalysisComplete} />
      <BodyTypeResults results={analysisResults} questionnaireData={questionnaireData} />
    </div>
  );
};

export default Index;
