// API service for AI integrations
export interface QuestionnaireData {
  fitnessGoals: string;
  currentActivity: string;
  exerciseFrequency: string;
  workoutDuration: string;
  dietType: string;
  allergies: string[];
  medicalConditions: string;
  injuries: string;
  workoutPreference: string;
  equipmentAccess: string[];
}

export interface BodyTypeResult {
  bodyType: string;
  confidence: number;
  breakdown: {
    endomorph: number;
    ectomorph: number;
    mesomorph: number;
  };
  recommendations: string[];
  personalizedPlan: string;
}

export class AIService {
  private geminiKey: string;
  private openaiKey: string;

  constructor(geminiKey: string, openaiKey: string = "") {
    this.geminiKey = geminiKey;
    this.openaiKey = openaiKey;
  }

  async generatePersonalizedRecommendations(
    bodyTypeData: any,
    questionnaireData: QuestionnaireData
  ): Promise<string> {
    const prompt = `
Based on the following user information, create a comprehensive, personalized fitness and nutrition plan:

BODY TYPE ANALYSIS:
- Primary body type: ${bodyTypeData.bodyType}
- Confidence: ${bodyTypeData.confidence}%
- Breakdown: ${JSON.stringify(bodyTypeData.breakdown)}

USER PROFILE:
- Fitness Goals: ${questionnaireData.fitnessGoals}
- Current Activity Level: ${questionnaireData.currentActivity}
- Exercise Frequency: ${questionnaireData.exerciseFrequency}
- Workout Duration: ${questionnaireData.workoutDuration}
- Diet Preference: ${questionnaireData.dietType}
- Allergies: ${questionnaireData.allergies.join(', ') || 'None'}
- Medical Conditions: ${questionnaireData.medicalConditions || 'None reported'}
- Injuries/Limitations: ${questionnaireData.injuries || 'None reported'}
- Workout Preference: ${questionnaireData.workoutPreference}
- Equipment Access: ${questionnaireData.equipmentAccess.join(', ')}

Please provide:
1. Detailed workout plan (3-4 exercises with sets/reps)
2. Nutrition guidelines specific to their body type and goals
3. Meal timing suggestions
4. Supplement recommendations (if applicable)
5. Progress tracking tips
6. Common pitfalls to avoid

Keep the response practical, actionable, and tailored to their specific body type and goals. Format it clearly with headings and bullet points.
`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${this.geminiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  }

  async analyzeBodyTypeFromImage(imageBase64: string): Promise<any> {
    // Mock analysis - in production, this would use your ML model
    // For now, we'll simulate the analysis
    const mockResults = [
      {
        bodyType: "Mesomorph",
        confidence: 87.3,
        breakdown: { endomorph: 25.2, ectomorph: 32.1, mesomorph: 87.3 }
      },
      {
        bodyType: "Ectomorph", 
        confidence: 82.1,
        breakdown: { endomorph: 20.5, ectomorph: 82.1, mesomorph: 35.4 }
      },
      {
        bodyType: "Endomorph",
        confidence: 79.6,
        breakdown: { endomorph: 79.6, ectomorph: 28.3, mesomorph: 42.1 }
      }
    ];

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Return random result for demo
    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
    
    const recommendations = this.getBodyTypeRecommendations(randomResult.bodyType);
    
    return {
      ...randomResult,
      recommendations
    };
  }

  private getBodyTypeRecommendations(bodyType: string): string[] {
    const recommendations = {
      Mesomorph: [
        "Focus on strength training with moderate cardio",
        "Aim for balanced macronutrients (40% carbs, 30% protein, 30% fat)",
        "Train 4-5 times per week with varied intensity",
        "Include compound movements like squats, deadlifts, and bench press"
      ],
      Ectomorph: [
        "Prioritize strength training over cardio",
        "Eat in a caloric surplus with higher carbohydrate intake",
        "Focus on compound movements and progressive overload",
        "Allow adequate rest between training sessions"
      ],
      Endomorph: [
        "Combine strength training with regular cardio",
        "Follow a moderate caloric deficit with lower carb intake",
        "Include HIIT workouts for fat burning",
        "Focus on portion control and meal timing"
      ]
    };

    return recommendations[bodyType as keyof typeof recommendations] || [];
  }
}

export const createAIService = (geminiKey: string, openaiKey?: string) => {
  return new AIService(geminiKey, openaiKey);
};