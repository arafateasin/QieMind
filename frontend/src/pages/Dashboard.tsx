import { KPICards } from "@/components/dashboard/KPICards";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { CortexTerminal } from "@/components/dashboard/CortexTerminal";
import { AIInsights } from "@/components/dashboard/AIInsights";
import ActionBar from "@/components/ActionBar";

const Dashboard = () => {
  return (
    <div className="space-y-6 pb-24">
      {/* KPI Cards Row */}
      <KPICards />

      {/* Main Workspace - Chart and Terminal */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <PerformanceChart />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <CortexTerminal />
        </div>
      </div>

      {/* AI Insights Section */}
      <AIInsights />

      <ActionBar />
    </div>
  );
};

export default Dashboard;
