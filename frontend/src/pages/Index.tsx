import Navbar from "@/components/Navbar";
import StatsGrid from "@/components/StatsGrid";
import PortfolioChart from "@/components/PortfolioChart";
import AITerminal from "@/components/AITerminal";
import ActionBar from "@/components/ActionBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-violet-500/5 pointer-events-none" />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-32">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
            Autonomous Trading Intelligence
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            AI-powered hedge fund operating on QIE Blockchain. Real-time market analysis, 
            flash loan execution, and oracle-driven trading strategies.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8">
          <StatsGrid />
        </div>

        {/* Main Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PortfolioChart />
          </div>
          <div className="lg:col-span-1">
            <AITerminal />
          </div>
        </div>
      </main>

      <ActionBar />
    </div>
  );
};

export default Index;
