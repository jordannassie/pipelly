import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppTopbar } from "@/components/layout/AppTopbar";
import { AICopilotPanel } from "@/components/ai/AICopilotPanel";
import { AICopilotProvider } from "@/lib/ai-copilot-context";

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <AICopilotProvider>
      <div className="flex h-screen w-full overflow-hidden bg-gray-50">
        <AppSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <AppTopbar />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
        <AICopilotPanel />
      </div>
    </AICopilotProvider>
  );
}
