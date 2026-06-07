import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { ShieldStatus, SeverityBadge, TimelineItem, EmptyState, LockBanner } from '../components/family-shield/UI';
import { ThreatSimulator } from '../components/family-shield/ThreatSimulator';
import { AddContactModal, GuardianNotificationModal } from '../components/family-shield/Modals';
import { Users, Plus, ShieldCheck, Lock, ShieldOff, AlertTriangle, CheckCircle2 } from 'lucide-react';

const THREAT_CONFIG = {
  'SIM Swap Attempt':               { severity: 'CRITICAL', message: 'Your phone number has been ported to a new SIM card without authorization.' },
  'Unknown Device Login':           { severity: 'HIGH',     message: 'A new login attempt was detected from an unknown device in Delhi.' },
  'Suspicious UPI Registration':    { severity: 'CRITICAL', message: 'A new UPI ID was linked to your HDFC bank account from a new device.' },
  'Multiple OTP Requests':          { severity: 'MEDIUM',   message: 'Multiple OTPs were requested for your Aadhaar authentication within 5 minutes.' },
  'Fraudulent Transaction Attempt': { severity: 'HIGH',     message: 'An unusually large transaction of ₹50,000 was attempted on your linked debit card.' },
};

export default function FamilyShield() {
  const [contacts, setContacts] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [logs, setLogs] = useState([]);
  const [isLocked, setIsLocked] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [guardianModal, setGuardianModal] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const logIdRef = useRef(1);

  /* ─── Helpers ─── */
  const addLog = (action, details) => {
    const id = logIdRef.current++;
    setLogs(prev => [{ id, action, details, created_at: new Date().toISOString(), isNew: true }, ...prev]);
    // Remove "isNew" flag after animation
    setTimeout(() => {
      setLogs(prev => prev.map(l => l.id === id ? { ...l, isNew: false } : l));
    }, 800);
  };

  /* ─── Contact CRUD ─── */
  const handleAddContact = (data) => {
    setContacts(prev => [{ id: Date.now(), ...data }, ...prev]);
    addLog('CONTACT_ADDED', `Added guardian: ${data.name} (${data.relation})`);
    setIsAddModalOpen(false);
  };

  const handleRemoveContact = (id) => {
    const c = contacts.find(x => x.id === id);
    if (c) {
      setContacts(prev => prev.filter(x => x.id !== id));
      addLog('CONTACT_REMOVED', `Removed guardian: ${c.name}`);
    }
  };

  /* ─── Lock / Unlock Identity ─── */
  const lockIdentity = () => {
    setIsLocked(true);
    addLog('IDENTITY_LOCKED', 'Emergency identity protection activated. All high-risk actions blocked.');
  };

  const unlockIdentity = () => {
    setIsLocked(false);
    addLog('IDENTITY_UNLOCKED', 'Identity protection deactivated. Normal operations resumed.');
  };

  /* ─── Threat Simulation Flow ─── */
  const handleSimulate = async (scenario) => {
    const config = THREAT_CONFIG[scenario] || { severity: 'LOW', message: 'Minor anomalous behavior detected.' };
    setIsProcessing(true);

    // Step 1: Alert created
    const alertId = Date.now();
    setAlerts(prev => [{ id: alertId, alert_type: scenario, severity: config.severity, message: config.message, status: 'ACTIVE' }, ...prev]);
    addLog('THREAT_DETECTED', `⚠ ${scenario} detected — Severity: ${config.severity}`);

    // Step 2: For HIGH/CRITICAL, open guardian modal after a delay
    if ((config.severity === 'HIGH' || config.severity === 'CRITICAL') && contacts.length > 0) {
      const contact = contacts[Math.floor(Math.random() * contacts.length)];

      await new Promise(r => setTimeout(r, 800));
      addLog('GUARDIAN_NOTIFIED', `Notification sent to ${contact.name} (${contact.relation})`);

      await new Promise(r => setTimeout(r, 400));
      setGuardianModal({
        request_type: scenario,
        severity: config.severity,
        message: config.message,
        contact_name: contact.name,
        contact_relation: contact.relation,
      });
    }
    setIsProcessing(false);
  };

  /* ─── Guardian Response ─── */
  const handleGuardianRespond = (status) => {
    const gm = guardianModal;
    setGuardianModal(null);

    if (status === 'REJECTED') {
      addLog('VERIFICATION_REJECTED', `Guardian ${gm.contact_name} rejected the activity — ${gm.request_type}`);
      setTimeout(() => {
        lockIdentity();
      }, 300);
    } else {
      addLog('VERIFICATION_APPROVED', `Guardian ${gm.contact_name} approved the activity — ${gm.request_type}`);
      // Resolve the alert
      setAlerts(prev => prev.map(a => a.alert_type === gm.request_type && a.status === 'ACTIVE' ? { ...a, status: 'RESOLVED' } : a));
      addLog('ALERT_RESOLVED', `${gm.request_type} alert resolved after guardian approval.`);
    }
  };

  const activeAlerts = alerts.filter(a => a.status === 'ACTIVE');

  return (
    <div className="min-h-[calc(100vh-2rem)] bg-[#0B1020] text-white rounded-3xl p-4 sm:p-6 -m-4 border border-white/5 shadow-2xl relative overflow-hidden font-sans">
      <Head><title>Trusted Family Shield | Setu-Raksha</title></Head>

      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D1FF]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-all duration-1000 ${
        isLocked ? 'bg-[#FF4D4D]/8' : 'bg-[#00D1FF]/3'
      }`} />

      <div className="relative z-10 space-y-5">

        {/* ═══ Header ═══ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-500 ${
              isLocked
                ? 'bg-[#FF4D4D]/15 border-[#FF4D4D]/20 shadow-[0_0_20px_rgba(255,77,77,0.15)]'
                : 'bg-gradient-to-br from-[#00D1FF]/20 to-[#00D1FF]/5 border-[#00D1FF]/20 shadow-[0_0_20px_rgba(0,209,255,0.1)]'
            }`}>
              {isLocked ? <Lock className="w-5 h-5 text-[#FF4D4D]" /> : <ShieldCheck className="w-5 h-5 text-[#00D1FF]" />}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-wide">Trusted Family Shield</h1>
              <p className="text-[11px] text-gray-500 font-medium">Guardian Verification & Fraud Protection</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            {!isLocked ? (
              <button
                onClick={lockIdentity}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#FF4D4D]/20 text-[#FF4D4D] text-xs font-bold hover:bg-[#FF4D4D]/10 hover:border-[#FF4D4D]/40 transition-all"
              >
                <Lock className="w-3.5 h-3.5" /> Lock Identity
              </button>
            ) : (
              <button
                onClick={unlockIdentity}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#22C55E]/20 text-[#22C55E] text-xs font-bold hover:bg-[#22C55E]/10 transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Unlock
              </button>
            )}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#00D1FF] text-[#0B1020] font-bold text-xs hover:shadow-[0_0_15px_rgba(0,209,255,0.3)] transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Add Guardian
            </button>
          </div>
        </div>

        {/* ═══ Lock Banner ═══ */}
        <LockBanner isLocked={isLocked} onToggle={unlockIdentity} />

        {/* ═══ Protection Status ═══ */}
        <ShieldStatus contactsCount={contacts.length} alertsCount={activeAlerts.length} isLocked={isLocked} />

        {/* ═══ Contacts + Simulator ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Protected Contacts */}
          <div className="lg:col-span-2 bg-[#121A2B] rounded-2xl p-5 border border-white/5">
            <h3 className="text-gray-400 font-medium text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#00D1FF]" /> Protected Guardians
            </h3>
            {contacts.length === 0 ? (
              <EmptyState
                icon={Users}
                title="No trusted guardians added yet"
                subtitle="Add a family member or trusted contact to enable guardian-assisted fraud protection."
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {contacts.map(c => (
                  <div key={c.id} className="bg-[#0B1020] p-4 rounded-xl border border-white/5 flex items-center gap-3 group hover:border-[#00D1FF]/15 transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-[#00D1FF]/10 border border-[#00D1FF]/15 flex items-center justify-center text-[#00D1FF] font-bold text-xs">
                      {c.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate">{c.name}</p>
                      <p className="text-[10px] text-[#00D1FF]/70 uppercase tracking-wider">{c.relation}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#22C55E] shadow-[0_0_6px_rgba(34,197,94,0.4)]" />
                      <button
                        onClick={() => handleRemoveContact(c.id)}
                        className="text-gray-600 hover:text-[#FF4D4D] transition-colors text-[10px] uppercase tracking-wider font-bold opacity-0 group-hover:opacity-100"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Threat Simulator */}
          <ThreatSimulator onSimulate={handleSimulate} disabled={isProcessing || isLocked} />
        </div>

        {/* ═══ Alerts + Security Timeline ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Active Alerts */}
          <div className="bg-[#121A2B] rounded-2xl p-5 border border-white/5 max-h-[420px] overflow-y-auto custom-scrollbar">
            <h3 className="text-gray-400 font-medium text-xs tracking-widest uppercase mb-4 sticky top-0 bg-[#121A2B] pb-2 z-10 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#FFB547]" /> Active Alerts
            </h3>
            {alerts.length === 0 ? (
              <EmptyState
                icon={CheckCircle2}
                title="Your identity is currently secure"
                subtitle="No suspicious activity detected. Use the Threat Simulator to test guardian workflows."
              />
            ) : (
              <div className="space-y-3">
                {alerts.map(alert => (
                  <div
                    key={alert.id}
                    className={`bg-[#0B1020] p-4 rounded-xl border-l-[3px] border border-white/5 transition-all duration-500 animate-slideIn ${
                      alert.status === 'RESOLVED' ? 'opacity-50' : ''
                    }`}
                    style={{
                      borderLeftColor: alert.severity === 'CRITICAL' ? '#FF4D4D' : alert.severity === 'HIGH' ? '#f97316' : alert.severity === 'MEDIUM' ? '#FFB547' : '#22C55E'
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-white">{alert.alert_type}</span>
                      <div className="flex items-center gap-2">
                        {alert.status === 'RESOLVED' && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#22C55E]/10 text-[#22C55E] font-bold tracking-wider">RESOLVED</span>
                        )}
                        <SeverityBadge severity={alert.severity} />
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">{alert.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Security Timeline */}
          <div className="bg-[#121A2B] rounded-2xl p-5 border border-white/5 max-h-[420px] overflow-y-auto custom-scrollbar">
            <h3 className="text-gray-400 font-medium text-xs tracking-widest uppercase mb-4 sticky top-0 bg-[#121A2B] pb-2 z-10 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00D1FF]" /> Security Timeline
            </h3>
            {logs.length === 0 ? (
              <EmptyState
                icon={ShieldCheck}
                title="No activity recorded"
                subtitle="Security events and guardian actions will appear here in real time."
              />
            ) : (
              <div className="pl-1">
                {logs.map(log => <TimelineItem key={log.id} log={log} isNew={log.isNew} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ═══ Modals ═══ */}
      <AddContactModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddContact} />
      <GuardianNotificationModal data={guardianModal} onRespond={handleGuardianRespond} />

      {/* ═══ Global Styles ═══ */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.15); }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slideIn { animation: slideIn 0.4s ease-out; }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp { animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1); }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.25s ease-out; }
      `}</style>
    </div>
  );
}
