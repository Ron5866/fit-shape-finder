import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BodyTypeAssessment from "@/components/BodyTypeAssessment";
import BodyTypeResults from "@/components/BodyTypeResults";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <BodyTypeAssessment />
      <BodyTypeResults />
    </div>
  );
};

export default Index;
