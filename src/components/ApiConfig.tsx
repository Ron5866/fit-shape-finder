import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Key, Info } from "lucide-react";

interface ApiConfigProps {
  onConfigSaved: (config: { geminiKey: string; openaiKey: string }) => void;
}

const ApiConfig = ({ onConfigSaved }: ApiConfigProps) => {
  const [geminiKey, setGeminiKey] = useState("");
  const [openaiKey, setOpenaiKey] = useState("");

  const handleSave = () => {
    // Store in localStorage temporarily
    localStorage.setItem('gemini_api_key', geminiKey);
    localStorage.setItem('openai_api_key', openaiKey);
    onConfigSaved({ geminiKey, openaiKey });
  };

  return (
    <Card className="shadow-card bg-gradient-card border-0 max-w-2xl mx-auto">
      <CardHeader className="text-center pb-6">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-primary rounded-full p-3">
            <Key className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
        <CardTitle className="text-2xl mb-2">API Configuration</CardTitle>
        <CardDescription className="text-lg">
          Configure your AI service keys for personalized recommendations
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Security Notice:</strong> Storing API keys in the frontend is not recommended for production. 
            For better security, consider connecting to Supabase to handle secrets properly.
          </AlertDescription>
        </Alert>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            These keys will be stored locally in your browser and used to generate personalized fitness recommendations.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gemini-key">Google Gemini API Key</Label>
            <Input
              id="gemini-key"
              type="password"
              placeholder="AIza..."
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              className="h-12"
            />
            <p className="text-sm text-muted-foreground">
              Get your free API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google AI Studio</a>
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="openai-key">OpenAI API Key (Optional)</Label>
            <Input
              id="openai-key"
              type="password"
              placeholder="sk-..."
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              className="h-12"
            />
            <p className="text-sm text-muted-foreground">
              Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenAI Platform</a>
            </p>
          </div>
        </div>

        <div className="text-center pt-4">
          <Button
            onClick={handleSave}
            disabled={!geminiKey}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 min-w-[200px]"
          >
            Save Configuration
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiConfig;