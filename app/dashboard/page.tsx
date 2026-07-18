"use client";

import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import CountUp from "react-countup";
import { 
  Shield, 
  UserX,
  MailWarning,
  Activity, 
  Monitor, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  MoreHorizontal, 
  Terminal, 
  Play, 
  ShieldAlert, 
  Lock, 
  WifiOff, 
  RefreshCcw,
  Search,
  Settings,
  Bell,
  Mail,
  Bug,
  Database,
  Cpu
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Mock Data
const defaultTimelineData = [
    
  { time: '00:00', threats: 12 },
  { time: '04:00', threats: 8 },
  { time: '08:00', threats: 45 },
  { time: '12:00', threats: 32 },
  { time: '16:00', threats: 65 },
  { time: '20:00', threats: 28 },
  { time: '23:59', threats: 15 },
];
const malwareTimeline = [
  { time: "00:00", threats: 12 },
  { time: "04:00", threats: 18 },
  { time: "08:00", threats: 35 },
  { time: "12:00", threats: 62 },
  { time: "16:00", threats: 42 },
  { time: "20:00", threats: 20 },
  { time: "23:59", threats: 8 },
];
const ransomwareTimeline = [
  { time: "00:00", threats: 10 },
  { time: "04:00", threats: 18 },
  { time: "08:00", threats: 42 },
  { time: "12:00", threats: 78 },
  { time: "16:00", threats: 82 },
  { time: "20:00", threats: 50 },
  { time: "23:59", threats: 20 },
];
const ddosTimeline = [
  { time: "00:00", threats: 15 },
  { time: "04:00", threats: 35 },
  { time: "08:00", threats: 70 },
  { time: "12:00", threats: 95 },
  { time: "16:00", threats: 90 },
  { time: "20:00", threats: 88 },
  { time: "23:59", threats: 60 },
];
const insiderTimeline = [
  { time: "00:00", threats: 8 },
  { time: "04:00", threats: 10 },
  { time: "08:00", threats: 16 },
  { time: "12:00", threats: 27 },
  { time: "16:00", threats: 20 },
  { time: "20:00", threats: 15 },
  { time: "23:59", threats: 9 },
];
const phishingTimeline = [
  { time: "00:00", threats: 9 },
  { time: "04:00", threats: 14 },
  { time: "08:00", threats: 24 },
  { time: "12:00", threats: 31 },
  { time: "16:00", threats: 26 },
  { time: "20:00", threats: 18 },
  { time: "23:59", threats: 12 },
];

const defaultInfrastructure = [
  { name: "Firewall", status: "healthy" },
  { name: "API Gateway", status: "healthy" },
  { name: "Web Server", status: "healthy" },
  { name: "Database", status: "healthy" },
  { name: "Backup Server", status: "healthy" },
];
const malwareInfrastructure = [
  { name: "Firewall", status: "warning" },
  { name: "API Gateway", status: "healthy" },
  { name: "Web Server", status: "critical" },
  { name: "Database", status: "warning" },
  { name: "Backup Server", status: "healthy" },
];
const ransomwareInfrastructure = [
  { name: "Firewall", status: "healthy" },
  { name: "API Gateway", status: "healthy" },
  { name: "Web Server", status: "healthy" },
  { name: "Database", status: "critical" },
  { name: "Backup Server", status: "recovering" },
];
const ddosInfrastructure = [
  { name: "Firewall", status: "critical" },
  { name: "API Gateway", status: "critical" },
  { name: "Web Server", status: "warning" },
  { name: "Database", status: "healthy" },
  { name: "Backup Server", status: "healthy" },
];

const insiderInfrastructure = [
  { name: "Firewall", status: "healthy" },
  { name: "API Gateway", status: "healthy" },
  { name: "Web Server", status: "warning" },
  { name: "Database", status: "critical" },
  { name: "Backup Server", status: "healthy" },
];

const phishingInfrastructure = [
  { name: "Firewall", status: "healthy" },
  { name: "API Gateway", status: "warning" },
  { name: "Web Server", status: "healthy" },
  { name: "Database", status: "warning" },
  { name: "Backup Server", status: "healthy" },
];

const recentIncidents = [
  { id: 'INC-7281', target: 'Finance-DB-01', type: 'SQL Injection', status: 'Blocked', severity: 'Critical', time: '2 mins ago' },
  { id: 'INC-7280', target: 'Worker-Node-4', type: 'Brute Force', status: 'Mitigating', severity: 'High', time: '12 mins ago' },
  { id: 'INC-7279', target: 'Marketing-S3', type: 'Unauthorized Access', status: 'Resolved', severity: 'Medium', time: '45 mins ago' },
  { id: 'INC-7278', target: 'Internal-Mail', type: 'Phishing Attempt', status: 'Quarantined', severity: 'High', time: '1 hour ago' },
];

const activityFeed = [
  { user: 'AI-Core', action: 'Isolated Node 12', time: 'Just now', icon: <ShieldAlert className="w-4 h-4 text-cyan-400" /> },
  { user: 'System', action: 'Neural signatures updated', time: '5m', icon: <RefreshCcw className="w-4 h-4 text-blue-400" /> },
  { user: 'Network', action: 'DDoS filtering engaged', time: '12m', icon: <Activity className="w-4 h-4 text-red-400" /> },
];

export default function SOCDashboard() {
  const [mounted, setMounted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
const [activeSimulation, setActiveSimulation] = useState("");
  const [attackActive, setAttackActive] = useState(false);
  const [timelineData, setTimelineData] = useState(defaultTimelineData);
  const [executiveSummary, setExecutiveSummary] = useState({
  attack: "None",
  impact: "No active incidents",
  status: "Secure",
  risk: "Low",
  recommendation: "System operating normally.",
});

const [attackFlow, setAttackFlow] = useState([
  { name: "Internet", status: "healthy" },
  { name: "Employee Laptop", status: "healthy" },
  { name: "Web Server", status: "healthy" },
  { name: "Database", status: "healthy" },
  { name: "Backup Server", status: "healthy" },
]);
  const [threatLevel, setThreatLevel] = useState("ELEVATED");
  const [activeThreats, setActiveThreats] = useState(14);
  const [healthyDevices, setHealthyDevices] = useState(1242);
  const [infrastructure, setInfrastructure] = useState(defaultInfrastructure);
  const [recoveryProgress, setRecoveryProgress] = useState(0);
  const [isRecovering, setIsRecovering] = useState(false);
  const [prediction, setPrediction] = useState({
  risk: "12%",
  target: "None",
  spread: "0 Systems",
  recommendation: "System operating normally.",
});


  const [aiMessage, setAiMessage] = useState(
    "Detected lateral movement in VPC-2. Cross-referencing with global signatures."
  );
  const [aiThreat, setAiThreat] = useState("System Monitoring");
const [aiConfidence, setAiConfidence] = useState("98.2%");
const [aiActions, setAiActions] = useState<string[]>([
  "Monitoring network traffic",
  "Analyzing user behavior",
  "Scanning endpoints",
]);
const [aiStatus, setAiStatus] = useState("System Secure");

  const [activityFeedData, setActivityFeedData] = useState(activityFeed);

  const [incidentData, setIncidentData] = useState(recentIncidents);

  useEffect(() => setMounted(true), []);
  const analyzeThreat = async (logs: string[]) => {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ logs }),
  });

  if (!response.ok) {
    throw new Error("AI analysis failed");
  }

  return await response.json();
};
const runMalwareSimulation = async () => {
  setActiveSimulation("Run Malware Simulation");
  setIsAnalyzing(true);

  try {
    const aiResult = await analyzeThreat([
      "Unknown executable downloaded",
      "Registry modified",
      "Antivirus disabled",
      "Malicious process detected",
    ]);
   
    // Dashboard Stats
    setThreatLevel("CRITICAL");
    setActiveThreats(62);
    setHealthyDevices(1215);

    // Timeline & Infrastructure
    setTimelineData(malwareTimeline);
    setInfrastructure(malwareInfrastructure);

    // AI Insights
    setAiThreat(aiResult.threat);
    const confidence =
  aiResult.confidence > 1
    ? Math.round(aiResult.confidence)
    : Math.round(aiResult.confidence * 100);

setAiConfidence(`${confidence}%`);
    setAiStatus("Containment Successful");
    setAiMessage(aiResult.summary);
    setAiActions(
      Array.isArray(aiResult.actions) ? aiResult.actions : []
    );

    // Prediction
    setPrediction({
      risk: `${Math.round(aiResult.confidence * 100)}%`,
      target: "Database",
      spread: "5 Systems",
      recommendation: aiResult.prediction,
    });

    // Executive Summary
    setExecutiveSummary({
      attack: aiResult.threat,
      impact: aiResult.summary,
      status: "Contained",
      risk: aiResult.severity,
      recommendation: aiResult.prediction,
    });

    // Attack Flow
    setAttackFlow([
      { name: "Internet", status: "healthy" },
      { name: "Employee Laptop", status: "critical" },
      { name: "Web Server", status: "critical" },
      { name: "Database", status: "warning" },
      { name: "Backup Server", status: "healthy" },
    ]);

    // Activity Feed
    setActivityFeedData((prev) => [
      {
        user: "AI-Core",
        action: "Malware detected on Finance-DB-01",
        time: "Just now",
        icon: <ShieldAlert className="w-4 h-4 text-red-500" />,
      },
      ...prev,
    ]);

    // Incident Table
    setIncidentData((prev) => [
      {
        id: "INC-9001",
        target: "Finance-DB-01",
        type: "Malware",
        status: "Blocked",
        severity: "Critical",
        time: "Just now",
      },
      ...prev,
    ]);

    toast.error("Malware detected on Web Server");

    setAttackActive(true);

  } catch (error) {
    console.error(error);

    toast.error("Gemini AI analysis failed.");

    setAiThreat("Unknown Threat");
    setAiConfidence("0%");
    setAiStatus("Analysis Failed");
    setAiMessage("Unable to analyze logs using Gemini.");
    setAiActions([
      "Retry analysis",
      "Check API connection",
    ]);

  } finally {
    setIsAnalyzing(false);

  }
};
const runRansomwareSimulation = async () => {
  setActiveSimulation("Run Ransomware Sim");
setIsAnalyzing(true);

  try {
   const aiResult = await analyzeThreat([
  "500 files encrypted",
  "CPU usage 99%",
  "PowerShell script executed",
  "Backup server connection detected",
]);

console.log(aiResult);
    // Dashboard Stats
    setThreatLevel("CRITICAL");
    setActiveThreats(78);
    setHealthyDevices(1198);

    // Timeline & Infrastructure
    setTimelineData(ransomwareTimeline);
    setInfrastructure(ransomwareInfrastructure);

    // AI Insights
    setAiThreat(aiResult.threat);
    const confidence =
  aiResult.confidence > 1
    ? Math.round(aiResult.confidence)
    : Math.round(aiResult.confidence * 100);

setAiConfidence(`${confidence}%`);
    setAiStatus("Recovery In Progress");
    setAiMessage(aiResult.summary);
    setAiActions(
      Array.isArray(aiResult.actions) ? aiResult.actions : []
    );

    // Prediction
    setPrediction({
      risk: `${Math.round(aiResult.confidence * 100)}%`,
      target: "Backup Server",
      spread: "2 Critical Systems",
      recommendation: aiResult.prediction,
    });

    // Executive Summary
    setExecutiveSummary({
      attack: aiResult.threat,
      impact: aiResult.summary,
      status: "AI Analysis Complete",
      risk: aiResult.severity,
      recommendation: aiResult.prediction,
    });

    // Attack Flow
    setAttackFlow([
      { name: "Internet", status: "healthy" },
      { name: "Employee Laptop", status: "healthy" },
      { name: "Web Server", status: "warning" },
      { name: "Database", status: "critical" },
      { name: "Backup Server", status: "recovering" },
    ]);

    // Activity Feed
    setActivityFeedData((prev) => [
      {
        user: "AI-Core",
        action: "Backup recovery initiated",
        time: "Just now",
        icon: <Database className="w-4 h-4 text-orange-500" />,
      },
      ...prev,
    ]);

    // Incident Table
    setIncidentData((prev) => [
      {
        id: "INC-9002",
        target: "Finance-DB-01",
        type: "Ransomware",
        status: "Recovering",
        severity: "Critical",
        time: "Just now",
      },
      ...prev,
    ]);

    toast.error("Ransomware Attack Detected");

    setAttackActive(true);
  } catch (error) {
    console.error(error);

    toast.error("Gemini AI analysis failed.");

    setAiThreat("Unknown Threat");
    setAiConfidence("0%");
    setAiStatus("Analysis Failed");
    setAiMessage("Unable to analyze logs using Gemini.");
    setAiActions([
      "Retry analysis",
      "Check API connection",
    ]);
  } finally {
    setIsAnalyzing(false);
setActiveSimulation("");
  }
};

const runDDoSSimulation = async () => {
  setActiveSimulation("Trigger DDoS Stress");
setIsAnalyzing(true);

  try {
    const aiResult = await analyzeThreat([
      "Incoming traffic 8 Gbps",
      "500000 requests per second",
      "Multiple IP addresses detected",
      "Web server response timeout",
    ]);

    // Dashboard Stats
    setThreatLevel("HIGH");
    setActiveThreats(95);
    setHealthyDevices(1230);

    // Timeline & Infrastructure
    setTimelineData(ddosTimeline);
    setInfrastructure(ddosInfrastructure);

    // AI Insights
    setAiThreat(aiResult.threat);
    const confidence =
  aiResult.confidence > 1
    ? Math.round(aiResult.confidence)
    : Math.round(aiResult.confidence * 100);

setAiConfidence(`${confidence}%`);
    setAiStatus("Traffic Stabilizing");
    setAiMessage(aiResult.summary);
    setAiActions(
      Array.isArray(aiResult.actions) ? aiResult.actions : []
    );

    // Prediction
    setPrediction({
      risk: `${Math.round(aiResult.confidence * 100)}%`,
      target: "API Gateway",
      spread: "Network Services",
      recommendation: aiResult.prediction,
    });

    // Executive Summary
    setExecutiveSummary({
      attack: aiResult.threat,
      impact: aiResult.summary,
      status: "Traffic Mitigated",
      risk: aiResult.severity,
      recommendation: aiResult.prediction,
    });

    // Attack Flow
    setAttackFlow([
      { name: "Internet", status: "critical" },
      { name: "Employee Laptop", status: "healthy" },
      { name: "Web Server", status: "warning" },
      { name: "Database", status: "healthy" },
      { name: "Backup Server", status: "healthy" },
    ]);

    // Activity Feed
    setActivityFeedData((prev) => [
      {
        user: "Firewall AI",
        action: "Blocked suspicious traffic",
        time: "Just now",
        icon: <ShieldAlert className="w-4 h-4 text-red-500" />,
      },
      ...prev,
    ]);

    // Incident Table
    setIncidentData((prev) => [
      {
        id: "INC-9003",
        target: "Public API Gateway",
        type: "DDoS",
        status: "Mitigated",
        severity: "High",
        time: "Just now",
      },
      ...prev,
    ]);

    toast.error("DDoS Attack Detected");

    setAttackActive(true);

  } catch (error) {
    console.error(error);

    toast.error("Gemini AI analysis failed.");

    setAiThreat("Unknown Threat");
    setAiConfidence("0%");
    setAiStatus("Analysis Failed");
    setAiMessage("Unable to analyze logs using Gemini.");
    setAiActions([
      "Retry analysis",
      "Check API connection",
    ]);

  } finally {
    setIsAnalyzing(false);
setActiveSimulation("");

  }
};
const runInsiderThreatSimulation = async () => {
  setActiveSimulation("Insider Threat Audit");
setIsAnalyzing(true);

  try {
    const aiResult = await analyzeThreat([
      "Admin logged in at 3:12 AM",
      "Sensitive files copied",
      "USB storage connected",
      "Database exported",
    ]);

    // Dashboard Stats
    setThreatLevel("ELEVATED");
    setActiveThreats(27);
    setHealthyDevices(1238);

    // Timeline & Infrastructure
    setTimelineData(insiderTimeline);
    setInfrastructure(insiderInfrastructure);

    // AI Insights
    setAiThreat(aiResult.threat);
    const confidence =
  aiResult.confidence > 1
    ? Math.round(aiResult.confidence)
    : Math.round(aiResult.confidence * 100);

setAiConfidence(`${confidence}%`);
    setAiStatus("Investigation Running");
    setAiMessage(aiResult.summary);
    setAiActions(
      Array.isArray(aiResult.actions) ? aiResult.actions : []
    );

    // Prediction
    setPrediction({
      risk: `${Math.round(aiResult.confidence * 100)}%`,
      target: "Database",
      spread: "Sensitive Records",
      recommendation: aiResult.prediction,
    });

    // Executive Summary
    setExecutiveSummary({
      attack: aiResult.threat,
      impact: aiResult.summary,
      status: "User Isolated",
      risk: aiResult.severity,
      recommendation: aiResult.prediction,
    });

    // Attack Flow
    setAttackFlow([
      { name: "Internet", status: "healthy" },
      { name: "Employee Laptop", status: "warning" },
      { name: "Web Server", status: "warning" },
      { name: "Database", status: "critical" },
      { name: "Backup Server", status: "healthy" },
    ]);

    // Activity Feed
    setActivityFeedData((prev) => [
      {
        user: "Identity AI",
        action: "Compromised account disabled",
        time: "Just now",
        icon: <UserX className="w-4 h-4 text-yellow-500" />,
      },
      ...prev,
    ]);

    // Incident Table
    setIncidentData((prev) => [
      {
        id: "INC-9004",
        target: "Admin Console",
        type: "Insider Threat",
        status: "Contained",
        severity: "Medium",
        time: "Just now",
      },
      ...prev,
    ]);

    toast.warning("Suspicious employee activity detected");

    setAttackActive(true);

  } catch (error) {
    console.error(error);

    toast.error("Gemini AI analysis failed.");

    setAiThreat("Unknown Threat");
    setAiConfidence("0%");
    setAiStatus("Analysis Failed");
    setAiMessage("Unable to analyze logs using Gemini.");
    setAiActions([
      "Retry analysis",
      "Check API connection",
    ]);

  } finally {
   setIsAnalyzing(false);
setActiveSimulation("");
  }
};

const runPhishingSimulation = async () => {
  setActiveSimulation("Phishing Sim Test");
setIsAnalyzing(true);

  try {
    const aiResult = await analyzeThreat([
      "Employee clicked phishing email",
      "Credential submission detected",
      "Login from foreign IP",
      "Mailbox forwarding rule created",
    ]);

    // Dashboard Stats
    setThreatLevel("MEDIUM");
    setActiveThreats(31);
    setHealthyDevices(1224);

    // Timeline & Infrastructure
    setTimelineData(phishingTimeline);
    setInfrastructure(phishingInfrastructure);

    // AI Insights
    setAiThreat(aiResult.threat);
    const confidence =
  aiResult.confidence > 1
    ? Math.round(aiResult.confidence)
    : Math.round(aiResult.confidence * 100);

setAiConfidence(`${confidence}%`);
    setAiStatus("Threat Neutralized");
    setAiMessage(aiResult.summary);
    setAiActions(
      Array.isArray(aiResult.actions) ? aiResult.actions : []
    );

    // Prediction
    setPrediction({
      risk: `${Math.round(aiResult.confidence * 100)}%`,
      target: "Employee Accounts",
      spread: "Mail Infrastructure",
      recommendation: aiResult.prediction,
    });

    // Executive Summary
    setExecutiveSummary({
      attack: aiResult.threat,
      impact: aiResult.summary,
      status: "Emails Quarantined",
      risk: aiResult.severity,
      recommendation: aiResult.prediction,
    });

    // Attack Flow
    setAttackFlow([
      { name: "Internet", status: "healthy" },
      { name: "Employee Laptop", status: "critical" },
      { name: "Web Server", status: "healthy" },
      { name: "Database", status: "warning" },
      { name: "Backup Server", status: "healthy" },
    ]);

    // Activity Feed
    setActivityFeedData((prev) => [
      {
        user: "Mail AI",
        action: "73 phishing emails quarantined",
        time: "Just now",
        icon: <MailWarning className="w-4 h-4 text-blue-500" />,
      },
      ...prev,
    ]);

    // Incident Table
    setIncidentData((prev) => [
      {
        id: "INC-9005",
        target: "Corporate Email",
        type: "Phishing",
        status: "Blocked",
        severity: "Medium",
        time: "Just now",
      },
      ...prev,
    ]);

    toast.warning("Phishing email compromised employee account");

    setAttackActive(true);

  } catch (error) {
    console.error(error);

    toast.error("Gemini AI analysis failed.");

    setAiThreat("Unknown Threat");
    setAiConfidence("0%");
    setAiStatus("Analysis Failed");
    setAiMessage("Unable to analyze logs using Gemini.");
    setAiActions([
      "Retry analysis",
      "Check API connection",
    ]);

  } finally {
    setIsAnalyzing(false);
setActiveSimulation("");
  }
};

const startRecovery = () => {
    toast.info("AI Auto-Defense initiated");
  setIsRecovering(true);
  setRecoveryProgress(0);

  let progress = 0;

  const interval = setInterval(() => {
    progress += 20;
    setRecoveryProgress(progress);
    if (progress === 20) {
  setInfrastructure((prev) =>
    prev.map((item) =>
      item.name === "Database"
        ? { ...item, status: "recovering" }
        : item
    )
  );
  setActivityFeedData((prev) => [
  {
    user: "Recovery AI",
    action: "Threat isolated from infected systems",
    time: "Now",
    icon: <ShieldAlert className="w-4 h-4 text-orange-400" />,
  },
  ...prev,
]);
}

if (progress === 40) {
  setInfrastructure((prev) =>
    prev.map((item) =>
      item.name === "Backup Server"
        ? { ...item, status: "healthy" }
        : item
    )
  );
  setActivityFeedData((prev) => [
  {
    user: "Recovery AI",
    action: "Backup services restored",
    time: "Now",
    icon: <RefreshCcw className="w-4 h-4 text-cyan-400" />,
  },
  ...prev,
]);
}

if (progress === 60) {
  setInfrastructure((prev) =>
    prev.map((item) =>
      item.name === "Database"
        ? { ...item, status: "healthy" }
        : item
    )
  );
  setActivityFeedData((prev) => [
  {
    user: "Recovery AI",
    action: "Critical database secured",
    time: "Now",
    icon: <Database className="w-4 h-4 text-green-400" />,
  },
  ...prev,
]);
}

    if (progress >= 100) {
      clearInterval(interval);
      toast.success("All systems restored successfully");

      setThreatLevel("LOW");
      setActiveThreats(2);
      setHealthyDevices(1242);
      setAttackFlow([
  { name: "Internet", status: "healthy" },
  { name: "Employee Laptop", status: "healthy" },
  { name: "Web Server", status: "healthy" },
  { name: "Database", status: "healthy" },
  { name: "Backup Server", status: "healthy" },
]);
      

      setTimelineData(defaultTimelineData);
      setInfrastructure(defaultInfrastructure);

      setAiThreat("System Secure");
      setAiConfidence("99.9%");
      setAiStatus("Recovery Complete");
      setExecutiveSummary({
  attack: "None",
  impact: "No active incidents",
  status: "Secure",
  risk: "Low",
  recommendation: "System operating normally.",
});

      setAiActions([
        "Infrastructure restored",
        "Threat contained",
        "Monitoring resumed",
      ]);
      setPrediction({
  risk: "12%",
  target: "None",
  spread: "0 Systems",
  recommendation: "System operating normally.",
});
setActivityFeedData((prev) => [
  {
    user: "Recovery AI",
    action: "Recovery completed. Infrastructure back online.",
    time: "Now",
    icon: <CheckCircle2 className="w-4 h-4 text-green-500" />,
  },
  ...prev,
]);

      setIsRecovering(false);
      setAttackActive(false);
    }
  }, 1000);
};
  if (!mounted) return null;

  
  const getStatusColor = (status: string) => {
  switch (status) {
    case "healthy":
      return "bg-green-500";
    case "warning":
      return "bg-yellow-500";
    case "critical":
      return "bg-red-500";
    case "recovering":
      return "bg-orange-500";
    default:
      return "bg-gray-500";
  }
};
const getFlowColor = (status: string) => {
  switch (status) {
    case "healthy":
      return "bg-green-500";

    case "warning":
      return "bg-yellow-500";

    case "critical":
      return "bg-red-500";

    case "recovering":
      return "bg-orange-500";

    default:
      return "bg-gray-500";
  }
};

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-4 lg:p-8 font-sans selection:bg-cyan-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-slate-900/40 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="bg-cyan-500/20 p-2 rounded-lg border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <Shield className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">CYBERSHIELD <span className="text-cyan-400">SOC</span></h1>
            <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Neural Command Interface</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-4 bg-slate-950/50 px-4 py-2 rounded-full border border-white/5">
            <Search className="w-4 h-4 text-slate-500" />
            <input type="text" placeholder="Search Entity Hub..." className="bg-transparent text-sm outline-none w-48 text-slate-300" />
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-white/5 relative group transition-colors">
              <Bell className="w-5 h-5 text-slate-400 group-hover:text-cyan-400" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
            </button>
            <button className="p-2 rounded-full hover:bg-white/5 transition-colors">
              <Settings className="w-5 h-5 text-slate-400" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 border border-white/20 shadow-lg" />
          </div>
        </div>
      </nav>

      {/* Top Stats Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Threat Level', val: threatLevel,  icon: <AlertTriangle className="text-yellow-500" />, color: 'from-yellow-500/20' },
          { label: 'Active Threats', val:activeThreats.toString(), icon: <Activity className="text-red-500" />, color: 'from-red-500/20' },
          {
  label: 'Healthy Devices',
  val: healthyDevices.toLocaleString(),
  icon: <Monitor className="text-green-500" />,
  color: 'from-green-500/20'
},
          { label: 'Attacks Blocked', val: '8,412', icon: <CheckCircle2 className="text-cyan-500" />, color: 'from-cyan-500/20' },
          { label: 'AI Confidence', val: aiConfidence, icon: <Zap className="text-blue-500" />, color: 'from-blue-500/20' },
        ].map((stat, i) => (
          <div
  key={i}
  className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-5 rounded-2xl relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] shadow-lg"
>
             <div className={`absolute -right-4 -top-4 w-20 h-20 bg-gradient-to-br ${stat.color} to-transparent blur-2xl opacity-40`} />
             <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-lg bg-slate-950 border border-white/5 shadow-inner">{stat.icon}</div>
                <MoreHorizontal className="w-4 h-4 text-slate-600 cursor-pointer hover:text-white" />
             </div>
             <p className="text-xs text-slate-500 font-semibold mb-1 uppercase tracking-wider">{stat.label}</p>
             <h3 className="text-2xl font-bold text-white tracking-tight">
  {stat.label === "Active Threats" ? (
    <CountUp end={activeThreats} duration={1} preserveValue />
  ) : stat.label === "Healthy Devices" ? (
    <CountUp end={healthyDevices} duration={1} preserveValue separator="," />
  ) : (
    stat.val
  )}
</h3>
          </div>
        ))}
      </div>

      <div className="relative z-10 grid grid-cols-12 gap-6">
        {/* Threat Timeline Chart */}
        <div className="col-span-12 lg:col-span-8 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-lg font-bold text-white">Threat Timeline</h2>
              <p className="text-xs text-slate-500">Real-time vector analysis across network</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] px-3 py-1 rounded-md font-bold uppercase">Live</button>
              <button className="bg-slate-950 border border-white/10 text-slate-400 text-[10px] px-3 py-1 rounded-md font-bold uppercase hover:bg-white/5">History</button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#22d3ee' }}
                />
                <Area type="monotone" dataKey="threats" stroke="#22d3ee" strokeWidth={3} fillOpacity={1} fill="url(#colorThreats)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="col-span-12 lg:col-span-4 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl overflow-hidden">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            System Feed
          </h2>
          <div className="space-y-6">
            {activityFeedData.map((item, i) => (
              <div key={i} className="flex gap-4 group cursor-default hover:translate-x-1 transition-all duration-200">
                <div className="mt-1 transition-transform group-hover:scale-110">{item.icon}</div>
                <div className="flex-1 border-b border-white/5 pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">{item.user}</p>
                    <span className="text-[10px] text-slate-500 font-mono">{item.time}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{item.action}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2.5 rounded-xl border border-white/5 bg-slate-950/30 text-xs text-slate-500 font-semibold hover:text-white hover:bg-white/5 transition-all">
            Open Global Logs
          </button>
        </div>

        {/* Attack Flow Visualization */}
<div className="col-span-12 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
  <h2 className="text-lg font-bold text-white mb-6">
    AI Attack Flow Visualization
  </h2>

  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
    {attackFlow.map((node, index) => (
      <React.Fragment key={node.name}>
        <div className="flex flex-col items-center">
          <div
            className={`w-6 h-6 rounded-full ${getFlowColor(
              node.status
            )} shadow-lg`}
          />

          <p className="mt-2 text-sm font-medium text-white text-center">
            {node.name}
          </p>

          <span className="text-xs text-slate-400 capitalize">
            {node.status}
          </span>
        </div>

        {index !== attackFlow.length - 1 && (
          <div className="hidden md:flex flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
            <div className="w-full bg-cyan-500 opacity-40"></div>
          </div>
        )}
      </React.Fragment>
    ))}
  </div>
</div>

        {/* Recent Incidents Table */}
        <div className="col-span-12 lg:col-span-9 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-slate-950/20">
            <h2 className="text-lg font-bold text-white">Critical Incidents</h2>
            <div className="flex gap-2">
              <span className="bg-red-500/20 text-red-400 text-[10px] px-2 py-0.5 rounded border border-red-500/20">4 Priority</span>
              <span className="bg-blue-500/20 text-blue-400 text-[10px] px-2 py-0.5 rounded border border-blue-500/20">View All</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950/50 text-slate-500 uppercase text-[10px] tracking-widest font-bold">
                <tr>
                  <th className="px-6 py-4">Incident ID</th>
                  <th className="px-6 py-4">Endpoint</th>
                  <th className="px-6 py-4">Vector</th>
                  <th className="px-6 py-4">Severity</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {incidentData.map((incident, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors cursor-pointer group">
                    <td className="px-6 py-4 font-mono text-cyan-400 text-xs tracking-tighter">{incident.id}</td>
                    <td className="px-6 py-4 text-slate-200 flex items-center gap-2 font-medium">
                      <Monitor className="w-3.5 h-3.5 text-slate-500" />
                      {incident.target}
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs">{incident.type}</td>
                    <td className="px-6 py-4">
                      <div className={`px-2 py-0.5 rounded-md text-[10px] font-bold w-fit ${
                        incident.severity === 'Critical' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                        incident.severity === 'High' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                        'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}>
                        {incident.severity}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs">
                        <div className={`w-1.5 h-1.5 rounded-full ${incident.status === 'Blocked' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-yellow-500 animate-pulse shadow-[0_0_8px_rgba(234,179,8,0.5)]'}`} />
                        {incident.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Controls */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          {/* Quick Actions Panel */}
          <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-5 flex items-center gap-2">
              <Play className="w-4 h-4 text-cyan-400" /> Simulation Tools
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: 'Run Malware Simulation', icon: <Bug className="w-4 h-4" /> },
                { label: 'Run Ransomware Sim', icon: <Database className="w-4 h-4" /> },
                { label: 'Trigger DDoS Stress', icon: <Activity className="w-4 h-4" /> },
                { label: 'Insider Threat Audit', icon: <Lock className="w-4 h-4" /> },
                { label: 'Phishing Sim Test', icon: <Mail className="w-4 h-4" /> },
              ].map((action, i) => (
                <button key={i} 
                disabled={isAnalyzing}
                onClick={() => {
  switch (action.label) {
    case "Run Malware Simulation":
      runMalwareSimulation();
      break;

    case "Run Ransomware Sim":
      runRansomwareSimulation();
      
      break;

    case "Trigger DDoS Stress":
      runDDoSSimulation();
      break;

    case "Insider Threat Audit":
      runInsiderThreatSimulation();
      break;

    case "Phishing Sim Test":
      runPhishingSimulation();
      break;

    default:
      break;
  }
}}
className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-950/60 border border-white/5 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all duration-200 hover:scale-105 active:scale-95 text-xs font-semibold text-slate-400 group">
                  <span className="text-cyan-500 group-hover:scale-110 transition-transform">{action.icon}</span>
                  {isAnalyzing && activeSimulation === action.label
  ? "🤖 AI Analyzing..."
  : action.label}
                </button>
              ))}
            </div>
          </div>

          {/* AI Advisor Panel */}
          <div className="bg-gradient-to-br from-cyan-600/10 to-blue-600/10 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Cpu className="w-24 h-24 text-cyan-400" />
            </div>
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" /> AI Insights
            </h3>
            <div className="space-y-4">

  <div className="bg-slate-950/40 rounded-xl border border-white/5 p-3">
    <p className="text-[10px] uppercase tracking-wider text-slate-500">
      Threat
    </p>

    <p className="text-sm font-semibold text-cyan-400">
      {aiThreat}
    </p>
  </div>

  <div className="grid grid-cols-2 gap-3">

    <div className="bg-slate-950/40 rounded-xl p-3 border border-white/5">
      <p className="text-[10px] uppercase text-slate-500">
        Confidence
      </p>

     <p className="text-lg font-bold text-green-400 animate-pulse">
  {aiConfidence}
</p>
    </div>

    <div className="bg-slate-950/40 rounded-xl p-3 border border-white/5">
      <p className="text-[10px] uppercase text-slate-500">
        Status
      </p>

      <p className="text-sm font-semibold text-yellow-400">
        {aiStatus}
      </p>
    </div>

  </div>
<div className="bg-slate-950/40 rounded-xl border border-white/5 p-3">
  <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">
    AI Analysis
  </p>

  <p className="text-xs text-slate-300">
    {aiMessage}
  </p>
</div>
  <div className="bg-slate-950/40 rounded-xl border border-white/5 p-3">

    <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">
      AI Actions
    </p>

    <div className="space-y-2">

      {Array.isArray(aiActions) &&
  aiActions.map((action, index) => (

        <div
          key={index}
          className="flex items-center gap-2 text-xs text-slate-300"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />

          {action}

        </div>

      ))}

    </div>

  </div>

</div>
{isRecovering && (
  <div className="mt-4">
    <div className="flex justify-between text-xs text-slate-400 mb-2">
      <span>Recovery Progress</span>
      <span>{recoveryProgress}%</span>
    </div>

    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
      <div
        className="h-full bg-cyan-500 transition-all duration-500"
        style={{ width: `${recoveryProgress}%` }}
      />
    </div>
  </div>
)}
           <button
  onClick={startRecovery}
  disabled={!attackActive || isRecovering}
  className="w-full bg-cyan-500 hover:bg-cyan-600 hover:scale-105 active:scale-95 disabled:bg-slate-700 disabled:cursor-not-allowed text-white py-2 rounded-lg transition-all duration-200"
>
  {!attackActive
    ? "No Active Threat"
    : isRecovering
    ? "Recovery in Progress..."
    : "Execute Auto-Defense"}
</button>
<div className="bg-slate-900 rounded-xl p-4 border border-slate-800 mt-4">
  <h3 className="text-lg font-semibold text-cyan-400 mb-3">
    Executive AI Summary
  </h3>

  <div className="space-y-2 text-sm">
    <p><span className="text-slate-400">Attack:</span> {executiveSummary.attack}</p>
    <p><span className="text-slate-400">Impact:</span> {executiveSummary.impact}</p>
    <p><span className="text-slate-400">Status:</span> {executiveSummary.status}</p>
    <p><span className="text-slate-400">Business Risk:</span> {executiveSummary.risk}</p>

    <div className="pt-2 border-t border-slate-700">
      <p className="text-cyan-300">
        {executiveSummary.recommendation}
      </p>
    </div>
  </div>
</div>
<div className="bg-slate-900 rounded-xl p-4 border border-slate-800 mt-4">
  <h3 className="text-lg font-semibold text-cyan-400 mb-3">
    AI Threat Prediction
  </h3>

  <div className="space-y-3 text-sm">
    <div>
      <span className="text-slate-400">Risk Score:</span>
      <p className="text-red-400 font-semibold">{prediction.risk}</p>
    </div>

    <div>
      <span className="text-slate-400">Likely Next Target:</span>
      <p>{prediction.target}</p>
    </div>

    <div>
      <span className="text-slate-400">Estimated Spread:</span>
      <p>{prediction.spread}</p>
    </div>

    <div>
      <span className="text-slate-400">Recommended Action:</span>
      <p className="text-cyan-300">{prediction.recommendation}</p>
    </div>
  </div>
</div>
          </div>
          {/* Cyber Infrastructure */}
<div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
  <h3 className="text-sm font-bold text-white mb-5 flex items-center gap-2">
    <Shield className="w-4 h-4 text-cyan-400" />
    Cyber Infrastructure
  </h3>

  <div className="space-y-4">
    {infrastructure.map((device) => (
      <div
        key={device.name}
        className="flex items-center justify-between bg-slate-950/40 rounded-lg p-3 border border-white/5"
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${getStatusColor(device.status)} ${
  device.status === "critical" ? "animate-pulse" : ""
}`}
          />
          <span className="text-sm text-slate-200">
            {device.name}
          </span>
        </div>

        <span className="text-xs text-slate-400 capitalize">
          {device.status}
        </span>
      </div>
    ))}
  </div>
</div>
        </div>
      </div>
    </div>
  );
}