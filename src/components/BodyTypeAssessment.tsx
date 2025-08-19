import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Brain, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FitnessQuestionnaire from "./FitnessQuestionnaire";
import ApiConfig from "./ApiConfig";
import { AIService, QuestionnaireData, createAIService } from "@/services/aiService";

const BodyTypeAssessment = ({ onAnalysisComplete }: { onAnalysisComplete?: (result: any, questionnaire: QuestionnaireData) => void }) => {
  const [step, setStep] = useState<'config' | 'questionnaire' | 'assessment' | 'analyzing'>('config');
  const [aiService, setAiService] = useState<AIService | null>(null);
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData | null>(null);
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    age: "",
    gender: "",
    activityLevel: "",
    goals: "",
    image: null as File | null
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  // Check if API keys are already saved
  useState(() => {
    const savedGeminiKey = localStorage.getItem('gemini_api_key');
    if (savedGeminiKey) {
      const savedOpenaiKey = localStorage.getItem('openai_api_key');
      setAiService(createAIService(savedGeminiKey, savedOpenaiKey || ''));
      setStep('questionnaire');
    }
  });

  const handleApiConfig = (config: { geminiKey: string; openaiKey: string }) => {
    setAiService(createAIService(config.geminiKey, config.openaiKey));
    setStep('questionnaire');
    toast({
      title: "Configuration Saved! ✅",
      description: "Now let's learn about your fitness profile.",
    });
  };

  const handleQuestionnaireComplete = (data: QuestionnaireData) => {
    setQuestionnaireData(data);
    setStep('assessment');
    toast({
      title: "Assessment Ready! 📸",
      description: "Now upload your photo for body type analysis.",
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiService || !questionnaireData || !formData.image) return;
    
    setIsAnalyzing(true);
    setStep('analyzing');
    
    try {
      // Convert image to base64 for analysis
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const imageBase64 = reader.result as string;
          
          // Analyze body type (mock analysis for now)
          const bodyTypeResult = await aiService.analyzeBodyTypeFromImage(imageBase64);
          
          // Generate personalized recommendations
          const personalizedPlan = await aiService.generatePersonalizedRecommendations(
            bodyTypeResult, 
            questionnaireData
          );
          
          const finalResult = {
            ...bodyTypeResult,
            personalizedPlan
          };
          
          if (onAnalysisComplete) {
            onAnalysisComplete(finalResult, questionnaireData);
          }
          
          toast({
            title: "Analysis Complete! 🎉",
            description: "Your personalized fitness plan is ready!",
          });
        } catch (error) {
          console.error('Analysis error:', error);
          toast({
            title: "Analysis Error",
            description: "There was an issue processing your request. Please try again.",
            variant: "destructive"
          });
        } finally {
          setIsAnalyzing(false);
        }
      };
      reader.readAsDataURL(formData.image);
    } catch (error) {
      console.error('Error:', error);
      setIsAnalyzing(false);
      toast({
        title: "Error",
        description: "Failed to analyze. Please check your API configuration.",
        variant: "destructive"
      });
    }
  };

  return (
    <section id="assessment" className="py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-primary rounded-full p-3">
              <Brain className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            AI Body Type{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Analysis
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your photo and fill in your details for personalized body type classification
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {step === 'config' && (
            <ApiConfig onConfigSaved={handleApiConfig} />
          )}
          
          {step === 'questionnaire' && (
            <FitnessQuestionnaire onComplete={handleQuestionnaireComplete} />
          )}
          
          {step === 'analyzing' && (
            <Card className="shadow-card bg-gradient-card border-0">
              <CardContent className="text-center py-16">
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-primary rounded-full p-6">
                    <Zap className="w-12 h-12 text-primary-foreground animate-spin" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Analyzing Your Body Type...</h3>
                <p className="text-muted-foreground mb-6">
                  Our AI is processing your photo and questionnaire data to provide personalized recommendations.
                </p>
                <div className="w-full bg-muted rounded-full h-2 max-w-md mx-auto">
                  <div className="bg-gradient-primary h-2 rounded-full animate-pulse w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {step === 'assessment' && (
            <Card className="shadow-card bg-gradient-card border-0">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Start Your Assessment</CardTitle>
                <CardDescription className="text-lg">
                  Our AI model will analyze your body type with high accuracy
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Image Upload */}
                  <div className="text-center">
                    <div className="border-2 border-dashed border-border rounded-lg p-8 hover:border-primary/50 transition-colors">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <Label htmlFor="image-upload" className="cursor-pointer">
                        <span className="text-lg font-medium text-primary hover:text-primary/80">
                          Upload Your Photo
                        </span>
                        <p className="text-muted-foreground mt-2">
                          {formData.image ? formData.image.name : "PNG, JPG up to 10MB"}
                        </p>
                      </Label>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>

                  <div className="text-center pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isAnalyzing || !formData.image}
                      className="bg-gradient-primary hover:shadow-glow transition-all duration-300 min-w-[200px]"
                    >
                      <Brain className="w-5 h-5 mr-2" />
                      Analyze Body Type
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default BodyTypeAssessment;