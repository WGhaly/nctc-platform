// Mock data for NCTC Platform

export const mockUser = {
  id: '1',
  name: 'Ahmed Hassan',
  email: 'ahmed.hassan@nctc.gov.eg',
  role: 'nctc', // 'nctc', 'otc', 'cc', 'researcher'
  institution: 'NCTC Central',
  avatar: 'https://ui-avatars.com/api/?name=Ahmed+Hassan&background=2563eb&color=fff'
};

export const clusters = [
  { id: 'eng', name: 'Engineering & Technology', color: 'blue', count: 12 },
  { id: 'ict', name: 'ICT & Digital Technologies', color: 'purple', count: 15 },
  { id: 'life', name: 'Life Sciences & Biotechnology', color: 'green', count: 8 },
  { id: 'phys', name: 'Physical Sciences & Materials', color: 'red', count: 6 },
  { id: 'health', name: 'Health Sciences & Medical Tech', color: 'pink', count: 10 },
  { id: 'env', name: 'Environmental Sciences', color: 'teal', count: 7 }
];

export const pillars = [
  { id: 'academic', name: 'Academic Excellence' },
  { id: 'lab', name: 'Lab Facilities Access' },
  { id: 'pilot', name: 'Pilot Facilities Access' },
  { id: 'industry', name: 'Industry Engaged' },
  { id: 'grant', name: 'Grant Oriented' },
  { id: 'commercial', name: 'Commercialization Leading' }
];

export const otcs = [
  {
    id: '1',
    name: 'Cairo University TTO',
    institution: 'Cairo University',
    city: 'Cairo',
    director: 'Dr. Fatma El-Sayed',
    email: 'tto@cu.edu.eg',
    status: 'active',
    clusters: ['eng', 'ict'],
    pillars: ['academic', 'lab', 'commercial'],
    isClusterCoordinator: true,
    coordinatorFor: 'eng',
    fundingCycle: 2,
    fundingReceived: 2400000,
    fundingTotal: 3000000,
    performance: 'exceeds',
    kpis: {
      disclosures: 24,
      patents: 8,
      licenses: 3,
      spinoffs: 1,
      revenue: 450000
    },
    joinDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Alexandria University OTC',
    institution: 'Alexandria University',
    city: 'Alexandria',
    director: 'Prof. Mohamed Rashad',
    email: 'otc@alexu.edu.eg',
    status: 'active',
    clusters: ['life', 'health'],
    pillars: ['academic', 'lab', 'industry'],
    isClusterCoordinator: false,
    fundingCycle: 2,
    fundingReceived: 1800000,
    fundingTotal: 2400000,
    performance: 'meets',
    kpis: {
      disclosures: 18,
      patents: 5,
      licenses: 2,
      spinoffs: 0,
      revenue: 280000
    },
    joinDate: '2023-02-01'
  },
  {
    id: '3',
    name: 'Ain Shams Innovation Hub',
    institution: 'Ain Shams University',
    city: 'Cairo',
    director: 'Dr. Laila Mahmoud',
    email: 'innovation@asu.edu.eg',
    status: 'active',
    clusters: ['ict', 'phys'],
    pillars: ['academic', 'pilot', 'grant'],
    isClusterCoordinator: true,
    coordinatorFor: 'ict',
    fundingCycle: 1,
    fundingReceived: 1200000,
    fundingTotal: 3200000,
    performance: 'meets',
    kpis: {
      disclosures: 15,
      patents: 4,
      licenses: 1,
      spinoffs: 2,
      revenue: 120000
    },
    joinDate: '2023-03-10'
  },
  {
    id: '4',
    name: 'Assiut University TTC',
    institution: 'Assiut University',
    city: 'Assiut',
    director: 'Dr. Yasser Ahmed',
    email: 'ttc@aun.edu.eg',
    status: 'active',
    clusters: ['env', 'life'],
    pillars: ['academic', 'lab', 'industry'],
    isClusterCoordinator: false,
    fundingCycle: 1,
    fundingReceived: 900000,
    fundingTotal: 2000000,
    performance: 'needs-improvement',
    kpis: {
      disclosures: 8,
      patents: 2,
      licenses: 0,
      spinoffs: 0,
      revenue: 0
    },
    joinDate: '2023-04-20'
  },
  {
    id: '5',
    name: 'Mansoura University Innovation Office',
    institution: 'Mansoura University',
    city: 'Mansoura',
    director: 'Prof. Hoda Ibrahim',
    email: 'innovation@mans.edu.eg',
    status: 'active',
    clusters: ['health', 'life'],
    pillars: ['academic', 'lab', 'commercial'],
    isClusterCoordinator: true,
    coordinatorFor: 'health',
    fundingCycle: 2,
    fundingReceived: 2100000,
    fundingTotal: 2800000,
    performance: 'exceeds',
    kpis: {
      disclosures: 21,
      patents: 7,
      licenses: 4,
      spinoffs: 1,
      revenue: 520000
    },
    joinDate: '2023-01-25'
  }
];

export const disclosures = [
  {
    id: 'DISC-2024-001',
    title: 'AI-Powered Water Quality Monitoring System',
    inventor: 'Dr. Khaled Abdel-Rahman',
    inventorEmail: 'k.rahman@cu.edu.eg',
    otc: '1',
    otcName: 'Cairo University TTO',
    cluster: 'env',
    submissionDate: '2024-11-15',
    status: 'evaluation',
    evaluationStatus: 'technical-complete',
    commercialPathway: null,
    description: 'IoT-based system using AI/ML for real-time water quality monitoring in the Nile',
    technicalScore: 8.5,
    marketScore: null,
    ipScore: null,
    decision: null,
    timeline: {
      received: '2024-11-15',
      acknowledged: '2024-11-16',
      initialMeeting: '2024-11-20',
      evaluationDue: '2024-12-20'
    }
  },
  {
    id: 'DISC-2024-002',
    title: 'Novel Drug Delivery Nanoparticles for Cancer Treatment',
    inventor: 'Prof. Sara Mostafa',
    inventorEmail: 's.mostafa@alexu.edu.eg',
    otc: '2',
    otcName: 'Alexandria University OTC',
    cluster: 'health',
    submissionDate: '2024-10-05',
    status: 'approved',
    evaluationStatus: 'complete',
    commercialPathway: 'licensing',
    description: 'Biodegradable nanoparticles for targeted cancer drug delivery',
    technicalScore: 9.2,
    marketScore: 8.8,
    ipScore: 8.5,
    decision: 'go',
    timeline: {
      received: '2024-10-05',
      acknowledged: '2024-10-06',
      initialMeeting: '2024-10-12',
      evaluationComplete: '2024-11-10',
      decisionDate: '2024-11-15'
    }
  },
  {
    id: 'DISC-2024-003',
    title: 'Smart Agriculture Platform for Small Farmers',
    inventor: 'Eng. Omar Hassan',
    inventorEmail: 'o.hassan@asu.edu.eg',
    otc: '3',
    otcName: 'Ain Shams Innovation Hub',
    cluster: 'ict',
    submissionDate: '2024-12-01',
    status: 'intake',
    evaluationStatus: 'pending',
    commercialPathway: null,
    description: 'Mobile platform connecting farmers with resources, weather data, and market prices',
    technicalScore: null,
    marketScore: null,
    ipScore: null,
    decision: null,
    timeline: {
      received: '2024-12-01',
      acknowledged: '2024-12-02',
      initialMeetingScheduled: '2024-12-18'
    }
  }
];

export const projects = [
  {
    id: 'PROJ-2024-001',
    title: 'Smart Grid Energy Management System',
    otc: '1',
    otcName: 'Cairo University TTO',
    cluster: 'eng',
    pathway: 'licensing',
    status: 'negotiation',
    stage: 'licensee-due-diligence',
    inventor: 'Prof. Ahmed Sabry',
    potentialLicensee: 'EgyptTech Solutions',
    estimatedValue: 2500000,
    startDate: '2023-06-10',
    lastUpdate: '2024-12-10',
    progress: 75,
    nextMilestone: 'Final license agreement review',
    ipStatus: 'patent-filed'
  },
  {
    id: 'PROJ-2024-002',
    title: 'BioPharma Startup - NanoMed Egypt',
    otc: '2',
    otcName: 'Alexandria University OTC',
    cluster: 'health',
    pathway: 'spinoff',
    status: 'active',
    stage: 'company-formation',
    founders: ['Prof. Sara Mostafa', 'Dr. Tarek Amin'],
    investmentRaised: 5000000,
    institutionalEquity: 15,
    startDate: '2024-03-15',
    lastUpdate: '2024-12-12',
    progress: 60,
    nextMilestone: 'Equity agreement finalization',
    ipStatus: 'patent-pending'
  },
  {
    id: 'PROJ-2024-003',
    title: 'Mobile Learning Platform License',
    otc: '3',
    otcName: 'Ain Shams Innovation Hub',
    cluster: 'ict',
    pathway: 'licensing',
    status: 'active',
    stage: 'post-licensing',
    inventor: 'Dr. Mona Khalil',
    licensee: 'EduTech Egypt',
    licenseRevenue: 450000,
    royaltyRate: 7,
    startDate: '2023-09-01',
    lastUpdate: '2024-11-30',
    progress: 100,
    nextMilestone: 'Annual performance review',
    ipStatus: 'licensed'
  }
];

export const applications = [
  {
    id: 'APP-2024-001',
    institution: 'Helwan University',
    city: 'Cairo',
    applicant: 'Dr. Nadia El-Sherbiny',
    email: 'tto@helwan.edu.eg',
    submissionDate: '2024-11-01',
    status: 'under-review',
    stage: 'institutional-visit-scheduled',
    requestedClusters: ['eng', 'ict'],
    requestedPillars: ['academic', 'lab'],
    assessmentScore: 7.2,
    visitDate: '2024-12-20',
    decision: null
  },
  {
    id: 'APP-2024-002',
    institution: 'Zagazig University',
    city: 'Zagazig',
    applicant: 'Prof. Walid Gomaa',
    email: 'innovation@zu.edu.eg',
    submissionDate: '2024-10-15',
    status: 'accepted',
    stage: 'onboarding',
    requestedClusters: ['life', 'env'],
    requestedPillars: ['academic', 'lab', 'industry'],
    assessmentScore: 8.5,
    visitDate: '2024-11-10',
    visitReport: 'Excellent facilities, strong research track record',
    decision: 'accepted',
    decisionDate: '2024-11-25',
    onboardingDate: '2025-01-15'
  }
];

export const services = [
  {
    id: 'SRV-2024-001',
    title: 'IP Patent Filing Support',
    requestingOTC: '4',
    requestingOTCName: 'Assiut University TTC',
    providingOTC: '1',
    providingOTCName: 'Cairo University TTO',
    serviceType: 'commercialization',
    status: 'in-progress',
    requestDate: '2024-11-01',
    startDate: '2024-11-15',
    completionDate: null,
    budget: 50000,
    description: 'Support for filing international patent application (PCT)',
    progress: 40
  },
  {
    id: 'SRV-2024-002',
    title: 'Market Analysis for Medical Device',
    requestingOTC: '3',
    requestingOTCName: 'Ain Shams Innovation Hub',
    providingOTC: '5',
    providingOTCName: 'Mansoura University Innovation Office',
    serviceType: 'evaluation',
    status: 'completed',
    requestDate: '2024-10-01',
    startDate: '2024-10-08',
    completionDate: '2024-11-30',
    budget: 30000,
    description: 'Comprehensive market analysis for wearable health monitoring device',
    progress: 100,
    feedback: 'Excellent analysis, very thorough market research'
  }
];

export const reports = [
  {
    id: 'REP-2024-H2-001',
    otc: '1',
    otcName: 'Cairo University TTO',
    type: '6-month',
    period: 'H2-2024',
    submissionDate: '2024-07-10',
    status: 'reviewed',
    kpiPerformance: 'exceeds',
    fundingRecommendation: 'full-release',
    narrativeHighlights: 'Strong performance across all metrics, launched 2 spin-offs',
    challenges: 'Need additional lab space for growing portfolio'
  },
  {
    id: 'REP-2024-H1-002',
    otc: '4',
    otcName: 'Assiut University TTC',
    type: '6-month',
    period: 'H1-2024',
    submissionDate: '2024-01-15',
    status: 'reviewed',
    kpiPerformance: 'needs-improvement',
    fundingRecommendation: 'partial-release',
    narrativeHighlights: 'Building foundational capabilities, staff training completed',
    challenges: 'Low disclosure rate, limited industry engagement',
    improvementPlan: 'Focused outreach to faculty, partnering with Cairo TTO for mentoring'
  }
];

export const trainingPrograms = [
  {
    id: 'TRN-2024-001',
    title: 'New OTC Onboarding Program',
    type: 'onboarding',
    duration: '5 days',
    startDate: '2025-01-20',
    endDate: '2025-01-24',
    location: 'NCTC Central, Cairo',
    capacity: 20,
    enrolled: 8,
    status: 'open',
    topics: ['Platform Training', 'IP Management', 'Licensing Basics', 'Spin-off Support', 'Reporting Requirements']
  },
  {
    id: 'TRN-2024-002',
    title: 'Advanced Licensing Negotiation Workshop',
    type: 'specialized',
    duration: '2 days',
    startDate: '2025-02-10',
    endDate: '2025-02-11',
    location: 'Alexandria University',
    capacity: 25,
    enrolled: 22,
    status: 'open',
    topics: ['Term Sheet Drafting', 'Valuation Methods', 'Deal Structuring', 'Common Pitfalls']
  }
];

export const kpiTargets = {
  disclosures: { target: 15, weight: 20 },
  evaluationTime: { target: 30, weight: 15 },
  patents: { target: 5, weight: 20 },
  licenses: { target: 2, weight: 20 },
  revenue: { target: 200000, weight: 15 },
  collaborations: { target: 3, weight: 10 }
};

export const ecosystemStats = {
  totalOTCs: 58,
  activeOTCs: 58,
  clusterCoordinators: 6,
  totalDisclosures: 342,
  activeProjects: 127,
  completedProjects: 89,
  totalRevenue: 24500000,
  patents: 156,
  licenses: 67,
  spinoffs: 18,
  interOTCServices: 234
};

export const notifications = [
  {
    id: 'NOT-001',
    type: 'alert',
    title: 'OTC Application Deadline Approaching',
    message: 'Application deadline for new OTCs is December 31, 2024',
    date: '2024-12-15',
    read: false,
    priority: 'high'
  },
  {
    id: 'NOT-002',
    type: 'info',
    title: 'New Training Program Available',
    message: 'Advanced Licensing Workshop registration now open',
    date: '2024-12-14',
    read: false,
    priority: 'medium'
  },
  {
    id: 'NOT-003',
    type: 'success',
    title: 'Disclosure Evaluation Complete',
    message: 'DISC-2024-002 evaluation completed - GO decision',
    date: '2024-12-13',
    read: true,
    priority: 'medium'
  }
];

// ==================== MATRIX POSITIONS DATA ====================
// 6 Clusters × 6 Pillars = 36 positions
export const matrixPositions = {
  eng: {
    academic: { otcs: ['1', '3'], coverage: 'good', gap: false },
    lab: { otcs: ['1'], coverage: 'moderate', gap: false },
    pilot: { otcs: [], coverage: 'none', gap: true },
    industry: { otcs: ['1'], coverage: 'moderate', gap: false },
    grant: { otcs: ['3'], coverage: 'moderate', gap: false },
    commercial: { otcs: ['1'], coverage: 'good', gap: false }
  },
  ict: {
    academic: { otcs: ['1', '3'], coverage: 'good', gap: false },
    lab: { otcs: ['3'], coverage: 'moderate', gap: false },
    pilot: { otcs: ['3'], coverage: 'moderate', gap: false },
    industry: { otcs: [], coverage: 'none', gap: true },
    grant: { otcs: ['3'], coverage: 'moderate', gap: false },
    commercial: { otcs: ['1'], coverage: 'moderate', gap: false }
  },
  life: {
    academic: { otcs: ['2', '4', '5'], coverage: 'good', gap: false },
    lab: { otcs: ['2', '4', '5'], coverage: 'good', gap: false },
    pilot: { otcs: [], coverage: 'none', gap: true },
    industry: { otcs: ['2', '4'], coverage: 'moderate', gap: false },
    grant: { otcs: [], coverage: 'none', gap: true },
    commercial: { otcs: ['5'], coverage: 'moderate', gap: false }
  },
  phys: {
    academic: { otcs: ['3'], coverage: 'weak', gap: true },
    lab: { otcs: [], coverage: 'none', gap: true },
    pilot: { otcs: [], coverage: 'none', gap: true },
    industry: { otcs: [], coverage: 'none', gap: true },
    grant: { otcs: [], coverage: 'none', gap: true },
    commercial: { otcs: [], coverage: 'none', gap: true }
  },
  health: {
    academic: { otcs: ['2', '5'], coverage: 'good', gap: false },
    lab: { otcs: ['2', '5'], coverage: 'good', gap: false },
    pilot: { otcs: [], coverage: 'none', gap: true },
    industry: { otcs: ['2'], coverage: 'moderate', gap: false },
    grant: { otcs: [], coverage: 'none', gap: true },
    commercial: { otcs: ['5'], coverage: 'good', gap: false }
  },
  env: {
    academic: { otcs: ['4'], coverage: 'weak', gap: true },
    lab: { otcs: ['4'], coverage: 'weak', gap: true },
    pilot: { otcs: [], coverage: 'none', gap: true },
    industry: { otcs: ['4'], coverage: 'weak', gap: true },
    grant: { otcs: [], coverage: 'none', gap: true },
    commercial: { otcs: [], coverage: 'none', gap: true }
  }
};

// Matrix expansion requests from OTCs
export const expansionRequests = [
  {
    id: 'EXP-2024-001',
    otc: '4',
    otcName: 'Assiut University TTC',
    requestedCluster: 'env',
    requestedPillar: 'commercial',
    currentStatus: 'pending-review',
    submissionDate: '2024-11-15',
    justification: 'Developed commercialization capacity through NCTC training, ready to lead projects',
    capabilityEvidence: ['Completed advanced licensing training', 'Hired experienced TTO manager'],
    quarterlyReview: 'Q1-2025'
  },
  {
    id: 'EXP-2024-002',
    otc: '3',
    otcName: 'Ain Shams Innovation Hub',
    requestedCluster: 'ict',
    requestedPillar: 'industry',
    currentStatus: 'approved',
    submissionDate: '2024-10-01',
    approvalDate: '2024-11-10',
    justification: 'Strong industry partnerships established, multiple sponsored research agreements',
    capabilityEvidence: ['5 active industry partnerships', '3 sponsored research contracts'],
    quarterlyReview: 'Q4-2024'
  }
];

// ==================== FUNDING CYCLES DATA ====================
export const fundingCycles = [
  {
    id: 'FUND-2023-001',
    otc: '1',
    otcName: 'Cairo University TTO',
    cycleStart: '2023-01-15',
    cycleEnd: '2025-01-14',
    totalAllocation: 3000000,
    installments: [
      {
        number: 1,
        amount: 750000,
        dueDate: '2023-01-15',
        releaseDate: '2023-01-15',
        status: 'released',
        condition: 'Upon contract execution'
      },
      {
        number: 2,
        amount: 750000,
        dueDate: '2023-07-15',
        releaseDate: '2023-07-18',
        status: 'released',
        condition: '6-month KPI review',
        kpiResult: 'exceeds',
        kpiScore: 92
      },
      {
        number: 3,
        amount: 750000,
        dueDate: '2024-01-15',
        releaseDate: '2024-01-20',
        status: 'released',
        condition: '12-month KPI review',
        kpiResult: 'exceeds',
        kpiScore: 89
      },
      {
        number: 4,
        amount: 750000,
        dueDate: '2024-07-15',
        releaseDate: '2024-07-22',
        status: 'released',
        condition: '18-month KPI review',
        kpiResult: 'meets',
        kpiScore: 85
      }
    ],
    expenditureReports: [
      { month: '2024-11', reported: 180000, budget: 200000, variance: -10 },
      { month: '2024-10', reported: 195000, budget: 200000, variance: -2.5 },
      { month: '2024-09', reported: 210000, budget: 200000, variance: 5 }
    ],
    performanceRating: 'exceeds',
    nextCycleEligibility: 'approved'
  },
  {
    id: 'FUND-2023-002',
    otc: '4',
    otcName: 'Assiut University TTC',
    cycleStart: '2023-04-20',
    cycleEnd: '2025-04-19',
    totalAllocation: 2000000,
    installments: [
      {
        number: 1,
        amount: 500000,
        dueDate: '2023-04-20',
        releaseDate: '2023-04-20',
        status: 'released',
        condition: 'Upon contract execution'
      },
      {
        number: 2,
        amount: 500000,
        dueDate: '2023-10-20',
        releaseDate: '2023-11-05',
        status: 'released',
        condition: '6-month KPI review',
        kpiResult: 'partially-meets',
        kpiScore: 68
      },
      {
        number: 3,
        amount: 500000,
        dueDate: '2024-04-20',
        releaseDate: null,
        status: 'withheld',
        condition: '12-month KPI review',
        kpiResult: 'fails',
        kpiScore: 52,
        interventionPlan: 'Intensive support program, reassess after 90 days'
      },
      {
        number: 4,
        amount: 500000,
        dueDate: '2024-10-20',
        releaseDate: null,
        status: 'pending',
        condition: '18-month KPI review'
      }
    ],
    expenditureReports: [
      { month: '2024-11', reported: 45000, budget: 100000, variance: -55 },
      { month: '2024-10', reported: 38000, budget: 100000, variance: -62 }
    ],
    performanceRating: 'needs-improvement',
    improvementPlanActive: true,
    nextCycleEligibility: 'under-review'
  }
];

// ==================== DETAILED APPLICATIONS DATA ====================
// Enhanced applications with full assessment workflow
export const detailedApplications = [
  {
    id: 'APP-2024-001',
    institution: 'Helwan University',
    institutionType: 'Public University',
    city: 'Cairo',
    governorate: 'Cairo',
    applicant: 'Dr. Nadia El-Sherbiny',
    title: 'Director of Research',
    email: 'tto@helwan.edu.eg',
    phone: '+20 2 25556789',
    submissionDate: '2024-11-01',
    applicationDeadline: '2024-10-31',
    status: 'under-review',
    stage: 'institutional-visit-scheduled',
    requestedClusters: ['eng', 'ict'],
    requestedPillars: ['academic', 'lab'],
    capabilityAssessment: {
      eng: {
        academic: 8, lab: 7, pilot: 5, industry: 6, grant: 7, commercial: 5
      },
      ict: {
        academic: 8, lab: 6, pilot: 4, industry: 5, grant: 6, commercial: 4
      }
    },
    overallScore: 7.2,
    visitScheduled: '2024-12-20',
    visitTeam: ['Ahmed Hassan', 'Dr. Fatma El-Sayed'],
    documents: [
      { name: 'Application Form', type: 'pdf', uploadDate: '2024-11-01', status: 'verified' },
      { name: 'Capability Evidence', type: 'pdf', uploadDate: '2024-11-01', status: 'verified' },
      { name: 'Institutional Commitment Letter', type: 'pdf', uploadDate: '2024-11-01', status: 'verified' },
      { name: 'Faculty Research Portfolio', type: 'pdf', uploadDate: '2024-11-02', status: 'verified' }
    ],
    timeline: [
      { date: '2024-11-01', event: 'Application submitted', actor: 'Applicant' },
      { date: '2024-11-05', event: 'Initial screening passed', actor: 'NCTC Network Mgmt' },
      { date: '2024-11-15', event: 'Shortlisted for institutional visit', actor: 'NCTC Network Mgmt' },
      { date: '2024-11-20', event: 'Visit scheduled for Dec 20', actor: 'NCTC Network Mgmt' }
    ],
    decision: null,
    decisionDate: null
  },
  {
    id: 'APP-2024-002',
    institution: 'Zagazig University',
    institutionType: 'Public University',
    city: 'Zagazig',
    governorate: 'Sharqia',
    applicant: 'Prof. Walid Gomaa',
    title: 'Vice President for Research',
    email: 'innovation@zu.edu.eg',
    phone: '+20 55 2345678',
    submissionDate: '2024-10-15',
    applicationDeadline: '2024-10-31',
    status: 'accepted',
    stage: 'onboarding',
    requestedClusters: ['life', 'env'],
    requestedPillars: ['academic', 'lab', 'industry'],
    capabilityAssessment: {
      life: {
        academic: 9, lab: 8, pilot: 6, industry: 8, grant: 7, commercial: 6
      },
      env: {
        academic: 8, lab: 7, pilot: 5, industry: 7, grant: 8, commercial: 5
      }
    },
    overallScore: 8.5,
    visitScheduled: '2024-11-10',
    visitCompleted: '2024-11-10',
    visitTeam: ['Ahmed Hassan', 'Prof. Mohamed Rashad'],
    visitReport: {
      summary: 'Excellent research facilities with strong faculty engagement. Dedicated lab space available for TTO operations. Leadership demonstrates strong commitment to technology commercialization.',
      strengths: [
        'Modern lab facilities in Life Sciences',
        'Strong industry partnerships in agriculture sector',
        'Experienced research administration team',
        'Institutional commitment with dedicated budget'
      ],
      concerns: [
        'Limited commercialization experience',
        'Need capacity building in IP management'
      ],
      recommendation: 'Accept with standard onboarding training'
    },
    documents: [
      { name: 'Application Form', type: 'pdf', uploadDate: '2024-10-15', status: 'verified' },
      { name: 'Capability Evidence', type: 'pdf', uploadDate: '2024-10-15', status: 'verified' },
      { name: 'Institutional Commitment Letter', type: 'pdf', uploadDate: '2024-10-15', status: 'verified' },
      { name: 'Budget Plan', type: 'pdf', uploadDate: '2024-10-16', status: 'verified' },
      { name: 'Visit Report', type: 'pdf', uploadDate: '2024-11-12', status: 'final' }
    ],
    timeline: [
      { date: '2024-10-15', event: 'Application submitted', actor: 'Applicant' },
      { date: '2024-10-18', event: 'Initial screening passed', actor: 'NCTC Network Mgmt' },
      { date: '2024-10-25', event: 'Shortlisted for institutional visit', actor: 'NCTC Network Mgmt' },
      { date: '2024-11-05', event: 'Visit scheduled for Nov 10', actor: 'NCTC Network Mgmt' },
      { date: '2024-11-10', event: 'Institutional visit completed', actor: 'NCTC Visit Team' },
      { date: '2024-11-15', event: 'Visit report submitted', actor: 'NCTC Visit Team' },
      { date: '2024-11-25', event: 'Application accepted', actor: 'NCTC Director' },
      { date: '2024-11-26', event: 'Acceptance notification sent', actor: 'NCTC Network Mgmt' }
    ],
    decision: 'accepted',
    decisionDate: '2024-11-25',
    acceptanceNotificationDate: '2024-11-26',
    assignedPositions: {
      life: ['academic', 'lab', 'industry'],
      env: ['academic', 'lab']
    },
    onboardingDate: '2025-01-15',
    onboardingStatus: 'scheduled',
    contractStatus: 'draft'
  },
  {
    id: 'APP-2024-003',
    institution: 'Suez Canal University',
    institutionType: 'Public University',
    city: 'Ismailia',
    governorate: 'Ismailia',
    applicant: 'Dr. Hassan Mahmoud',
    title: 'Dean of Graduate Studies',
    email: 'research@suez.edu.eg',
    phone: '+20 64 3201234',
    submissionDate: '2024-09-20',
    applicationDeadline: '2024-10-31',
    status: 'rejected',
    stage: 'decision-complete',
    requestedClusters: ['eng', 'phys'],
    requestedPillars: ['academic', 'lab', 'commercial'],
    capabilityAssessment: {
      eng: {
        academic: 7, lab: 6, pilot: 3, industry: 4, grant: 5, commercial: 3
      },
      phys: {
        academic: 6, lab: 5, pilot: 2, industry: 3, grant: 4, commercial: 2
      }
    },
    overallScore: 5.8,
    visitScheduled: null,
    decision: 'rejected',
    decisionDate: '2024-10-10',
    rejectionReason: 'Capability assessment scores below minimum threshold for requested positions. Limited commercialization infrastructure and experience.',
    feedback: {
      summary: 'While the institution demonstrates strong academic capabilities, the current infrastructure and experience level do not meet the minimum requirements for OTC designation in the requested areas.',
      developmentRecommendations: [
        'Establish dedicated technology transfer office with professional staff',
        'Develop IP policy and procedures',
        'Build industry partnerships through sponsored research',
        'Consider starting with industry liaison function before full OTC application',
        'Participate in NCTC training programs to build capacity',
        'Reapply in 12-18 months after capacity development'
      ],
      supportOffered: [
        'Access to NCTC training workshops',
        'Mentoring from established OTCs',
        'Guidance on developing TTO capabilities'
      ]
    },
    timeline: [
      { date: '2024-09-20', event: 'Application submitted', actor: 'Applicant' },
      { date: '2024-09-23', event: 'Initial screening completed', actor: 'NCTC Network Mgmt' },
      { date: '2024-10-05', event: 'Capability assessment completed', actor: 'NCTC Network Mgmt' },
      { date: '2024-10-10', event: 'Application rejected', actor: 'NCTC Director' },
      { date: '2024-10-11', event: 'Rejection notification with feedback sent', actor: 'NCTC Network Mgmt' }
    ],
    documents: [
      { name: 'Application Form', type: 'pdf', uploadDate: '2024-09-20', status: 'reviewed' },
      { name: 'Capability Evidence', type: 'pdf', uploadDate: '2024-09-20', status: 'reviewed' },
      { name: 'Assessment Report', type: 'pdf', uploadDate: '2024-10-08', status: 'final' },
      { name: 'Rejection Letter with Feedback', type: 'pdf', uploadDate: '2024-10-11', status: 'sent' }
    ]
  }
];

// ==================== DETAILED DISCLOSURE EVALUATIONS ====================
export const detailedDisclosures = [
  {
    ...disclosures[0], // AI Water Quality System
    evaluationDetails: {
      technical: {
        score: 8.5,
        evaluator: 'Dr. Khaled Amin - Environmental Engineering',
        date: '2024-11-25',
        readinessLevel: 'TRL 4 - Lab Validation',
        strengths: [
          'Novel AI algorithm with proven accuracy',
          'Cost-effective IoT sensor design',
          'Real-time monitoring capability',
          'Scalable architecture'
        ],
        weaknesses: [
          'Requires further field testing',
          'Power consumption optimization needed',
          'Calibration procedures need standardization'
        ],
        developmentNeeds: 'Field pilot testing for 6 months',
        recommendation: 'Proceed with market evaluation'
      },
      market: {
        score: null,
        evaluator: null,
        status: 'pending',
        dueDate: '2024-12-15'
      },
      ip: {
        score: null,
        evaluator: null,
        status: 'pending',
        dueDate: '2024-12-18'
      }
    },
    expertConsultation: [
      {
        expert: 'Dr. Samira Hassan - Water Resources',
        affiliation: 'Ministry of Water Resources',
        consultDate: '2024-11-22',
        opinion: 'High priority for Egyptian market, addresses critical national need'
      }
    ],
    meetings: [
      {
        date: '2024-11-20',
        participants: ['Dr. Khaled Abdel-Rahman', 'OTC Team'],
        purpose: 'Initial disclosure review',
        outcome: 'Proceed with full evaluation'
      }
    ]
  },
  {
    ...disclosures[1], // Cancer Nanoparticles
    evaluationDetails: {
      technical: {
        score: 9.2,
        evaluator: 'Prof. Ahmed Fahmy - Pharmaceutical Sciences',
        date: '2024-10-20',
        readinessLevel: 'TRL 5 - Pre-clinical Testing',
        strengths: [
          'Breakthrough delivery mechanism',
          'Biodegradable and biocompatible',
          'Targeted delivery reduces side effects',
          'Strong pre-clinical results'
        ],
        weaknesses: [
          'Manufacturing scale-up challenges',
          'Regulatory pathway complex',
          'Clinical trials required'
        ],
        developmentNeeds: 'Phase I clinical trial preparation',
        recommendation: 'High commercial potential - proceed'
      },
      market: {
        score: 8.8,
        evaluator: 'Dr. Laila Mostafa - Healthcare Market Analysis',
        date: '2024-10-28',
        marketSize: 'Global oncology drug delivery market: $8.5B, growing 12% annually',
        targetSegment: 'Targeted cancer therapeutics',
        competition: 'Several competing approaches, but novel mechanism provides differentiation',
        barriers: 'High regulatory burden, long development timeline, significant capital required',
        opportunity: 'Partnership with pharmaceutical company for development and commercialization',
        recommendation: 'Excellent market opportunity - seek licensing partner'
      },
      ip: {
        score: 8.5,
        evaluator: 'Patent Attorney - Mohamed Saber & Associates',
        date: '2024-11-05',
        patentability: 'Strong - novel composition and method of use',
        priorArt: 'Comprehensive search completed, clear differentiation',
        scope: 'Broad claims possible covering composition, formulation, and therapeutic use',
        strategy: 'File PCT application for international protection',
        costs: 'Estimated EGP 400,000 for initial filing and prosecution',
        recommendation: 'High IP protection potential - file immediately'
      }
    },
    expertConsultation: [
      {
        expert: 'Prof. Hassan Ali - Oncology',
        affiliation: 'National Cancer Institute',
        consultDate: '2024-10-25',
        opinion: 'Clinically significant advancement, strong interest from medical community'
      }
    ],
    meetings: [
      {
        date: '2024-10-12',
        participants: ['Prof. Sara Mostafa', 'OTC Team'],
        purpose: 'Initial disclosure review',
        outcome: 'Proceed with full evaluation'
      },
      {
        date: '2024-11-10',
        participants: ['Prof. Sara Mostafa', 'OTC Director', 'Patent Attorney'],
        purpose: 'Evaluation results review',
        outcome: 'GO decision - pursue licensing pathway'
      }
    ],
    commercializationStrategy: {
      pathway: 'licensing',
      rationale: 'Technology requires significant development investment and regulatory expertise best provided by pharmaceutical partner',
      targetLicensees: 'Regional and international pharmaceutical companies with oncology focus',
      dealStructure: 'Exclusive license with development milestones, upfront fee, royalties on sales',
      timeline: '6-9 months to identify and negotiate with licensee'
    }
  },
  {
    ...disclosures[2], // Smart Agriculture Platform
    evaluationDetails: {
      technical: { score: null, status: 'pending' },
      market: { score: null, status: 'pending' },
      ip: { score: null, status: 'pending' }
    },
    meetings: [
      {
        date: '2024-12-18',
        participants: ['Eng. Omar Hassan', 'OTC Team'],
        purpose: 'Initial disclosure meeting (scheduled)',
        outcome: null
      }
    ]
  }
];

// ==================== DETAILED PROJECTS ====================
export const detailedProjects = [
  {
    ...projects[0], // Smart Grid Licensing
    focalPointOTC: '1',
    projectType: 'licensing',
    technologyDescription: 'AI-powered energy management system for smart grid optimization, reducing energy waste and improving distribution efficiency',
    inventors: [
      { name: 'Prof. Ahmed Sabry', email: 'a.sabry@cu.edu.eg', share: 60 },
      { name: 'Dr. Youssef Ibrahim', email: 'y.ibrahim@cu.edu.eg', share: 40 }
    ],
    ipStatus: {
      type: 'patent',
      filingDate: '2023-03-15',
      applicationNumber: 'EG2023001234',
      status: 'pending',
      attorney: 'Saber & Associates',
      costs: 180000
    },
    licensingDetails: {
      pathway: 'exclusive',
      potentialLicensee: 'EgyptTech Solutions',
      licenseeProfile: {
        name: 'EgyptTech Solutions',
        type: 'Private Company',
        established: 2015,
        employees: 450,
        focus: 'Energy management and smart grid solutions',
        financialHealth: 'Strong',
        technicalCapability: 'High',
        marketAccess: 'Regional (MENA)'
      },
      dueDiligence: {
        status: 'in-progress',
        startDate: '2024-11-01',
        financialCheck: 'completed',
        technicalCheck: 'completed',
        legalCheck: 'in-progress',
        concerns: 'None significant'
      },
      proposedTerms: {
        exclusivity: 'Exclusive',
        territory: 'Egypt and MENA region',
        field: 'Smart grid and energy management',
        upfrontFee: 500000,
        royaltyRate: 5.0,
        minimumRoyalty: 200000,
        milestones: [
          { description: 'Prototype completion', payment: 300000, dueDate: '2025-06-30' },
          { description: 'First commercial deployment', payment: 500000, dueDate: '2025-12-31' },
          { description: 'Reach 10 installations', payment: 700000, dueDate: '2026-06-30' }
        ],
        term: '10 years',
        reportingFrequency: 'Quarterly'
      },
      negotiations: [
        { date: '2024-09-15', topic: 'Initial term sheet discussion', outcome: 'Agreement on exclusivity and territory' },
        { date: '2024-10-20', topic: 'Financial terms', outcome: 'Agreed on upfront fee and royalty rate' },
        { date: '2024-11-10', topic: 'Milestone structure', outcome: 'Finalized milestone payments and dates' },
        { date: '2024-12-10', topic: 'Due diligence review', outcome: 'On track for final agreement' }
      ],
      nextSteps: [
        'Complete legal due diligence',
        'Finalize license agreement language',
        'Obtain institutional approval',
        'Execute agreement'
      ],
      estimatedClosing: '2025-01-31'
    },
    timeline: [
      { date: '2023-06-10', event: 'Project initiated', milestone: 'Disclosure approved' },
      { date: '2023-09-01', event: 'Patent filed', milestone: 'IP protection initiated' },
      { date: '2024-06-15', event: 'Marketing campaign started', milestone: 'Licensee search' },
      { date: '2024-08-20', event: 'EgyptTech identified as lead candidate', milestone: 'Licensee identification' },
      { date: '2024-09-15', event: 'Negotiations commenced', milestone: 'Deal structuring' },
      { date: '2024-12-10', event: 'Due diligence near completion', milestone: 'Deal finalization' }
    ],
    budget: {
      allocated: 500000,
      spent: 380000,
      breakdown: [
        { category: 'IP Protection', amount: 180000 },
        { category: 'Marketing Materials', amount: 45000 },
        { category: 'Legal Services', amount: 85000 },
        { category: 'Technical Documentation', amount: 70000 }
      ]
    },
    revenue: {
      expected: 2500000,
      structure: 'Upfront + Milestones + Royalties'
    }
  },
  {
    ...projects[1], // BioPharma Spinoff
    focalPointOTC: '2',
    projectType: 'spinoff',
    technologyDescription: 'Biodegradable nanoparticle platform for targeted cancer drug delivery',
    inventors: [
      { name: 'Prof. Sara Mostafa', email: 's.mostafa@alexu.edu.eg', share: 70, roleInSpinoff: 'CSO' },
      { name: 'Dr. Tarek Amin', email: 't.amin@alexu.edu.eg', share: 30, roleInSpinoff: 'CTO' }
    ],
    ipStatus: {
      type: 'patent',
      filingDate: '2023-12-10',
      applicationNumber: 'PCT/EG2023/000456',
      status: 'pending',
      attorney: 'International Patent Partners',
      costs: 450000
    },
    spinoffDetails: {
      companyName: 'NanoMed Egypt',
      founded: '2024-03-15',
      status: 'incorporation-in-progress',
      foundingTeam: [
        { name: 'Prof. Sara Mostafa', role: 'Chief Scientific Officer', fullTime: false },
        { name: 'Dr. Tarek Amin', role: 'Chief Technology Officer', fullTime: false },
        { name: 'Ahmed Kamal', role: 'CEO', fullTime: true, background: 'Pharmaceutical industry executive, 15 years experience' }
      ],
      businessPlan: {
        status: 'completed',
        completionDate: '2024-07-20',
        marketOpportunity: 'Regional oncology drug delivery market growing at 15% annually',
        revenueModel: 'Licensing platform technology to pharmaceutical companies',
        fiveYearProjection: 45000000,
        fundingNeeded: 12000000,
        useOfFunds: 'Pre-clinical studies (40%), Clinical trials (35%), Operations (15%), IP (10%)'
      },
      fundraising: {
        stage: 'Seed',
        targetAmount: 12000000,
        raisedAmount: 5000000,
        investors: [
          { name: 'Egypt Ventures', type: 'VC Fund', amount: 3000000, leadInvestor: true },
          { name: 'Healthcare Innovation Fund', type: 'Sector Fund', amount: 2000000, leadInvestor: false }
        ],
        currentRound: {
          status: 'in-progress',
          seeking: 7000000,
          potentialInvestors: ['MENA Tech Fund', 'BioVentures Capital'],
          expectedClose: '2025-03-30'
        }
      },
      universityEquity: {
        percentage: 15,
        shares: 150000,
        totalShares: 1000000,
        vestingSchedule: 'Standard 4-year vest',
        boardSeat: true,
        boardRepresentative: 'OTC Director'
      },
      technologyLicense: {
        type: 'Exclusive',
        field: 'Cancer therapeutics',
        territory: 'Worldwide',
        upfrontFee: 0,
        royaltyRate: 3.5,
        minimumRoyalty: 100000,
        sublicensingRights: true,
        sublicensingRoyalty: 25,
        milestones: [
          { event: 'IND filing', payment: 500000 },
          { event: 'Phase I completion', payment: 1000000 },
          { event: 'Phase II completion', payment: 2000000 },
          { event: 'First regulatory approval', payment: 5000000 }
        ]
      },
      conflictOfInterest: {
        facultyStatus: 'Part-time consulting allowed per university policy',
        disclosuresFiled: true,
        approvals: ['Department Head', 'Dean', 'Provost', 'Ethics Committee'],
        managementPlan: 'Founders limited to 20% time commitment, independent management hired'
      },
      incorporationStatus: {
        legalStructure: 'Limited Liability Company',
        jurisdiction: 'Egypt',
        registrationStatus: 'in-progress',
        expectedCompletion: '2025-01-30',
        legalCounsel: 'Startup Law Partners'
      }
    },
    timeline: [
      { date: '2024-03-15', event: 'Spin-off decision made', milestone: 'Pathway selection' },
      { date: '2024-04-01', event: 'Founding team assembled', milestone: 'Team formation' },
      { date: '2024-07-20', event: 'Business plan completed', milestone: 'Planning' },
      { date: '2024-09-15', event: 'Lead investor committed', milestone: 'Seed funding' },
      { date: '2024-11-01', event: 'License terms negotiated', milestone: 'License agreement' },
      { date: '2024-12-10', event: 'Equity terms finalized', milestone: 'Equity agreement' }
    ],
    postFormationSupport: [
      'Monthly mentoring sessions with OTC',
      'Access to university lab facilities',
      'Introductions to industry partners',
      'Grant application support'
    ]
  },
  {
    ...projects[2], // Mobile Learning License
    focalPointOTC: '3',
    projectType: 'licensing',
    technologyDescription: 'Mobile learning platform with offline capability and adaptive learning algorithms',
    inventors: [
      { name: 'Dr. Mona Khalil', email: 'm.khalil@asu.edu.eg', share: 100 }
    ],
    ipStatus: {
      type: 'copyright',
      registrationDate: '2023-05-20',
      registrationNumber: 'CR-2023-SW-8901',
      status: 'registered'
    },
    licensingDetails: {
      pathway: 'non-exclusive',
      licensee: 'EduTech Egypt',
      licenseeProfile: {
        name: 'EduTech Egypt',
        type: 'EdTech Startup',
        established: 2020,
        employees: 35,
        focus: 'Digital education solutions',
        marketAccess: 'Egyptian K-12 market'
      },
      executedTerms: {
        exclusivity: 'Non-exclusive',
        territory: 'Egypt',
        field: 'K-12 Education',
        upfrontFee: 150000,
        royaltyRate: 7.0,
        minimumRoyalty: 100000,
        term: '5 years',
        executed: '2023-09-01'
      },
      performance: {
        licenseSigned: '2023-09-01',
        productLaunch: '2024-01-15',
        usersAcquired: 45000,
        revenue: [
          { period: '2024-Q1', sales: 850000, royalty: 59500 },
          { period: '2024-Q2', sales: 1200000, royalty: 84000 },
          { period: '2024-Q3', sales: 1450000, royalty: 101500 },
          { period: '2024-Q4', sales: 1800000, royalty: 126000 }
        ],
        totalRoyalties: 371000,
        complianceStatus: 'excellent',
        nextReview: '2025-03-31'
      }
    },
    multiOTCCollaboration: null
  }
];

// Training Programs - Enhanced
export const detailedTrainingPrograms = [
  {
    id: 'TRN-2024-001',
    title: 'New OTC Onboarding Program',
    type: 'onboarding',
    category: 'mandatory',
    duration: '5 days',
    startDate: '2025-01-20',
    endDate: '2025-01-24',
    location: 'NCTC Central, Cairo',
    capacity: 20,
    enrolled: 8,
    completed: 0,
    status: 'open-registration',
    timeline: 'Within 60 days of OTC acceptance',
    deliveryMode: 'in-person',
    materials: ['Platform User Guide', 'IP Management Handbook', 'Licensing Templates', 'Case Studies'],
    topics: [
      { name: 'Platform Training', hours: 8 },
      { name: 'IP Management Fundamentals', hours: 8 },
      { name: 'Licensing Basics', hours: 6 },
      { name: 'Spin-off Support', hours: 6 },
      { name: 'Reporting Requirements', hours: 4 },
      { name: 'Conflict of Interest', hours: 4 },
      { name: 'Quality Standards', hours: 4 }
    ],
    preTest: { required: true, passScore: 60 },
    postTest: { required: true, passScore: 70 },
    certificate: true,
    instructors: ['Dr. Fatma El-Sayed', 'Dr. Khaled Mahmoud'],
    registrations: [
      { otc: '8', otcName: 'Helwan University TTO', registeredDate: '2024-12-10', status: 'confirmed' }
    ]
  },
  {
    id: 'TRN-2024-002',
    title: 'Advanced Licensing Negotiation Workshop',
    type: 'specialized',
    category: 'ongoing',
    duration: '2 days',
    startDate: '2025-02-10',
    endDate: '2025-02-11',
    location: 'Alexandria University',
    capacity: 25,
    enrolled: 22,
    completed: 0,
    status: 'open-registration',
    deliveryMode: 'in-person',
    frequency: 'Quarterly',
    materials: ['Term Sheet Templates', 'Valuation Worksheets', 'Case Studies Collection'],
    topics: [
      { name: 'Term Sheet Drafting', hours: 4 },
      { name: 'Valuation Methods', hours: 4 },
      { name: 'Deal Structuring', hours: 3 },
      { name: 'Negotiation Tactics', hours: 3 },
      { name: 'Common Pitfalls', hours: 2 }
    ],
    preTest: { required: false },
    postTest: { required: true, passScore: 75 },
    certificate: true,
    instructors: ['Mr. Youssef Kamal (Industry Expert)', 'Dr. Noha Ibrahim'],
    registrations: []
  },
  {
    id: 'TRN-2024-003',
    title: 'Technology Valuation & Market Assessment',
    type: 'specialized',
    category: 'ongoing',
    duration: '2 days',
    startDate: '2025-03-15',
    endDate: '2025-03-16',
    location: 'Online (Zoom)',
    capacity: 30,
    enrolled: 18,
    completed: 0,
    status: 'open-registration',
    deliveryMode: 'online',
    frequency: 'Quarterly',
    materials: ['Valuation Models', 'Market Research Tools', 'Assessment Frameworks'],
    topics: [
      { name: 'Technology Readiness Levels', hours: 3 },
      { name: 'Market Opportunity Analysis', hours: 4 },
      { name: 'Financial Modeling', hours: 4 },
      { name: 'Risk Assessment', hours: 3 },
      { name: 'Competitive Analysis', hours: 2 }
    ],
    preTest: { required: true, passScore: 60 },
    postTest: { required: true, passScore: 75 },
    certificate: true,
    instructors: ['Dr. Ahmed Sami', 'Ms. Laila Hassan (Industry)'],
    registrations: []
  },
  {
    id: 'TRN-2024-004',
    title: 'Annual Refresher Training',
    type: 'refresher',
    category: 'mandatory',
    duration: '1 day',
    startDate: '2025-04-20',
    endDate: '2025-04-20',
    location: 'NCTC Central, Cairo',
    capacity: 50,
    enrolled: 32,
    completed: 0,
    status: 'open-registration',
    timeline: 'Annually for all OTCs',
    deliveryMode: 'hybrid',
    materials: ['Updated Guidelines', 'Policy Changes', 'Best Practices 2024'],
    topics: [
      { name: 'Policy Updates 2025', hours: 2 },
      { name: 'Platform New Features', hours: 2 },
      { name: 'Success Stories & Case Studies', hours: 2 },
      { name: 'Q&A Session', hours: 2 }
    ],
    preTest: { required: false },
    postTest: { required: true, passScore: 70 },
    certificate: true,
    instructors: ['NCTC Leadership Team'],
    registrations: []
  }
];

// Gap Register
export const gapRegister = [
  {
    id: 'GAP-2024-001',
    cluster: 'phys',
    pillar: 'pilot',
    clusterName: 'Physical Sciences & Materials',
    pillarName: 'Pilot Facilities Access',
    identifiedDate: '2024-10-15',
    source: 'Monthly Matrix Analysis',
    priority: 'high',
    description: 'No OTC currently assigned to Physical Sciences + Pilot Facilities position. This creates a gap in piloting new materials and advanced manufacturing processes.',
    impact: 'Researchers in materials science unable to access pilot facilities for technology validation before commercialization.',
    currentOTCs: [],
    potentialOTCs: ['6', '4'],
    potentialOTCNames: ['Ain Shams University TTO', 'Assiut University TTO'],
    supportActions: [
      {
        action: 'Training',
        description: 'Provide specialized training on pilot facility management to potential OTCs',
        assignedTo: 'Training Team',
        deadline: '2025-01-30',
        status: 'in-progress',
        progress: 60
      },
      {
        action: 'Resource Allocation',
        description: 'Budget allocation for pilot equipment acquisition',
        assignedTo: 'Funding Team',
        deadline: '2025-02-15',
        status: 'planned',
        progress: 0
      }
    ],
    status: 'active',
    targetClosureDate: '2025-03-31',
    clusterCoordinator: 'Dr. Khaled Mahmoud'
  },
  {
    id: 'GAP-2024-002',
    cluster: 'phys',
    pillar: 'commercial',
    clusterName: 'Physical Sciences & Materials',
    pillarName: 'Commercialization Leading',
    identifiedDate: '2024-11-20',
    source: 'Quarterly CC Report',
    priority: 'high',
    description: 'Physical Sciences cluster lacks OTCs with strong commercialization track record. Current OTCs focused primarily on research.',
    impact: 'Limited ability to convert physical sciences innovations into market-ready products and licensing deals.',
    currentOTCs: [],
    potentialOTCs: ['1', '6'],
    potentialOTCNames: ['Cairo University TTO', 'Ain Shams University TTO'],
    supportActions: [
      {
        action: 'Mentoring',
        description: 'Pair with successful commercialization OTCs from Engineering cluster',
        assignedTo: 'CC - Engineering',
        deadline: '2025-01-15',
        status: 'in-progress',
        progress: 40
      },
      {
        action: 'External Expertise',
        description: 'Engage industry consultant for commercialization pathway development',
        assignedTo: 'NCTC Director',
        deadline: '2025-02-28',
        status: 'planned',
        progress: 0
      }
    ],
    status: 'active',
    targetClosureDate: '2025-04-30',
    clusterCoordinator: 'Dr. Khaled Mahmoud'
  },
  {
    id: 'GAP-2024-003',
    cluster: 'env',
    pillar: 'industry',
    clusterName: 'Environmental Sciences',
    pillarName: 'Industry Engaged',
    identifiedDate: '2024-12-01',
    source: 'Monthly Matrix Analysis',
    priority: 'medium',
    description: 'Single OTC coverage for Environmental Sciences + Industry Engaged creates risk if OTC underperforms.',
    impact: 'Insufficient industry connections for environmental technology commercialization.',
    currentOTCs: ['7'],
    potentialOTCs: ['3', '5'],
    potentialOTCNames: ['Mansoura University TTO', 'Alexandria University TTO'],
    supportActions: [
      {
        action: 'Capability Building',
        description: 'Support current OTC and train additional OTCs on industry engagement',
        assignedTo: 'Training Team',
        deadline: '2025-03-15',
        status: 'planned',
        progress: 0
      }
    ],
    status: 'active',
    targetClosureDate: '2025-05-31',
    clusterCoordinator: 'Dr. Heba Mostafa'
  },
  {
    id: 'GAP-2024-004',
    cluster: 'ict',
    pillar: 'grant',
    clusterName: 'ICT & Digital Technologies',
    pillarName: 'Grant Oriented',
    identifiedDate: '2024-09-10',
    source: 'Performance Review',
    priority: 'low',
    description: 'OTC assigned but consistently underperforming in grant acquisition support.',
    impact: 'ICT researchers missing grant opportunities, affecting funding pipeline.',
    currentOTCs: ['2'],
    potentialOTCs: [],
    potentialOTCNames: [],
    supportActions: [
      {
        action: 'Training',
        description: 'Intensive grant writing and management training',
        assignedTo: 'Training Team',
        deadline: '2025-01-20',
        status: 'completed',
        progress: 100,
        completedDate: '2025-01-18'
      },
      {
        action: 'Resources',
        description: 'Provide grant databases and matching tools',
        assignedTo: 'IT Team',
        deadline: '2024-12-31',
        status: 'completed',
        progress: 100,
        completedDate: '2024-12-20'
      },
      {
        action: 'Mentoring',
        description: 'Pair with successful grant-oriented OTC for knowledge transfer',
        assignedTo: 'CC - ICT',
        deadline: '2025-02-28',
        status: 'in-progress',
        progress: 70
      }
    ],
    status: 'improving',
    targetClosureDate: '2025-03-31',
    clusterCoordinator: 'Dr. Mariam Fathy'
  }
];

// Inter-OTC Services
export const serviceDirectory = [
  {
    id: 'SRV-001',
    otcId: '1',
    otcName: 'Cairo University TTO',
    category: 'IP Management',
    serviceName: 'Patent Prior Art Search',
    description: 'Comprehensive patent database search and analysis to assess novelty and patentability. Includes FTO (Freedom to Operate) analysis.',
    deliveryTime: '10 business days',
    pricing: { type: 'fixed', amount: 15000, currency: 'EGP', unit: 'per search' },
    capacity: 'Up to 5 searches per month',
    qualifications: 'Certified patent search specialists, access to international patent databases',
    available: true,
    requestCount: 8
  },
  {
    id: 'SRV-002',
    otcId: '1',
    otcName: 'Cairo University TTO',
    category: 'Legal Support',
    serviceName: 'License Agreement Drafting',
    description: 'Professional drafting of technology license agreements, including exclusive, non-exclusive, and sub-licensing terms.',
    deliveryTime: '15 business days',
    pricing: { type: 'fixed', amount: 25000, currency: 'EGP', unit: 'per agreement' },
    capacity: 'Up to 3 agreements per month',
    qualifications: 'Legal team with IP specialization, experience with 50+ license agreements',
    available: true,
    requestCount: 12
  },
  {
    id: 'SRV-003',
    otcId: '2',
    otcName: 'Alexandria University TTO',
    category: 'Market Research',
    serviceName: 'Technology Market Assessment',
    description: 'Detailed market opportunity analysis including market size, competition, entry barriers, and commercialization pathways.',
    deliveryTime: '20 business days',
    pricing: { type: 'hourly', amount: 800, currency: 'EGP', unit: 'per hour', estimatedHours: '20-30 hours' },
    capacity: 'Up to 4 assessments per month',
    qualifications: 'Market research team with industry connections, access to market databases',
    available: true,
    requestCount: 6
  },
  {
    id: 'SRV-004',
    otcId: '3',
    otcName: 'Mansoura University TTO',
    category: 'Financial Analysis',
    serviceName: 'Technology Valuation',
    description: 'Professional technology valuation using multiple methods (cost, market, income approaches) for licensing or spin-off purposes.',
    deliveryTime: '15 business days',
    pricing: { type: 'fixed', amount: 20000, currency: 'EGP', unit: 'per valuation' },
    capacity: 'Up to 3 valuations per month',
    qualifications: 'Certified valuation specialists, experience with 30+ technology valuations',
    available: true,
    requestCount: 5
  },
  {
    id: 'SRV-005',
    otcId: '4',
    otcName: 'Assiut University TTO',
    category: 'Business Planning',
    serviceName: 'Spin-off Business Plan Development',
    description: 'Comprehensive business plan development for university spin-off companies including financial projections and pitch deck.',
    deliveryTime: '30 business days',
    pricing: { type: 'fixed', amount: 35000, currency: 'EGP', unit: 'per business plan' },
    capacity: 'Up to 2 plans per month',
    qualifications: 'MBA-qualified team, experience with 10+ successful spin-offs',
    available: true,
    requestCount: 4
  },
  {
    id: 'SRV-006',
    otcId: '5',
    otcName: 'Tanta University TTO',
    category: 'Training & Capacity',
    serviceName: 'Researcher IP Awareness Workshop',
    description: 'On-site workshop for researchers on IP basics, disclosure process, and commercialization opportunities. 4-hour session.',
    deliveryTime: '2 weeks notice required',
    pricing: { type: 'fixed', amount: 8000, currency: 'EGP', unit: 'per workshop' },
    capacity: 'Up to 6 workshops per month',
    qualifications: 'Experienced trainers, delivered 50+ workshops',
    available: true,
    requestCount: 15
  }
];

export const serviceRequests = [
  {
    id: 'SREQ-2024-001',
    requestingOTC: '7',
    requestingOTCName: 'Suez Canal University TTO',
    providingOTC: '1',
    providingOTCName: 'Cairo University TTO',
    serviceId: 'SRV-001',
    serviceName: 'Patent Prior Art Search',
    description: 'Need prior art search for desalination membrane technology disclosure DISC-2024-015',
    requestDate: '2024-12-10',
    requiredBy: '2024-12-25',
    status: 'completed',
    timeline: [
      { date: '2024-12-10', event: 'Request submitted', actor: 'Suez Canal TTO' },
      { date: '2024-12-11', event: 'Initial response provided', actor: 'Cairo TTO' },
      { date: '2024-12-12', event: 'Quote accepted', actor: 'Suez Canal TTO' },
      { date: '2024-12-12', event: 'Work commenced', actor: 'Cairo TTO' },
      { date: '2024-12-20', event: 'Search completed', actor: 'Cairo TTO' },
      { date: '2024-12-21', event: 'Report delivered', actor: 'Cairo TTO' },
      { date: '2024-12-22', event: 'Invoice sent', actor: 'Cairo TTO' }
    ],
    quotedAmount: 15000,
    actualAmount: 15000,
    currency: 'EGP',
    paymentStatus: 'paid',
    paymentDate: '2024-12-30',
    deliverables: ['Prior Art Search Report', 'Patent Landscape Analysis', 'FTO Assessment'],
    rating: 5,
    feedback: 'Excellent service, comprehensive report helped us make GO decision'
  },
  {
    id: 'SREQ-2024-002',
    requestingOTC: '8',
    requestingOTCName: 'Helwan University TTO',
    providingOTC: '3',
    providingOTCName: 'Mansoura University TTO',
    serviceId: 'SRV-004',
    serviceName: 'Technology Valuation',
    description: 'Valuation needed for smart irrigation system technology for licensing negotiations',
    requestDate: '2024-12-15',
    requiredBy: '2025-01-10',
    status: 'in-progress',
    timeline: [
      { date: '2024-12-15', event: 'Request submitted', actor: 'Helwan TTO' },
      { date: '2024-12-16', event: 'Initial response (3-day SLA met)', actor: 'Mansoura TTO' },
      { date: '2024-12-17', event: 'Quote provided', actor: 'Mansoura TTO' },
      { date: '2024-12-18', event: 'Quote accepted', actor: 'Helwan TTO' },
      { date: '2024-12-19', event: 'Valuation work commenced', actor: 'Mansoura TTO' }
    ],
    quotedAmount: 20000,
    actualAmount: null,
    currency: 'EGP',
    paymentStatus: 'pending',
    paymentDate: null,
    deliverables: ['Valuation Report', 'Comparable Analysis', 'Licensing Terms Recommendations'],
    rating: null,
    feedback: null
  },
  {
    id: 'SREQ-2024-003',
    requestingOTC: '6',
    requestingOTCName: 'Ain Shams University TTO',
    providingOTC: '2',
    providingOTCName: 'Alexandria University TTO',
    serviceId: 'SRV-003',
    serviceName: 'Technology Market Assessment',
    description: 'Market assessment for AI-based diagnostic tool in Egyptian healthcare market',
    requestDate: '2024-12-05',
    requiredBy: '2025-01-05',
    status: 'quoted',
    timeline: [
      { date: '2024-12-05', event: 'Request submitted', actor: 'Ain Shams TTO' },
      { date: '2024-12-06', event: 'Initial response', actor: 'Alexandria TTO' },
      { date: '2024-12-10', event: 'Detailed quote provided', actor: 'Alexandria TTO' }
    ],
    quotedAmount: 22000,
    actualAmount: null,
    currency: 'EGP',
    paymentStatus: 'pending',
    paymentDate: null,
    deliverables: ['Market Assessment Report', 'Competitor Analysis', 'Go-to-Market Strategy'],
    rating: null,
    feedback: null
  }
];

// Cluster Coordinator Data (CC-FLOW-001 through 005)
export const clusterCoordinators = [
  {
    id: 'CC-2024-001',
    clusterId: '1',
    clusterName: 'Physical Sciences and Engineering Cluster',
    coordinatorOTC: '1',
    coordinatorOTCName: 'Cairo University TTO',
    coordinatorName: 'Dr. Ahmed Hassan',
    appointmentDate: '2024-01-15',
    term: '2 years',
    termEnd: '2026-01-14',
    status: 'active',
    selectionCriteria: {
      performanceScore: 92,
      experienceYears: 5,
      capacity: 'high',
      leadershipSkills: 'excellent',
      communicationSkills: 'excellent'
    },
    clusterOTCs: [
      { otcId: '1', otcName: 'Cairo University TTO', status: 'active' },
      { otcId: '4', otcName: 'Assiut University TTO', status: 'active' },
      { otcId: '7', otcName: 'Suez Canal University TTO', status: 'active' }
    ],
    responsibilities: [
      'Monthly coordination meetings with cluster OTCs',
      'Weekly performance monitoring and dashboard updates',
      'Quarterly gap identification reports',
      'Budget adjustment recommendations',
      'Conflict resolution and escalation management'
    ],
    monthlyMeetings: [
      {
        month: '2024-12',
        date: '2024-12-05',
        attendees: ['Cairo TTO', 'Assiut TTO', 'Suez Canal TTO'],
        agenda: ['Performance review', 'Gap analysis', 'Budget discussion', 'Upcoming training'],
        outcomes: ['Identified 2 new gaps', 'Approved budget adjustment for Assiut', 'Scheduled Q1 2025 training'],
        nextMeeting: '2025-01-08'
      },
      {
        month: '2024-11',
        date: '2024-11-07',
        attendees: ['Cairo TTO', 'Assiut TTO', 'Suez Canal TTO'],
        agenda: ['Disclosure pipeline review', 'Service requests', 'Training updates'],
        outcomes: ['Pipeline healthy', '3 inter-OTC service requests initiated', 'Training completion at 85%'],
        nextMeeting: '2024-12-05'
      }
    ],
    quarterlyReports: [
      {
        quarter: 'Q4 2024',
        submissionDate: '2024-10-15',
        status: 'submitted',
        gapsIdentified: 2,
        supportActionsRecommended: 4,
        budgetAdjustments: 1,
        clusterPerformance: 'high',
        highlights: [
          'All OTCs meeting performance targets',
          'Strong inter-OTC collaboration with 8 active service requests',
          'Training completion rate improved to 90%'
        ],
        challenges: [
          'Physical Sciences + Pilot Facilities gap persists',
          'Need additional external expertise for advanced commercialization'
        ],
        recommendations: [
          'Allocate budget for external consultants',
          'Schedule specialized training on pilot facility access',
          'Expand collaboration with industry partners'
        ]
      }
    ],
    performanceMetrics: {
      coordinationScore: 95,
      otcSatisfaction: 4.8,
      meetingFrequency: 'monthly',
      reportTimeliness: 'on-time',
      issueResolutionTime: '3 days average'
    }
  },
  {
    id: 'CC-2024-002',
    clusterId: '2',
    clusterName: 'Health and Life Sciences Cluster',
    coordinatorOTC: '2',
    coordinatorOTCName: 'Alexandria University TTO',
    coordinatorName: 'Dr. Fatma Ibrahim',
    appointmentDate: '2024-01-15',
    term: '2 years',
    termEnd: '2026-01-14',
    status: 'active',
    selectionCriteria: {
      performanceScore: 88,
      experienceYears: 4,
      capacity: 'high',
      leadershipSkills: 'very good',
      communicationSkills: 'excellent'
    },
    clusterOTCs: [
      { otcId: '2', otcName: 'Alexandria University TTO', status: 'active' },
      { otcId: '6', otcName: 'Ain Shams University TTO', status: 'active' },
      { otcId: '8', otcName: 'Helwan University TTO', status: 'active' }
    ],
    responsibilities: [
      'Monthly coordination meetings with cluster OTCs',
      'Weekly performance monitoring and dashboard updates',
      'Quarterly gap identification reports',
      'Budget adjustment recommendations',
      'Conflict resolution and escalation management'
    ],
    monthlyMeetings: [
      {
        month: '2024-12',
        date: '2024-12-10',
        attendees: ['Alexandria TTO', 'Ain Shams TTO', 'Helwan TTO'],
        agenda: ['Clinical trial disclosures', 'Pharma partnerships', 'Regulatory compliance'],
        outcomes: ['2 pharma MOUs in progress', 'Regulatory training scheduled', 'Gap in medical devices identified'],
        nextMeeting: '2025-01-12'
      }
    ],
    quarterlyReports: [
      {
        quarter: 'Q4 2024',
        submissionDate: '2024-10-16',
        status: 'submitted',
        gapsIdentified: 1,
        supportActionsRecommended: 2,
        budgetAdjustments: 0,
        clusterPerformance: 'medium',
        highlights: [
          'Strong growth in clinical trial disclosures',
          'Successful pharma partnership model established'
        ],
        challenges: [
          'Medical device commercialization expertise gap',
          'Regulatory approval timelines extended'
        ],
        recommendations: [
          'Engage external medical device consultants',
          'Establish regulatory affairs support service'
        ]
      }
    ],
    performanceMetrics: {
      coordinationScore: 90,
      otcSatisfaction: 4.6,
      meetingFrequency: 'monthly',
      reportTimeliness: 'on-time',
      issueResolutionTime: '4 days average'
    }
  }
];

// Multi-OTC Collaboration Agreements (COLLAB-FLOW-001, 002)
export const collaborationAgreements = [
  {
    id: 'COLLAB-2024-001',
    title: 'Smart Cities IoT Platform Development',
    description: 'Multi-university collaboration to develop integrated IoT platform for smart city applications combining sensor networks, data analytics, and urban management systems.',
    leadOTC: '1',
    leadOTCName: 'Cairo University TTO',
    leadCoordinator: 'Dr. Mohamed Abdel Rahman',
    participatingOTCs: [
      { otcId: '1', otcName: 'Cairo University TTO', role: 'Lead - System Integration & Project Management', contribution: 'AI algorithms, data analytics, overall coordination' },
      { otcId: '6', otcName: 'Ain Shams University TTO', role: 'Partner - Sensor Networks', contribution: 'Environmental sensor technology, network protocols' },
      { otcId: '7', otcName: 'Suez Canal University TTO', role: 'Partner - Energy Management', contribution: 'Energy-efficient computing, power optimization systems' }
    ],
    researchersInvolved: [
      { name: 'Prof. Khaled Ahmed', otc: 'Cairo University', expertise: 'AI & Machine Learning' },
      { name: 'Dr. Nadia Hassan', otc: 'Ain Shams University', expertise: 'Sensor Networks' },
      { name: 'Dr. Youssef Ibrahim', otc: 'Suez Canal University', expertise: 'Energy Systems' }
    ],
    startDate: '2024-06-01',
    expectedDuration: '24 months',
    endDate: '2026-05-31',
    status: 'active',
    moaStatus: 'signed',
    moaDate: '2024-05-15',
    ipOwnership: 'Joint ownership - proportional to contribution (Cairo 50%, Ain Shams 30%, Suez Canal 20%)',
    revenueSharing: 'Proportional to IP ownership after deducting commercialization costs',
    decisionMaking: 'Consensus required for major decisions, lead OTC has tie-breaking vote',
    fundingModel: 'Shared - each OTC contributes from own budget',
    budget: {
      total: 1500000,
      currency: 'EGP',
      breakdown: [
        { otc: 'Cairo University', amount: 750000, percentage: 50 },
        { otc: 'Ain Shams University', amount: 450000, percentage: 30 },
        { otc: 'Suez Canal University', amount: 300000, percentage: 20 }
      ]
    },
    milestones: [
      { milestone: 'Requirements & Design Phase', deadline: '2024-08-31', status: 'completed', completionDate: '2024-08-28' },
      { milestone: 'Sensor Network Prototype', deadline: '2024-11-30', status: 'completed', completionDate: '2024-11-25' },
      { milestone: 'AI Analytics Module', deadline: '2025-02-28', status: 'in-progress', completionDate: null },
      { milestone: 'Energy Management Integration', deadline: '2025-05-31', status: 'not-started', completionDate: null },
      { milestone: 'System Integration & Testing', deadline: '2025-10-31', status: 'not-started', completionDate: null },
      { milestone: 'Pilot Deployment', deadline: '2026-03-31', status: 'not-started', completionDate: null }
    ],
    meetings: [
      {
        date: '2024-12-15',
        type: 'Monthly Coordination',
        attendees: ['Cairo TTO', 'Ain Shams TTO', 'Suez Canal TTO'],
        agenda: ['Milestone 3 progress', 'Budget review', 'IP filing strategy'],
        outcomes: ['AI module 70% complete', 'Budget on track', 'Patent application planned for Q1 2025'],
        nextMeeting: '2025-01-15'
      },
      {
        date: '2024-11-20',
        type: 'Monthly Coordination',
        attendees: ['Cairo TTO', 'Ain Shams TTO', 'Suez Canal TTO'],
        agenda: ['Milestone 2 completion', 'Integration planning', 'Commercialization strategy'],
        outcomes: ['Sensor network prototype successful', 'Integration plan approved', 'Industry partners identified'],
        nextMeeting: '2024-12-15'
      }
    ],
    conflicts: [],
    commercializationPlan: {
      strategy: 'Licensing to smart city solution providers',
      targetMarket: 'Egyptian new cities, MENA region smart city projects',
      potentialLicensees: ['Orascom Construction', 'Hassan Allam Properties', 'Tatweer Misr'],
      expectedRevenue: '500,000-1,000,000 EGP annually from licensing',
      timeline: 'Market entry Q2 2026'
    }
  },
  {
    id: 'COLLAB-2024-002',
    title: 'Agricultural Biotechnology - Drought-Resistant Crop Development',
    description: 'Joint research program to develop drought-resistant wheat and rice varieties suitable for Egyptian climate using genetic engineering and traditional breeding techniques.',
    leadOTC: '3',
    leadOTCName: 'Mansoura University TTO',
    leadCoordinator: 'Prof. Samir Mostafa',
    participatingOTCs: [
      { otcId: '3', otcName: 'Mansoura University TTO', role: 'Lead - Genetic Engineering & Coordination', contribution: 'Gene editing technology, field trials, project coordination' },
      { otcId: '5', otcName: 'Tanta University TTO', role: 'Partner - Plant Physiology', contribution: 'Physiological stress testing, biochemical analysis' },
      { otcId: '4', otcName: 'Assiut University TTO', role: 'Partner - Field Testing', contribution: 'Upper Egypt field trials, farmer engagement' }
    ],
    researchersInvolved: [
      { name: 'Prof. Samir Mostafa', otc: 'Mansoura University', expertise: 'Plant Genetics' },
      { name: 'Dr. Hala Amin', otc: 'Tanta University', expertise: 'Plant Physiology' },
      { name: 'Dr. Mahmoud Ali', otc: 'Assiut University', expertise: 'Agronomy' }
    ],
    startDate: '2024-03-01',
    expectedDuration: '36 months',
    endDate: '2027-02-28',
    status: 'active',
    moaStatus: 'signed',
    moaDate: '2024-02-10',
    ipOwnership: 'Joint ownership - equal shares (33.33% each)',
    revenueSharing: 'Equal distribution after deducting commercialization and regulatory costs',
    decisionMaking: 'Majority vote (2 out of 3), lead OTC coordinates voting process',
    fundingModel: 'Mixed - NCTC grant (60%) + OTC contributions (40%)',
    budget: {
      total: 2000000,
      currency: 'EGP',
      breakdown: [
        { source: 'NCTC Grant', amount: 1200000, percentage: 60 },
        { source: 'Mansoura University', amount: 280000, percentage: 14 },
        { source: 'Tanta University', amount: 260000, percentage: 13 },
        { source: 'Assiut University', amount: 260000, percentage: 13 }
      ]
    },
    milestones: [
      { milestone: 'Gene Identification & Editing', deadline: '2024-08-31', status: 'completed', completionDate: '2024-08-20' },
      { milestone: 'Greenhouse Trials', deadline: '2024-12-31', status: 'completed', completionDate: '2024-12-15' },
      { milestone: 'Small-Scale Field Trials', deadline: '2025-06-30', status: 'in-progress', completionDate: null },
      { milestone: 'Large-Scale Field Trials', deadline: '2026-06-30', status: 'not-started', completionDate: null },
      { milestone: 'Regulatory Approval', deadline: '2026-12-31', status: 'not-started', completionDate: null },
      { milestone: 'Commercial Release', deadline: '2027-02-28', status: 'not-started', completionDate: null }
    ],
    meetings: [
      {
        date: '2024-12-10',
        type: 'Monthly Coordination',
        attendees: ['Mansoura TTO', 'Tanta TTO', 'Assiut TTO'],
        agenda: ['Greenhouse trial results', 'Field trial planning', 'IP protection strategy'],
        outcomes: ['Promising drought tolerance in 3 varieties', 'Field trial sites selected', 'Patent application in progress'],
        nextMeeting: '2025-01-10'
      }
    ],
    conflicts: [
      {
        conflictId: 'CONF-001',
        date: '2024-09-15',
        issue: 'Disagreement on IP ownership percentages',
        parties: ['Tanta TTO', 'Assiut TTO'],
        description: 'Tanta and Assiut requested higher IP share based on unique contributions',
        status: 'resolved',
        resolution: 'NCTC mediation resulted in maintaining equal shares with recognition of unique contributions in publications',
        resolutionDate: '2024-10-05',
        mediator: 'NCTC Director'
      }
    ],
    commercializationPlan: {
      strategy: 'Licensing to seed companies and direct farmer distribution',
      targetMarket: 'Egyptian farmers, MENA region agriculture',
      potentialLicensees: ['Cairo Seeds Company', 'Delta Agri Corp', 'Upper Egypt Seeds'],
      expectedRevenue: '2-5 million EGP annually from seed licensing + royalties',
      timeline: 'Commercial release 2027'
    }
  },
  {
    id: 'COLLAB-2024-003',
    title: 'Medical Device - Portable Dialysis System',
    description: 'Development of affordable portable dialysis system for home use in underserved areas, combining medical device engineering with telemedicine monitoring.',
    leadOTC: '2',
    leadOTCName: 'Alexandria University TTO',
    leadCoordinator: 'Dr. Mona Khalil',
    participatingOTCs: [
      { otcId: '2', otcName: 'Alexandria University TTO', role: 'Lead - Device Engineering & Coordination', contribution: 'Medical device design, clinical validation, regulatory' },
      { otcId: '8', otcName: 'Helwan University TTO', role: 'Partner - Electronics & Controls', contribution: 'Electronic control systems, safety mechanisms' }
    ],
    researchersInvolved: [
      { name: 'Dr. Mona Khalil', otc: 'Alexandria University', expertise: 'Biomedical Engineering' },
      { name: 'Dr. Tarek Zaki', otc: 'Helwan University', expertise: 'Electronics Engineering' }
    ],
    startDate: '2024-09-01',
    expectedDuration: '30 months',
    endDate: '2027-02-28',
    status: 'active',
    moaStatus: 'signed',
    moaDate: '2024-08-15',
    ipOwnership: 'Joint ownership - Alexandria 70%, Helwan 30%',
    revenueSharing: 'Proportional to IP ownership',
    decisionMaking: 'Lead OTC has final decision authority for clinical and regulatory matters',
    fundingModel: 'External grant (Ministry of Health) + OTC contributions',
    budget: {
      total: 3000000,
      currency: 'EGP',
      breakdown: [
        { source: 'Ministry of Health Grant', amount: 2000000, percentage: 67 },
        { source: 'Alexandria University', amount: 700000, percentage: 23 },
        { source: 'Helwan University', amount: 300000, percentage: 10 }
      ]
    },
    milestones: [
      { milestone: 'Concept Design & Prototyping', deadline: '2024-12-31', status: 'in-progress', completionDate: null },
      { milestone: 'Lab Testing & Safety Validation', deadline: '2025-06-30', status: 'not-started', completionDate: null },
      { milestone: 'Clinical Trials Phase I', deadline: '2026-03-31', status: 'not-started', completionDate: null },
      { milestone: 'Regulatory Approval (EDA)', deadline: '2026-12-31', status: 'not-started', completionDate: null },
      { milestone: 'Manufacturing Setup', deadline: '2027-02-28', status: 'not-started', completionDate: null }
    ],
    meetings: [
      {
        date: '2024-12-05',
        type: 'Bi-weekly Technical',
        attendees: ['Alexandria TTO', 'Helwan TTO'],
        agenda: ['Prototype progress', 'Safety testing plan', 'Clinical partner engagement'],
        outcomes: ['Prototype 60% complete', 'Safety protocols defined', 'Alexandria Teaching Hospital interested'],
        nextMeeting: '2024-12-20'
      }
    ],
    conflicts: [],
    commercializationPlan: {
      strategy: 'Spin-off company + licensing to medical device manufacturers',
      targetMarket: 'Egyptian healthcare system, low-cost export markets',
      potentialLicensees: ['Elaraby Medical Equipment', 'Egyptian Medical Devices Co'],
      expectedRevenue: '10-20 million EGP over 5 years',
      timeline: 'Market entry 2027'
    }
  }
];

// Continue with more data structures...
