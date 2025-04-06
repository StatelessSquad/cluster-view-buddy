
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ClusterOverview from '@/components/ClusterOverview';
import NodesList from '@/components/NodesList';
import PodsList from '@/components/PodsList';
import ResourceUsageCharts from '@/components/ResourceUsageCharts';
import NamespaceSelector from '@/components/NamespaceSelector';

const Index: React.FC = () => {
  const [selectedNamespace, setSelectedNamespace] = useState("all");

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Cluster Overview</h2>
        <NamespaceSelector 
          value={selectedNamespace} 
          onChange={setSelectedNamespace} 
        />
      </div>
      
      <ClusterOverview />
      <ResourceUsageCharts />
      <NodesList />
      <PodsList />
    </DashboardLayout>
  );
};

export default Index;
