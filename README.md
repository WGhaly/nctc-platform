# NCTC Platform 🇪🇬

> Egyptian National Center for Technology Commercialization Management System

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://nctcxotcportal-mio39owg1-waseemghaly-progressiosos-projects.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?style=flat&logo=github)](https://github.com/WGhaly/nctc-platform)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=flat&logo=vite)](https://vitejs.dev/)

## 📋 Overview

A comprehensive web application for managing Egypt's National Center for Technology Commercialization (NCTC) ecosystem. The platform coordinates activities across multiple Office of Technology Commercialization (OTC) units, manages technology transfer processes from disclosure to commercialization, and facilitates collaboration between universities and research institutions across Egypt.

## 🚀 Live Demo

**Production URL:** [https://nctcxotcportal-mio39owg1-waseemghaly-progressiosos-projects.vercel.app](https://nctcxotcportal-mio39owg1-waseemghaly-progressiosos-projects.vercel.app)

**GitHub Repository:** [https://github.com/WGhaly/nctc-platform](https://github.com/WGhaly/nctc-platform)

## ✨ Features

### 🏛️ NCTC Core Functions
- **OTC Application Management** - Complete 60-day review workflow with 6×6 assessment matrix
- **Matrix-Based Assignments** - 36-position matrix across 6 functions and 6 clusters
- **Funding Management** - 2-year funding cycles with 4 installments and KPI-based disbursement
- **Performance Monitoring** - Real-time dashboards with intervention workflows
- **Training Programs** - 5-day onboarding and ongoing certification tracking
- **Gap Management** - Systematic identification and closure tracking

### 🏢 OTC Operations
- **Technology Disclosure Management** - 45-day evaluation timeline with tri-section assessment
- **IP Portfolio Tracking** - Patent and trademark lifecycle management
- **Pathway Selection** - TRL-based technology evaluation (Licensing/Spin-Off/Sponsored Research)
- **Project Management** - Focal point coordination with budget tracking
- **Commercialization Workflows** - Licensing, spin-off, and sponsored research processes
- **Inter-OTC Services** - Service request and coordination system
- **Reporting System** - Monthly, 6-month, and 2-year comprehensive reports

### 🌍 Cluster Coordination
- **Cluster Management** - 6 geographic clusters (Delta, Alexandria, Canal, Upper Egypt, Sinai, Cairo)
- **Multi-OTC Coordination** - Cross-cluster collaboration and resource sharing
- **Performance Reporting** - Cluster-level analytics and gap tracking
- **Meeting Management** - Quarterly coordination meetings

### 🤝 Collaboration Hub
- **Multi-OTC Projects** - Collaborative project management
- **5-Level Conflict Resolution** - Focal Points → OTC Directors → Cluster Coordinator → NCTC Director → ASRT

### 📊 Platform Operations
- **User Management** - Role-based access control (NCTC/OTC/CC)
- **Data Quality** - Validation and integrity monitoring
- **Security & Compliance** - Audit trails and access controls
- **Quality Assurance** - Semi-annual audits, CAPA workflows, enforcement actions

## 🛠️ Tech Stack

- **Frontend Framework:** React 18.3.1
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Deployment:** Vercel
- **Version Control:** GitHub

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/WGhaly/nctc-platform.git

# Navigate to project directory
cd nctc-platform

# Install dependencies
npm install
```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
The application will run on `http://localhost:3000`

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🔐 Default Login Credentials

### NCTC Staff Portal
- **Username:** `nctc_admin`
- **Password:** `nctc123`
- **Access:** Full system administration, OTC management, performance monitoring

### OTC Staff Portal
- **Username:** `otc_cairo`
- **Password:** `otc123`
- **Access:** Disclosure management, IP tracking, project management, reporting

### Cluster Coordinator Portal
- **Username:** `cc_delta`
- **Password:** `cc123`
- **Access:** Cluster management, multi-OTC coordination, regional reporting

## 📁 Project Structure

```
nctc-platform/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout/          # Header, Sidebar, ProtectedRoute
│   │   ├── Modal.jsx
│   │   ├── ConfirmDialog.jsx
│   │   └── ReportGeneratorModal.jsx
│   ├── pages/
│   │   ├── NCTC/            # NCTC staff portal pages
│   │   ├── OTC/             # OTC staff portal pages
│   │   ├── CC/              # Cluster Coordinator pages
│   │   ├── Auth/            # Login and registration
│   │   └── Landing.jsx      # Home page
│   ├── utils/               # Helper functions
│   ├── mockData.js          # Comprehensive mock data
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── public/                  # Static assets
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎯 Key Workflows Implemented

### 1. OTC Application & Evaluation (NCTC-FLOW-001)
- 60-day timeline from submission to decision
- 6×6 assessment matrix (6 functions × 6 clusters)
- Institutional visits and SWOT analysis
- Final approval by NCTC Director

### 2. Technology Disclosure (OTC-FLOW-001)
- 45-day evaluation timeline
- Three-section evaluation (technical, IP, market)
- TRL assessment and pathway recommendation
- Decision matrix implementation

### 3. Multi-OTC Collaboration (COLLAB-FLOW-001)
- Lead OTC determination
- Resource contribution tracking
- 5-level conflict resolution escalation
- ASRT final appeal authority

### 4. Quality & Compliance (QUALITY-FLOW-001-003)
- Semi-annual OTC audits
- CAPA (Corrective and Preventive Action) workflow
- 4-level enforcement: Warning → Probation → Suspension → Removal
- 15-day appeal windows with ASRT final authority

## 📊 Data Management

The platform uses comprehensive mock data (`mockData.js`) covering:
- 25+ OTC applications with full history
- 50+ technology disclosures across multiple domains
- 100+ active projects in various commercialization stages
- Matrix positions, funding cycles, performance metrics
- Training programs, gap registers, audit schedules
- Collaboration projects and service directories

## 🌐 Deployment

The platform is automatically deployed to Vercel with continuous deployment from the GitHub repository.

### Manual Deployment
```bash
# Deploy to Vercel
vercel --prod
```

### GitHub Integration
- Automatic deployments on push to `master` branch
- Preview deployments for pull requests
- Environment variable management via Vercel dashboard

## 📄 Documentation

Comprehensive documentation available in the `/Requirements` folder:
- `NCTC_Master_SOP.md` - Complete system requirements
- `NCTC_Process_Flows_Mapping.md` - All 25 process flows
- `Comprehensive_Implementation_Audit_Report.md` - Implementation verification
- `Implementation_Coverage_Report.md` - Feature coverage analysis

## 🤝 Contributing

This is a government project for the Egyptian Academy of Scientific Research and Technology (ASRT). For inquiries, please contact the NCTC administration.

## 📝 License

Proprietary - Egyptian Academy of Scientific Research and Technology (ASRT)

## 👥 Team

Developed for the National Center for Technology Commercialization (NCTC), Egyptian Academy of Scientific Research and Technology (ASRT)

---

**Built with ❤️ for Egyptian Technology Transfer Ecosystem**
