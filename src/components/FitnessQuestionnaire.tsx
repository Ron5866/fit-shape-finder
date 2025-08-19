import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuestionnaireData {
  // Basic info
  fitnessGoals: string;
  currentActivity: string;
  exerciseFrequency: string;
  workoutDuration: string;
  
  // Health & Diet
  dietType: string;
  allergies: string[];
  medicalConditions: string;
  injuries: string;
  
  // Preferences
  workoutPreference: string;
  equipmentAccess: string[];
}

const FitnessQuestionnaire = ({ onComplete }: { onComplete: (data: QuestionnaireData) => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<QuestionnaireData>({
    fitnessGoals: "",
    currentActivity: "",
    exerciseFrequency: "",
    workoutDuration: "",
    dietType: "",
    allergies: [],
    medicalConditions: "",
    injuries: "",
    workoutPreference: "",
    equipmentAccess: []
  });
  const { toast } = useToast();

  const questions = [
    {
      title: "What are your primary fitness goals?",
      subtitle: "Select your main objective",
      type: "radio",
      field: "fitnessGoals",
      options: [
        "Weight Loss",
        "Muscle Building",
        "General Fitness",
        "Athletic Performance",
        "Strength Training",
        "Endurance Improvement"
      ]
    },
    {
      title: "What's your current activity level?",
      subtitle: "Be honest about your current fitness",
      type: "radio",
      field: "currentActivity",
      options: [
        "Sedentary (little to no exercise)",
        "Lightly active (light exercise 1-3 days/week)",
        "Moderately active (moderate exercise 3-5 days/week)",
        "Very active (hard exercise 6-7 days/week)",
        "Extremely active (very hard exercise, physical job)"
      ]
    },
    {
      title: "How often do you currently exercise?",
      subtitle: "Include all types of physical activity",
      type: "radio",
      field: "exerciseFrequency",
      options: [
        "Never",
        "1-2 times per week",
        "3-4 times per week",
        "5-6 times per week",
        "Daily"
      ]
    },
    {
      title: "How long are your typical workouts?",
      subtitle: "Average duration per session",
      type: "radio",
      field: "workoutDuration",
      options: [
        "Less than 30 minutes",
        "30-45 minutes",
        "45-60 minutes",
        "60-90 minutes",
        "More than 90 minutes"
      ]
    },
    {
      title: "What's your dietary preference?",
      subtitle: "This helps us tailor nutrition advice",
      type: "radio",
      field: "dietType",
      options: [
        "Vegetarian",
        "Vegan",
        "Non-vegetarian",
        "Pescatarian",
        "Keto",
        "No specific preference"
      ]
    },
    {
      title: "Do you have any food allergies?",
      subtitle: "Select all that apply",
      type: "checkbox",
      field: "allergies",
      options: [
        "Nuts",
        "Dairy",
        "Gluten",
        "Shellfish",
        "Soy",
        "Eggs",
        "None"
      ]
    },
    {
      title: "Any medical conditions we should know about?",
      subtitle: "This helps us provide safer recommendations",
      type: "textarea",
      field: "medicalConditions",
      placeholder: "Diabetes, heart conditions, blood pressure issues, etc. (optional)"
    },
    {
      title: "Do you have any injuries or physical limitations?",
      subtitle: "Past or current injuries that affect movement",
      type: "textarea",
      field: "injuries",
      placeholder: "Knee problems, back pain, shoulder issues, etc. (optional)"
    },
    {
      title: "What type of workouts do you prefer?",
      subtitle: "Choose your favorite style",
      type: "radio",
      field: "workoutPreference",
      options: [
        "Cardio (running, cycling, swimming)",
        "Strength training (weights, resistance)",
        "HIIT (High-intensity interval training)",
        "Yoga and flexibility",
        "Sports and recreational activities",
        "Mixed/varied workouts"
      ]
    },
    {
      title: "What equipment do you have access to?",
      subtitle: "Select all available options",
      type: "checkbox",
      field: "equipmentAccess",
      options: [
        "Full gym access",
        "Home gym setup",
        "Basic weights/dumbbells",
        "Resistance bands",
        "Yoga mat",
        "No equipment (bodyweight only)"
      ]
    }
  ];

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
      toast({
        title: "Questionnaire Complete! 🎉",
        description: "Now let's analyze your body type with AI.",
      });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData({ ...formData, [field]: value });
  };

  const isStepValid = () => {
    const value = formData[currentQuestion.field as keyof QuestionnaireData];
    if (currentQuestion.type === "checkbox") {
      return Array.isArray(value) && value.length > 0;
    }
    if (currentQuestion.type === "textarea") {
      return true; // Optional fields
    }
    return value && value !== "";
  };

  return (
    <Card className="shadow-card bg-gradient-card border-0 max-w-2xl mx-auto">
      <CardHeader className="text-center pb-6">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-primary rounded-full p-3">
            <Zap className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
        <CardTitle className="text-2xl mb-2">Fitness Assessment</CardTitle>
        <CardDescription className="text-lg">
          Step {currentStep + 1} of {questions.length}
        </CardDescription>
        
        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 mt-4">
          <div 
            className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold">{currentQuestion.title}</h3>
          <p className="text-muted-foreground">{currentQuestion.subtitle}</p>
        </div>

        <div className="space-y-4">
          {currentQuestion.type === "radio" && (
            <RadioGroup
              value={formData[currentQuestion.field as keyof QuestionnaireData] as string}
              onValueChange={(value) => handleInputChange(currentQuestion.field, value)}
            >
              {currentQuestion.options?.map((option) => (
                <div key={option} className="flex items-center space-x-2 p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="flex-1 cursor-pointer">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {currentQuestion.type === "checkbox" && (
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options?.map((option) => (
                <div key={option} className="flex items-center space-x-2 p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                  <Checkbox
                    id={option}
                    checked={(formData[currentQuestion.field as keyof QuestionnaireData] as string[])?.includes(option)}
                    onCheckedChange={(checked) => {
                      const currentValues = (formData[currentQuestion.field as keyof QuestionnaireData] as string[]) || [];
                      if (checked) {
                        handleInputChange(currentQuestion.field, [...currentValues, option]);
                      } else {
                        handleInputChange(currentQuestion.field, currentValues.filter(v => v !== option));
                      }
                    }}
                  />
                  <Label htmlFor={option} className="flex-1 cursor-pointer">{option}</Label>
                </div>
              ))}
            </div>
          )}

          {currentQuestion.type === "textarea" && (
            <Textarea
              placeholder={currentQuestion.placeholder}
              value={formData[currentQuestion.field as keyof QuestionnaireData] as string}
              onChange={(e) => handleInputChange(currentQuestion.field, e.target.value)}
              className="min-h-[100px]"
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 flex items-center gap-2"
          >
            {isLastStep ? "Complete" : "Next"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FitnessQuestionnaire;