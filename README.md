# NCTC Platform Mock-up

A comprehensive front-end mock-up for the National Center for Technology Commercialization (NCTC) platform. This application provides a complete interface for managing Egypt's innovation ecosystem across OTCs (Office of Technology Commercialization), clusters, and technology transfer activities.

## 🎯 Features

### Landing Page
- Hero section introducing the NCTC platform
- Platform statistics and key metrics
- Feature highlights (OTC Network, 6×6 Matrix, Cluster Coordination, etc.)
- Portal selection for NCTC and OTC users

### Authentication
- Login page with prefilled demo credentials
- Registration page for new users
- Role-based access control (NCTC Staff, OTC Admin, Cluster Coordinator)

### NCTC Portal
Complete management interface for NCTC staff including:
- **Dashboard**: Overview of OTCs, projects, revenue, and performance metrics
- **OTC Management**: Applications, matrix assignments, and funding
- **Performance Monitoring**: Reviews, KPIs, and OTC-specific performance tracking
- **Training Management**: Training programs and capacity building
- **Cluster Management**: Six cluster coordination (Engineering, ICT, Life Sciences, Physical Sciences, Health Sciences, Environmental)
- **Gap Analysis**: Gap identification and resolution tracking
- **Platform Administration**: System configuration and user management
- **Quality & Compliance**: Quality standards and compliance monitoring
- **Reports**: Comprehensive reporting and analytics

### OTC Portal
Interface for OTC administrators including:
- **Dashboard**: OTC-specific metrics and activities
- **Disclosure Management**: Submit and track invention disclosures
- **IP Management**: Patent and IP portfolio management
- **Project Management**: Commercialization projects and licensing
- **Services**: Technology transfer services and requests
- **Reporting**: OTC performance reporting
- **Collaboration Hub**: Inter-OTC collaboration and knowledge sharing
- **Resources**: Documents, templates, and guidelines
- **Matrix Positions**: Cluster and pillar assignments

### Cluster Coordinator Portal
Interface for cluster coordinators including:
- **Dashboard**: Cluster-specific overview
- **Cluster Management**: Manage cluster activities and members
- **Reports**: Cluster performance and activity reports

## 🛠 Tech Stack

- **React**: 18.3.1 (latest stable)
- **React Router**: 6.28.0 (v6 for proven stability)
- **Vite**: 6.0.0 (fast build tool)
- **Tailwind CSS**: 3.4.15 (utility-first CSS)
- **Lucide React**: 0.460.0 (icons)
- **Recharts**: 2.13.3 (data visualization)
- **React Hook Form**: 7.54.2 (form management)

All versions are carefully selected for compatibility and stability.

## 🎨 Design System

### Color Palette
- **Primary Blue**: Dark blue (#1e3a8a) to light blue (#dbeafe) gradient
- **Grays**: Neutral tones for secondary elements
- **Gradients**: Elegant blue gradients throughout the interface

### Typography
- **Font**: Inter (Google Fonts)
- Responsive text sizing with proper hierarchy

### Components
- Buttons: Primary (blue gradient), Secondary (gray), Outline
- Cards: White with shadow and rounded corners
- Badges: Color-coded status indicators
- Forms: Clean inputs with labels and validation states

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Setup
1. Navigate to the project directory:
   ```bash
   cd nctc-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to:
   ```
   http://localhost:3000
   ```

## 🚀 Usage

### Demo Credentials
For quick testing, use these prefilled credentials on the login page:
- **Email**: ahmed.hassan@nctc.gov.eg
- **Password**: demo123
- **Portal**: NCTC Portal

### Navigation
1. Start at the landing page (/)
2. Click "Get Started" or "Login" button
3. Use demo credentials or explore the register page
4. Once logged in, navigate using the sidebar menu
5. All forms are prefilled for demonstration
6. All buttons route to appropriate next stages

## 📁 Project Structure

```
nctc-platform/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   └── Layout/      # Header, Sidebar, ProtectedRoute
│   ├── pages/           # Page components
│   │   ├── Auth/        # Login, Register
│   │   ├── NCTC/        # NCTC Portal pages
│   │   ├── OTC/         # OTC Portal pages
│   │   └── CC/          # Cluster Coordinator pages
│   ├── mockData.js      # Mock data with Egyptian context
│   ├── App.jsx          # Main router
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles & design system
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── package.json         # Dependencies

```

## 🗺 Available Routes

### Public Routes
- `/` - Landing page
- `/login` - Login page
- `/register` - Registration page

### NCTC Portal Routes
- `/nctc/dashboard` - Main dashboard
- `/nctc/otc-management/applications` - OTC applications list
- `/nctc/otc-management/applications/:id` - Application detail
- `/nctc/otc-management/matrix-assignments` - Matrix assignments
- `/nctc/otc-management/funding` - Funding management
- `/nctc/performance/dashboard` - Performance overview
- `/nctc/performance/reviews` - Performance reviews
- `/nctc/performance/otc/:id` - OTC-specific performance
- `/nctc/training` - Training management
- `/nctc/clusters` - Cluster management
- `/nctc/gaps` - Gap analysis
- `/nctc/platform-admin` - Platform administration
- `/nctc/quality` - Quality & compliance
- `/nctc/reports` - Reports

### OTC Portal Routes
- `/otc/dashboard` - OTC dashboard
- `/otc/disclosures` - Disclosures list
- `/otc/disclosures/:id` - Disclosure detail
- `/otc/disclosures/new` - New disclosure
- `/otc/disclosures/:id/evaluation` - Disclosure evaluation
- `/otc/ip-management` - IP management
- `/otc/projects` - Projects list
- `/otc/projects/:id` - Project detail
- `/otc/services` - Services list
- `/otc/services/request` - Service request
- `/otc/reporting` - Reporting
- `/otc/collaboration` - Collaboration hub
- `/otc/resources` - Resources
- `/otc/matrix` - Matrix positions

### Cluster Coordinator Routes
- `/cc/dashboard` - CC dashboard
- `/cc/cluster-management` - Cluster management
- `/cc/reports` - CC reports

## 🧪 Mock Data

The application uses comprehensive mock data with Egyptian institutional context:
- **OTCs**: Cairo University, Alexandria University, Ain Shams, Assiut, Mansoura
- **Clusters**: Engineering, ICT, Life Sciences, Physical Sciences, Health Sciences, Environmental
- **Pillars**: Academic, Lab, Pilot, Industry, Grant, Commercial
- **Projects**: Smart grid licensing, BioPharma spin-offs, mobile learning
- **Disclosures**: AI water monitoring, cancer drug delivery, smart agriculture

All data is defined in `src/mockData.js` and can be customized as needed.

## 🎯 Key Features

### Role-Based Access Control
- NCTC Staff: Full access to all NCTC portal features
- OTC Admin: Access to OTC-specific features
- Cluster Coordinator: Access to CC features + OTC features

### Prefilled Forms
All forms are prefilled with realistic data for demonstration purposes.

### Functional Routing
All buttons and links navigate to appropriate pages, creating a fully navigable mock-up.

### Data Visualization
Charts and graphs using Recharts for performance metrics and analytics.

### Responsive Design
Mobile-friendly interface that adapts to different screen sizes.

## 🔧 Development

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## 📝 Notes

- This is a **mock-up** for demonstration purposes
- No backend integration (all data is mocked)
- Forms don't submit to servers
- Authentication is simulated with local state
- All data resets on page refresh

## 📄 License

This project is developed for the NCTC initiative under ASRT (Academy of Scientific Research and Technology).

---

**Developed with ❤️ for Egypt's Innovation Ecosystem**
