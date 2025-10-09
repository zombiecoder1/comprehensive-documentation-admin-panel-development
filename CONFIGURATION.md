# Configuration Documentation

Complete guide for configuring the Unified Local Development & Agent System Admin Panel.

## Table of Contents

1. [Environment Variables](#environment-variables)
2. [Server Configuration](#server-configuration)
3. [Agent System Configuration](#agent-system-configuration)
4. [VS Code Integration](#vs-code-integration)
5. [Load Balancing Configuration](#load-balancing-configuration)
6. [Security Settings](#security-settings)

---

## Environment Variables

### Required Variables

Create a `.env.local` file in the root directory with the following variables:

\`\`\`bash
# Application Settings
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Unified Agent System (UAS) Backend
UAS_API_URL=http://localhost:8000
UAS_API_KEY=your_uas_api_key_here
UAS_WEBSOCKET_URL=ws://localhost:8000/ws

# Local Model Server
LOCAL_MODEL_SERVER_URL=http://localhost:5000
LOCAL_MODEL_API_KEY=your_model_api_key_here

# Memory Agent Configuration
MEMORY_AGENT_ENABLED=true
MEMORY_AGENT_URL=http://localhost:8001
MEMORY_AGENT_STORAGE_PATH=./data/memory

# Load Balancer Configuration
LOAD_BALANCER_ENABLED=true
LOAD_BALANCER_URL=http://localhost:8002
LOAD_BALANCER_STRATEGY=round-robin

# VS Code Integration
VSCODE_API_ENABLED=true
VSCODE_API_URL=http://localhost:3001
VSCODE_WORKSPACE_PATH=/path/to/your/workspace

# CLI Agent Server
CLI_AGENT_ENABLED=true
CLI_AGENT_URL=http://localhost:8003

# Audio Chat Configuration
AUDIO_CHAT_ENABLED=false
AUDIO_CHAT_PROVIDER=webrtc

# Mobile App Editor API
MOBILE_EDITOR_API_ENABLED=false
MOBILE_EDITOR_API_URL=http://localhost:8004

# Monitoring & Logging
ENABLE_MONITORING=true
LOG_LEVEL=info
METRICS_INTERVAL=5000

# Security
API_RATE_LIMIT=100
SESSION_SECRET=your_session_secret_here
CORS_ORIGIN=http://localhost:3000
\`\`\`

### Optional Variables

\`\`\`bash
# Advanced Configuration
CACHE_ENABLED=true
CACHE_TTL=3600
DATABASE_URL=postgresql://localhost:5432/uas_admin
REDIS_URL=redis://localhost:6379

# Feature Flags
FEATURE_MULTI_AGENT_WORKSTATION=true
FEATURE_PROMPT_TEMPLATE_EDITOR=true
FEATURE_ADVANCED_MONITORING=true

# Development Tools
DEBUG_MODE=false
VERBOSE_LOGGING=false
\`\`\`

---

## Server Configuration

### Dynamic Server Configuration

The admin panel automatically loads server configurations from your `.env` file. The system performs the following checks:

#### 1. Server Connectivity Verification

\`\`\`typescript
// Automatic server health checks
const serverChecks = {
  uasBackend: UAS_API_URL,
  localModel: LOCAL_MODEL_SERVER_URL,
  memoryAgent: MEMORY_AGENT_URL,
  loadBalancer: LOAD_BALANCER_URL,
  vscodeApi: VSCODE_API_URL,
  cliAgent: CLI_AGENT_URL
}
\`\`\`

#### 2. Response-Based Feature Activation

Features are automatically enabled/disabled based on server responses:

- ✅ **Active**: Server responds with 200 status
- ⚠️ **Degraded**: Server responds with 4xx/5xx status
- ❌ **Inactive**: Server unreachable or timeout

### Server Configuration File

Create `config/servers.json` for additional server settings:

\`\`\`json
{
  "servers": {
    "uas_backend": {
      "url": "${UAS_API_URL}",
      "timeout": 5000,
      "retries": 3,
      "healthCheck": "/health"
    },
    "local_model": {
      "url": "${LOCAL_MODEL_SERVER_URL}",
      "timeout": 30000,
      "retries": 2,
      "healthCheck": "/api/health"
    },
    "memory_agent": {
      "url": "${MEMORY_AGENT_URL}",
      "timeout": 5000,
      "retries": 3,
      "healthCheck": "/status"
    }
  }
}
\`\`\`

---

## Agent System Configuration

### Memory Agent Configuration

Configure the Memory Agent for stateful operations:

\`\`\`json
// config/memory-agent.json
{
  "enabled": true,
  "storage": {
    "type": "filesystem",
    "path": "./data/memory",
    "maxSize": "1GB"
  },
  "retention": {
    "shortTerm": "1h",
    "longTerm": "30d",
    "archiveAfter": "90d"
  },
  "indexing": {
    "enabled": true,
    "strategy": "semantic",
    "embeddingModel": "local"
  }
}
\`\`\`

### Multi-Agent Orchestration

Configure multiple agents in `config/agents.json`:

\`\`\`json
{
  "agents": [
    {
      "id": "agent-001",
      "name": "Code Assistant",
      "type": "code_generation",
      "endpoint": "http://localhost:5001",
      "priority": 1,
      "capabilities": ["code", "refactor", "debug"]
    },
    {
      "id": "agent-002",
      "name": "Documentation Agent",
      "type": "documentation",
      "endpoint": "http://localhost:5002",
      "priority": 2,
      "capabilities": ["docs", "comments", "readme"]
    },
    {
      "id": "agent-003",
      "name": "Testing Agent",
      "type": "testing",
      "endpoint": "http://localhost:5003",
      "priority": 3,
      "capabilities": ["unit_tests", "integration_tests"]
    }
  ],
  "orchestration": {
    "strategy": "priority",
    "fallback": true,
    "timeout": 30000
  }
}
\`\`\`

---

## VS Code Integration

### Setup VS Code API

1. **Install VS Code Extension** (if using custom extension):
   \`\`\`bash
   code --install-extension uas-admin-panel-vscode
   \`\`\`

2. **Configure VS Code Settings** (`settings.json`):
   \`\`\`json
   {
     "uas-admin-panel.enabled": true,
     "uas-admin-panel.apiUrl": "http://localhost:3000/api/vscode",
     "uas-admin-panel.autoSync": true,
     "uas-admin-panel.workspacePath": "${workspaceFolder}"
   }
   \`\`\`

3. **Enable API Server**:
   \`\`\`bash
   # In VS Code terminal
   code --enable-proposed-api uas-admin-panel
   \`\`\`

### VS Code Integration Features

\`\`\`json
// config/vscode-integration.json
{
  "features": {
    "fileOperations": true,
    "terminalCommands": true,
    "configSync": true,
    "snippetManagement": true
  },
  "permissions": {
    "readFiles": true,
    "writeFiles": true,
    "executeCommands": true
  },
  "security": {
    "requireConfirmation": true,
    "allowedPaths": [
      "${workspaceFolder}",
      "${workspaceFolder}/src"
    ]
  }
}
\`\`\`

---

## Load Balancing Configuration

### Load Balancer Settings

Configure load balancing for multiple local model instances:

\`\`\`json
// config/load-balancer.json
{
  "enabled": true,
  "strategy": "round-robin",
  "healthCheck": {
    "enabled": true,
    "interval": 10000,
    "timeout": 5000
  },
  "instances": [
    {
      "id": "model-instance-1",
      "url": "http://localhost:5000",
      "weight": 1,
      "maxConnections": 10
    },
    {
      "id": "model-instance-2",
      "url": "http://localhost:5001",
      "weight": 1,
      "maxConnections": 10
    },
    {
      "id": "model-instance-3",
      "url": "http://localhost:5002",
      "weight": 2,
      "maxConnections": 20
    }
  ],
  "failover": {
    "enabled": true,
    "retries": 3,
    "backoffMs": 1000
  }
}
\`\`\`

### Load Balancing Strategies

Available strategies:

- **round-robin**: Distributes requests evenly across instances
- **weighted**: Uses instance weights for distribution
- **least-connections**: Routes to instance with fewest active connections
- **response-time**: Routes to fastest responding instance

---

## Security Settings

### API Security

\`\`\`json
// config/security.json
{
  "authentication": {
    "enabled": true,
    "type": "api-key",
    "headerName": "X-API-Key"
  },
  "rateLimit": {
    "enabled": true,
    "windowMs": 60000,
    "maxRequests": 100
  },
  "cors": {
    "enabled": true,
    "origins": ["http://localhost:3000"],
    "credentials": true
  },
  "encryption": {
    "enabled": true,
    "algorithm": "aes-256-gcm"
  }
}
\`\`\`

### Session Management

\`\`\`bash
# Session configuration in .env.local
SESSION_SECRET=your_secure_random_string_here
SESSION_TIMEOUT=3600000
SESSION_COOKIE_SECURE=false
SESSION_COOKIE_HTTPONLY=true
\`\`\`

---

## Configuration Validation

### Validate Configuration

Run the configuration validator:

\`\`\`bash
npm run validate-config
\`\`\`

This checks:
- ✅ All required environment variables are set
- ✅ Server URLs are accessible
- ✅ Configuration files are valid JSON
- ✅ Security settings are properly configured

### Configuration Testing

Test your configuration:

\`\`\`bash
# Test server connectivity
npm run test:servers

# Test agent system
npm run test:agents

# Test VS Code integration
npm run test:vscode

# Test all configurations
npm run test:config
\`\`\`

---

## Troubleshooting

### Common Configuration Issues

1. **Server Not Responding**
   - Check if server is running: `curl http://localhost:8000/health`
   - Verify URL in `.env.local`
   - Check firewall settings

2. **VS Code Integration Not Working**
   - Ensure VS Code extension is installed
   - Check `VSCODE_API_URL` is correct
   - Verify workspace path exists

3. **Load Balancer Issues**
   - Verify all model instances are running
   - Check health check endpoints
   - Review load balancer logs

4. **Memory Agent Errors**
   - Ensure storage path exists and is writable
   - Check available disk space
   - Verify permissions

---

## Advanced Configuration

### Custom Configuration Loader

Create custom configuration loaders in `lib/config/`:

\`\`\`typescript
// lib/config/custom-loader.ts
export async function loadCustomConfig() {
  // Load from database, remote API, etc.
  const config = await fetchConfigFromSource();
  return config;
}
\`\`\`

### Environment-Specific Configurations

Use different configurations per environment:

\`\`\`
.env.local          # Local development
.env.staging        # Staging environment
.env.production     # Production environment
\`\`\`

---

## Configuration Best Practices

1. **Never commit sensitive data** - Use `.env.local` (gitignored)
2. **Use environment variables** - Keep configuration flexible
3. **Validate on startup** - Catch configuration errors early
4. **Document changes** - Update this file when adding new config options
5. **Test configurations** - Run validation tests before deployment

---

For additional help, see [DEVELOPMENT.md](./DEVELOPMENT.md) or open an issue.
