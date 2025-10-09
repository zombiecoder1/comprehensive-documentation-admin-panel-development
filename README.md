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
- npm or yarn package manager
- VS Code (for editor integration features)
- Local model server running (optional, for full functionality)

### Installation

\`\`\`bash
# Clone the repository
git clone <repository-url>
cd uas-admin-panel

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Configure your environment variables (see CONFIGURATION.md)
nano .env.local

# Run development server
npm run dev
\`\`\`

Visit `http://localhost:3000` to access the admin panel.

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
│   ├── dashboard/           # Main dashboard
│   ├── agents/              # Agent management
│   ├── monitoring/          # Performance monitoring
│   ├── config/              # Configuration pages
│   └── tools/               # Developer tools
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── dashboard/           # Dashboard-specific components
│   ├── agents/              # Agent-related components
│   └── shared/              # Shared components
├── lib/                     # Utility functions
│   ├── api/                 # API client functions
│   ├── config/              # Configuration loaders
│   └── utils/               # Helper utilities
├── hooks/                   # Custom React hooks
├── types/                   # TypeScript type definitions
└── public/                  # Static assets
\`\`\`

## 🤝 Contributing

Please read [DEVELOPMENT.md](./DEVELOPMENT.md) for development guidelines and best practices.

## 📄 License

[Your License Here]

## 🆘 Support

For issues, questions, or contributions, please open an issue in the repository.

---

**Built with ❤️ for streamlined local development workflows**
