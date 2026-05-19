export const mockStats = [
  { label: 'Total Identities Monitored', value: '1.2M', trend: '+12%' },
  { label: 'Active Alerts', value: '42', trend: '-5%', color: 'red' },
  { label: 'High-Risk Nodes', value: '128', trend: '+2%' },
  { label: 'Attacks Detected Today', value: '14', trend: '+8%', color: 'red' },
];

export const mockAlerts = [
  {
    id: 1,
    timestamp: '2026-05-15 10:24:12',
    eventType: 'SIM Swap Detection',
    sourceSystem: 'Telecom-V1',
    affectedNode: 'SIM-98210-XXXXX',
    riskLevel: 'CRITICAL',
  },
  {
    id: 2,
    timestamp: '2026-05-15 09:45:05',
    eventType: 'Mule Account Linkage',
    sourceSystem: 'Bank-Fin-Delta',
    affectedNode: 'ACC-00482195',
    riskLevel: 'HIGH',
  },
  {
    id: 3,
    timestamp: '2026-05-15 08:30:11',
    eventType: 'Synthetic Identity Attempt',
    sourceSystem: 'UIDAI-Proxy-L3',
    affectedNode: 'AAD-XXXX-4492',
    riskLevel: 'MEDIUM',
  },
  {
    id: 4,
    timestamp: '2026-05-15 07:15:44',
    eventType: 'UPI Velocity Anomaly',
    sourceSystem: 'NPCI-Settlement',
    affectedNode: 'VPA-user@oksbi',
    riskLevel: 'LOW',
  },
];

export const mockNodeDetails = {
  id: 'SIM-98210-44921',
  type: 'SIM Card',
  riskScore: 88,
  linkedNodesCount: 14,
  owner: 'Hidden for Privacy',
  status: 'Active / Under Surveillance',
};
