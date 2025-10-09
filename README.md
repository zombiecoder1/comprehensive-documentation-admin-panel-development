# Unified Local Development & Agent System Admin Panel

A Next.js-based admin panel for centralized monitoring, configuration, and management of local server and model development environments. This system minimizes terminal reliance and simplifies local model development challenges through server-to-local configuration synchronization and agent orchestration.

## 🎯 Project Overview

The UAS Admin Panel transforms fragmented command-line intensive processes into a unified, visual, and centralized workflow. It addresses complexities in local configuration management, agent system orchestration, and performance monitoring.

### Key Benefits

- **Centralized Management**: Single interface for all local development operations
- **Reduced Terminal Dependency**: Visual interfaces replace command-line operations
- **Real-time Monitoring**: Live server and model performance tracking
- **Seamless Integration**: Direct VS Code editor integration for workflow optimization
- **Agent Orchestration**: Unified system for managing multiple AI agents

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm package manager
- VS Code (for editor integration features)
- Local UAS backend server (see backend setup below)

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/zombiecoder1/comprehensive-documentation-admin-panel-development
cd uas-admin-panel

# Install dependencies
npm install
# or
pnpm install

# Copy environment template
cp .env.example .env.local

# Configure your environment variables (see CONFIGURATION.md)
# Edit .env.local with your settings
nano .env.local
\`\`\`

### Configuration

Minimum required environment variables in `.env.local`:

\`\`\`bash
# Required for M1
NEXT_PUBLIC_APP_URL=http://localhost:3000
UAS_API_URL=http://localhost:5000
UAS_API_KEY=changeme
\`\`\`

See [CONFIGURATION.md](./CONFIGURATION.md) for complete configuration options.

### Running the Application

\`\`\`bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run type checking
npm run type-check
\`\`\`

Visit `http://localhost:3000` to access the admin panel.

### Backend Setup

The admin panel requires a UAS backend server. Ensure your backend implements these endpoints:

- `GET /health` - Server health status
- `GET /status` - System status with models and agents info

See [API.md](./API.md) for complete API documentation.

## 📋 Core Features

### 1. Dynamic Server Configuration
- **ENV File Integration**: Automatically loads server configurations from `.env` files
- **Response-Based Activation**: Verifies server connectivity and activates relevant features
- **Real-time Updates**: Dynamic configuration without server restarts

### 2. Unified Agent System (UAS)
- **Memory Agent Management**: Monitor and configure stateful agent operations
- **Load Balancing**: Manage multiple local model instances
- **Monitoring Dashboard**: Real-time performance metrics
- **Testing Tools**: Comprehensive testing interfaces

### 3. Developer Productivity Tools
- **VS Code Integration**: Submit inputs directly to your local editor
- **Prompt Template Editor**: Visual prompt management interface
- **CLI Agent Server**: Graphical interface for terminal commands
- **Multi-Agent Workstation**: Orchestrate multiple agents visually

### 4. Communication & Utilities
- **Audio Chatting**: Integrated voice command testing
- **Mobile App Editor API**: Mobile development configuration management

## 🏗️ System Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    UAS Admin Panel (Next.js)                │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Dashboard   │  │ Agent System │  │ Dev Tools    │     │
│  │  Monitoring  │  │ Management   │  │ Integration  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
├─────────────────────────────────────────────────────────────┤
│              Unified Agent System (UAS) Backend             │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Memory Agent │  │ Load Balancer│  │ CLI Agent    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
├─────────────────────────────────────────────────────────────┤
│              Local Model Servers & VS Code API              │
└─────────────────────────────────────────────────────────────┘
\`\`\`

## 📚 Documentation

- **[CONFIGURATION.md](./CONFIGURATION.md)** - Complete configuration guide
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture and design patterns
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Development guidelines and best practices
- **[API.md](./API.md)** - API endpoints and integration documentation
- **[TESTING.md](./TESTING.md)** - Testing procedures and guidelines

## 🎨 Design Principles

- **English-Only Interface**: Professional, standardized language throughout
- **Minimalist Design**: Clean interface without unnecessary icons
- **User-Friendly UX**: Intuitive navigation with minimal cognitive load
- **Visual Attractiveness**: Modern, professional aesthetic

## 🔧 Technology Stack

- **Frontend**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: React Context + SWR
- **API Communication**: REST + WebSocket for real-time updates
- **Editor Integration**: VS Code Extension API

## 📦 Project Structure

\`\`\`
uas-admin-panel/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Dashboard home
│   ├── layout.tsx           # Root layout with navigation
│   ├── globals.css          # Global styles and theme
│   ├── api/                 # API routes
│   │   └── proxy/           # Backend proxy endpoints
│   ├── models/              # Model management pages
│   ├── agents/              # Agent management pages
│   ├── memory/              # Memory agent pages
│   ├── loadbalancer/        # Load balancer pages
│   ├── prompt-templates/    # Prompt template editor
│   ├── cli-agent/           # CLI agent interface
│   ├── audio-test/          # Audio testing page
│   ├── mobile-editor/       # Mobile editor API page
│   └── settings/            # Settings pages
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── sidebar.tsx          # Navigation sidebar
│   ├── topbar.tsx           # Top navigation bar
│   ├── server-health-card.tsx
│   ├── system-status-card.tsx
│   └── quick-actions-card.tsx
├── lib/                     # Utility functions
│   └── utils.ts             # Helper utilities
├── hooks/                   # Custom React hooks
├── types/                   # TypeScript type definitions
├── public/                  # Static assets
├── .env.example             # Environment variables template
└── README.md                # This file
\`\`\`

## 🤝 Contributing

Please read [DEVELOPMENT.md](./DEVELOPMENT.md) for development guidelines and best practices.

## 📄 License

[Your License Here]

## 🆘 Support

For issues, questions, or contributions, please open an issue in the repository.

## 🎯 Milestones

### M1: Core Infrastructure & Dashboard (Current)
- ✅ Next.js skeleton with TypeScript and Tailwind CSS
- ✅ Topbar and sidebar navigation
- ✅ Environment loader with .env support
- ✅ Health and status cards on dashboard
- ✅ API proxy endpoints for backend communication
- ✅ Dark theme matching Vercel design aesthetic

### M2: Models & Agents Pages (Next)
- Models page with list and metrics
- Agents page with list and command interface
- Real-time status updates

### M3: Memory, Chat Stream & Prompt Editor
- Memory page with conversation history
- Chat streaming with SSE support
- Prompt templates CRUD interface

### M4: Editor Integration, CLI Agent & Load Balancer
- VS Code editor integration
- CLI agent streaming UI
- Load balancer instance management

### M5: Audio Test, Mobile Editor & Polish
- Audio chat testing interface
- Mobile editor API configuration
- Final polish and comprehensive testing

---

**Built with ❤️ for streamlined local development workflows**
