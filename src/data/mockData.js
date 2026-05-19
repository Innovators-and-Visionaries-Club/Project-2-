// ── User Profile ──
export const userProfile = {
  name: 'Srinivas P',
  email: 'srinivas.p@gmail.com',
  phone: '+91 98210 44921',
  avatar: null, // Uses initials
  identityScore: 82,
  verifiedSince: 'Jan 2024',
  lastLogin: '2 mins ago',
  plan: 'Shield Pro',
};

// ── User Dashboard Stats ──
export const mockStats = [
  { label: 'Identity Score', value: '82/100', trend: '+4%', icon: 'shield' },
  { label: 'Linked Accounts', value: '7', trend: '+1', icon: 'link' },
  { label: 'Active Alerts', value: '2', trend: '-1', color: 'amber', icon: 'bell' },
  { label: 'Breaches Found', value: '0', trend: '0', color: 'green', icon: 'check' },
];

// ── User's Personal Alerts ──
export const mockAlerts = [
  {
    id: 1,
    timestamp: '2026-05-19 10:24:12',
    eventType: 'New Login from Unknown Device',
    description: 'A login attempt was detected from a new device in Mumbai, Maharashtra.',
    category: 'Login Activity',
    status: 'Unread',
    riskLevel: 'MEDIUM',
    action: 'Review',
  },
  {
    id: 2,
    timestamp: '2026-05-18 15:45:05',
    eventType: 'Bank Account Linked to New UPI',
    description: 'Your HDFC Bank account was linked to a new UPI handle.',
    category: 'Financial',
    status: 'Unread',
    riskLevel: 'LOW',
    action: 'Dismiss',
  },
  {
    id: 3,
    timestamp: '2026-05-17 08:30:11',
    eventType: 'Email Found in Data Breach',
    description: 'Your email address was found in a leaked credential database.',
    category: 'Data Breach',
    status: 'Read',
    riskLevel: 'HIGH',
    action: 'Secure Now',
  },
  {
    id: 4,
    timestamp: '2026-05-15 07:15:44',
    eventType: 'Monthly Security Report Available',
    description: 'Your April 2026 identity protection report is ready to view.',
    category: 'Reports',
    status: 'Read',
    riskLevel: 'LOW',
    action: 'View',
  },
];

// ── User's Linked Identity Assets ──
export const linkedAssets = [
  { id: 'aadhaar', type: 'Aadhaar', identifier: 'XXXX-XXXX-8921', status: 'Verified', risk: 'SAFE' },
  { id: 'pan', type: 'PAN Card', identifier: 'ABCDE****F', status: 'Verified', risk: 'SAFE' },
  { id: 'phone', type: 'Mobile SIM', identifier: '+91 98210 44921', status: 'Active', risk: 'SAFE' },
  { id: 'bank', type: 'Bank Account', identifier: 'HDFC ...3891', status: 'Monitoring', risk: 'MEDIUM' },
  { id: 'email', type: 'Email', identifier: 'srinivas.p@gmail.com', status: 'Verified', risk: 'SAFE' },
  { id: 'upi', type: 'UPI Handle', identifier: 'srini@okhdfc', status: 'Active', risk: 'SAFE' },
  { id: 'passport', type: 'Passport', identifier: 'J84***19', status: 'Not Linked', risk: 'LOW' },
];

// ── Security Tips ──
export const securityTips = [
  { title: 'Enable Aadhaar Biometric Lock', desc: 'Prevent unauthorized eKYC verifications by locking your biometrics.', done: true },
  { title: 'Activate 2FA on Email', desc: 'Use an authenticator app for an extra layer of protection.', done: true },
  { title: 'Review Bank Alerts', desc: 'Your HDFC account has unusual activity patterns. Review now.', done: false },
  { title: 'Link Passport for Full Coverage', desc: 'Add your passport to monitor for identity misuse at borders.', done: false },
];

// ── Activity Timeline ──
export const recentActivity = [
  { id: 1, action: 'Identity Score Updated', time: '2 hours ago', type: 'info' },
  { id: 2, action: 'SIM Swap Protection Verified', time: '1 day ago', type: 'success' },
  { id: 3, action: 'New login from Chrome, Windows', time: '2 days ago', type: 'warning' },
  { id: 4, action: 'Monthly report generated', time: '3 days ago', type: 'info' },
  { id: 5, action: 'Aadhaar biometric lock enabled', time: '1 week ago', type: 'success' },
];

// ── Scan History (for Security Scanner page) ──
export const scanHistory = [
  { id: 1, type: 'Dark Web Scan', date: '2026-05-18', result: 'No leaks found', status: 'clean' },
  { id: 2, type: 'Credential Breach Check', date: '2026-05-15', result: '1 breach detected', status: 'warning' },
  { id: 3, type: 'SIM Swap Detection', date: '2026-05-12', result: 'No anomalies', status: 'clean' },
  { id: 4, type: 'Full Identity Audit', date: '2026-05-01', result: 'Score: 78/100', status: 'clean' },
];
