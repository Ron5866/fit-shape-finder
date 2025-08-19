import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, TrendingUp, Users, Download, Dumbbell, Utensils } from "lucide-react";
import { QuestionnaireData } from "@/services/aiService";

const BodyTypeResults = ({ 
  results, 
  questionnaireData 
}: { 
  results?: any; 
  questionnaireData?: QuestionnaireData;
}) => {
  // Use provided results or mock data for demo
  const analysisResults = results || {
    bodyType: "Mesomorph",
    confidence: 87.3,
    breakdown: {
      endomorph: 25.2,
      ectomorph: 32.1,
      mesomorph: 87.3
    },
    recommendations: [
      "Focus on strength training with moderate cardio",
      "Aim for balanced macronutrients (40% carbs, 30% protein, 30% fat)",
      "Train 4-5 times per week with varied intensity",
      "Include compound movements like squats, deadlifts, and bench press"
    ],
    personalizedPlan: ""
  };

  const getBodyTypeDescription = (type: string) => {
    const descriptions = {
      Mesomorph: "Athletic build with well-defined muscles and low body fat. Naturally muscular and responds well to strength training.",
      Ectomorph: "Lean and long build with difficulty gaining weight. Fast metabolism and naturally thin frame.",
      Endomorph: "Larger bone structure with higher body fat percentage. Tends to gain weight easily and has a slower metabolism."
    };
    return descriptions[type as keyof typeof descriptions];
  };

  const getBodyTypeColor = (type: string) => {
    const colors = {
      Mesomorph: "bg-accent text-accent-foreground",
      Ectomorph: "bg-secondary text-secondary-foreground", 
      Endomorph: "bg-primary text-primary-foreground"
    };
    return colors[type as keyof typeof colors];
  };

  return (
    <section id="results" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Results
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Based on AI analysis of your body composition and characteristics
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Result */}
          <Card className="shadow-card bg-gradient-card border-0">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <Target className="w-12 h-12 text-primary" />
              </div>
              <CardTitle className="text-3xl mb-2">Your Body Type</CardTitle>
              <Badge className={`text-lg px-4 py-2 ${getBodyTypeColor(analysisResults.bodyType)}`}>
                {analysisResults.bodyType}
              </Badge>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{analysisResults.confidence}%</div>
                <div className="text-muted-foreground">Confidence Score</div>
              </div>
              
              <p className="text-center text-muted-foreground leading-relaxed">
                {getBodyTypeDescription(analysisResults.bodyType)}
              </p>
              
              <div className="flex justify-center pt-4">
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Download Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Breakdown */}
          <Card className="shadow-card bg-gradient-card border-0">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-8 h-8 text-primary" />
                <CardTitle className="text-2xl">Analysis Breakdown</CardTitle>
              </div>
              <CardDescription>
                Probability distribution across all body types
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {Object.entries(analysisResults.breakdown).map(([type, percentage]) => (
                <div key={type} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium capitalize">{type}</span>
                    <span className="text-muted-foreground">{percentage as number}%</span>
                  </div>
                  <Progress value={percentage as number} className="h-3" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recommendations & Personalized Plan */}
          <Card className="lg:col-span-2 shadow-card bg-gradient-card border-0">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-8 h-8 text-primary" />
                <CardTitle className="text-2xl">Your Personalized Fitness Plan</CardTitle>
              </div>
              <CardDescription>
                AI-generated recommendations based on your body type and questionnaire
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="recommendations" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="recommendations">Quick Tips</TabsTrigger>
                  <TabsTrigger value="workout">Workout Plan</TabsTrigger>
                  <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                </TabsList>
                
                <TabsContent value="recommendations" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {analysisResults.recommendations.map((recommendation: string, index: number) => (
                      <div
                        key={index}
                        className="p-4 bg-muted/50 rounded-lg border border-border/50"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold mt-0.5">
                            {index + 1}
                          </div>
                          <p className="text-sm leading-relaxed">{recommendation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="workout" className="space-y-4">
                  <div className="p-6 bg-muted/30 rounded-lg border border-border/50">
                    {analysisResults.personalizedPlan ? (
                      <div className="prose prose-sm max-w-none">
                        <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                          {analysisResults.personalizedPlan}
                        </pre>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <Dumbbell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Complete the assessment to get your personalized workout plan!</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="nutrition" className="space-y-4">
                  <div className="p-6 bg-muted/30 rounded-lg border border-border/50">
                    {questionnaireData ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-background/50 rounded-lg">
                            <h4 className="font-semibold mb-2">Dietary Preference</h4>
                            <p className="text-sm text-muted-foreground">{questionnaireData.dietType}</p>
                          </div>
                          <div className="p-4 bg-background/50 rounded-lg">
                            <h4 className="font-semibold mb-2">Allergies</h4>
                            <p className="text-sm text-muted-foreground">
                              {questionnaireData.allergies.length > 0 ? questionnaireData.allergies.join(', ') : 'None reported'}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Detailed nutrition plan will be included in your AI-generated recommendations above.
                        </p>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <Utensils className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Complete the questionnaire to get personalized nutrition advice!</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BodyTypeResults;