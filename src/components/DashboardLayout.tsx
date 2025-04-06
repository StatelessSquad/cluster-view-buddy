
import React from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import KubernetesLogo from '@/components/KubernetesLogo';
import { Server, LayoutDashboard, Boxes, Database, Network, Settings, RefreshCw, LogOut } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { toast } = useToast();

  const handleRefresh = () => {
    toast({
      title: "Refreshing cluster data",
      description: "Cluster data is being refreshed...",
    });
    // In a real app, this would fetch updated data from your Kubernetes API
  };

  return (
    <SidebarProvider>
      <div className="h-screen flex w-full overflow-hidden">
        <Sidebar className="border-r border-border">
          <SidebarHeader className="flex items-center px-4 py-4">
            <KubernetesLogo className="w-8 h-8 mr-2" />
            <div className="text-lg font-bold text-sidebar-foreground">Cluster View</div>
          </SidebarHeader>
          <SidebarContent>
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <SidebarGroup>
                <SidebarGroupLabel>Overview</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="/" className="flex items-center">
                          <LayoutDashboard className="w-4 h-4 mr-2" />
                          <span>Dashboard</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#" className="flex items-center">
                          <Server className="w-4 h-4 mr-2" />
                          <span>Nodes</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              
              <SidebarGroup>
                <SidebarGroupLabel>Resources</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#" className="flex items-center">
                          <Boxes className="w-4 h-4 mr-2" />
                          <span>Pods</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#" className="flex items-center">
                          <Database className="w-4 h-4 mr-2" />
                          <span>Deployments</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#" className="flex items-center">
                          <Network className="w-4 h-4 mr-2" />
                          <span>Services</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              
              <SidebarGroup>
                <SidebarGroupLabel>Configuration</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#" className="flex items-center">
                          <Settings className="w-4 h-4 mr-2" />
                          <span>Settings</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </ScrollArea>
          </SidebarContent>
          <SidebarFooter className="border-t p-4 flex flex-col gap-2">
            <Button variant="outline" className="w-full" onClick={handleRefresh}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="secondary" className="w-full">
              <LogOut className="w-4 h-4 mr-2" />
              Disconnect
            </Button>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-card border-b border-border h-14 flex items-center justify-between px-4">
            <div className="flex items-center">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold ml-4">Kubernetes Cluster View</h1>
            </div>
            <div>
              <span className="bg-kubernetes-blue/20 text-kubernetes-blue rounded-full px-3 py-1 text-xs font-medium">
                Cluster: my-cluster
              </span>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
