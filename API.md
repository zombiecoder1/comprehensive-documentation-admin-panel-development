# API Documentation

Complete API reference for the UAS Admin Panel.

## Table of Contents

1. [Authentication](#authentication)
2. [Configuration API](#configuration-api)
3. [Agent Management API](#agent-management-api)
4. [Monitoring API](#monitoring-api)
5. [VS Code Integration API](#vs-code-integration-api)
6. [Load Balancer API](#load-balancer-api)
7. [Memory Agent API](#memory-agent-api)
8. [WebSocket API](#websocket-api)

---

## Authentication

All API requests require authentication using an API key.

### Headers

\`\`\`http
X-API-Key: your_api_key_here
Content-Type: application/json
\`\`\`

### Error Responses

\`\`\`json
{
  "error": "Unauthorized",
  "message": "Invalid or missing API key"
}
\`\`\`

---

## Configuration API

### Load Configuration

Load current system configuration from environment variables.

**Endpoint**: `GET /api/config/load`

**Response**:
\`\`\`json
{
  "servers": {
    "uasBackend": {
      "url": "http://localhost:8000",
      "status": "active",
      "lastCheck": "2025-01-10T12:00:00Z"
    },
    "localModel": {
      "url": "http://localhost:5000",
      "status": "active",
      "lastCheck": "2025-01-10T12:00:00Z"
    }
  },
  "features": {
    "memoryAgent": true,
    "loadBalancer": true,
    "vscodeIntegration": true
  }
}
\`\`\`

### Update Configuration

Update system configuration.

**Endpoint**: `POST /api/config/update`

**Request Body**:
\`\`\`json
{
  "key": "MEMORY_AGENT_ENABLED",
  "value": "true"
}
\`\`\`

**Response**:
\`\`\`json
{
  "success": true,
  "message": "Configuration updated successfully"
}
\`\`\`

### Validate Configuration

Validate current configuration.

**Endpoint**: `POST /api/config/validate`

**Response**:
\`\`\`json
{
  "valid": true,
  "errors": [],
  "warnings": [
    "AUDIO_CHAT_ENABLED is false, audio features will be disabled"
  ]
}
\`\`\`

---

## Agent Management API

### List All Agents

Get list of all configured agents.

**Endpoint**: `GET /api/agents/list`

**Response**:
\`\`\`json
{
  "agents": [
    {
      "id": "agent-001",
      "name": "Code Assistant",
      "type": "code_generation",
      "status": "active",
      "endpoint": "http://localhost:5001",
      "priority": 1,
      "capabilities": ["code", "refactor", "debug"],
      "metrics": {
        "requestCount": 150,
        "avgResponseTime": 250,
        "errorRate": 0.02
      }
    }
  ]
}
\`\`\`

### Get Agent Status

Get status of a specific agent.

**Endpoint**: `GET /api/agents/[id]/status`

**Response**:
\`\`\`json
{
  "id": "agent-001",
  "status": "active",
  "uptime": 3600,
  "lastRequest": "2025-01-10T12:00:00Z",
  "health": {
    "cpu": 45,
    "memory": 512,
    "responseTime": 250
  }
}
\`\`\`

### Start Agent

Start a specific agent.

**Endpoint**: `POST /api/agents/[id]/start`

**Response**:
\`\`\`json
{
  "success": true,
  "message": "Agent started successfully",
  "agentId": "agent-001"
}
\`\`\`

### Stop Agent

Stop a specific agent.

**Endpoint**: `POST /api/agents/[id]/stop`

**Response**:
\`\`\`json
{
  "success": true,
  "message": "Agent stopped successfully",
  "agentId": "agent-001"
}
\`\`\`

### Call Agent

Execute a request through an agent.

**Endpoint**: `POST /api/agents/[id]/call`

**Request Body**:
\`\`\`json
{
  "action": "generate_code",
  "payload": {
    "prompt": "Create a React component",
    "language": "typescript"
  }
}
\`\`\`

**Response**:
\`\`\`json
{
  "success": true,
  "result": {
    "code": "export function Component() { ... }",
    "explanation": "This component..."
  },
  "executionTime": 1250
}
\`\`\`

---

## Monitoring API

### Get System Metrics

Get current system performance metrics.

**Endpoint**: `GET /api/monitoring/metrics`

**Query Parameters**:
- `timeRange`: Time range for metrics (e.g., "1h", "24h", "7d")
- `interval`: Data point interval (e.g., "1m", "5m", "1h")

**Response**:
\`\`\`json
{
  "timestamp": "2025-01-10T12:00:00Z",
  "metrics": {
    "cpu": {
      "current": 45,
      "average": 40,
      "peak": 75
    },
    "memory": {
      "used": 2048,
      "total": 8192,
      "percentage": 25
    },
    "requests": {
      "total": 1500,
      "successful": 1470,
      "failed": 30,
      "avgResponseTime": 250
    },
    "agents": {
      "active": 3,
      "inactive": 1,
      "total": 4
    }
  }
}
\`\`\`

### Get Logs

Retrieve system logs.

**Endpoint**: `GET /api/monitoring/logs`

**Query Parameters**:
- `level`: Log level filter ("debug", "info", "warn", "error")
- `limit`: Number of logs to return (default: 100)
- `offset`: Pagination offset

**Response**:
\`\`\`json
{
  "logs": [
    {
      "timestamp": "2025-01-10T12:00:00Z",
      "level": "info",
      "message": "Agent agent-001 started successfully",
      "metadata": {
        "agentId": "agent-001",
        "duration": 150
      }
    }
  ],
  "total": 1500,
  "hasMore": true
}
\`\`\`

### Get Health Status

Get overall system health status.

**Endpoint**: `GET /api/monitoring/health`

**Response**:
\`\`\`json
{
  "status": "healthy",
  "timestamp": "2025-01-10T12:00:00Z",
  "services": {
    "uasBackend": {
      "status": "healthy",
      "responseTime": 50
    },
    "memoryAgent": {
      "status": "healthy",
      "responseTime": 30
    },
    "loadBalancer": {
      "status": "degraded",
      "responseTime": 500,
      "message": "High response time"
    }
  },
  "overallHealth": 85
}
\`\`\`

---

## VS Code Integration API

### Execute Command

Execute a command in VS Code.

**Endpoint**: `POST /api/vscode/execute`

**Request Body**:
\`\`\`json
{
  "command": "workbench.action.files.save",
  "args": []
}
\`\`\`

**Response**:
\`\`\`json
{
  "success": true,
  "result": "Command executed successfully"
}
\`\`\`

### Sync File

Sync file content to VS Code.

**Endpoint**: `POST /api/vscode/sync`

**Request Body**:
\`\`\`json
{
  "filePath": "/workspace/src/components/Button.tsx",
  "content": "export function Button() { ... }"
}
\`\`\`

**Response**:
\`\`\`json
{
  "success": true,
  "message": "File synced successfully",
  "filePath": "/workspace/src/components/Button.tsx"
}
\`\`\`

### Get Workspace Info

Get current VS Code workspace information.

**Endpoint**: `GET /api/vscode/workspace`

**Response**:
\`\`\`json
{
  "path": "/Users/dev/projects/my-app",
  "name": "my-app",
  "folders": [
    {
      "name": "src",
      "path": "/Users/dev/projects/my-app/src"
    }
  ]
}
\`\`\`

---

## Load Balancer API

### Get Instance Status

Get status of all load balancer instances.

**Endpoint**: `GET /api/load-balancer/instances`

**Response**:
\`\`\`json
{
  "instances": [
    {
      "id": "model-instance-1",
      "url": "http://localhost:5000",
      "status": "healthy",
      "weight": 1,
      "activeConnections": 5,
      "totalRequests": 150,
      "avgResponseTime": 250
    },
    {
      "id": "model-instance-2",
      "url": "http://localhost:5001",
      "status": "healthy",
      "weight": 1,
      "activeConnections": 3,
      "totalRequests": 120,
      "avgResponseTime": 200
    }
  ],
  "strategy": "round-robin"
}
\`\`\`

### Route Request

Route a request through the load balancer.

**Endpoint**: `POST /api/load-balancer/route`

**Request Body**:
\`\`\`json
{
  "payload": {
    "prompt": "Generate code",
    "model": "gpt-4"
  }
}
\`\`\`

**Response**:
\`\`\`json
{
  "success": true,
  "result": { ... },
  "instanceId": "model-instance-1",
  "executionTime": 250
}
\`\`\`

### Update Strategy

Update load balancing strategy.

**Endpoint**: `POST /api/load-balancer/strategy`

**Request Body**:
\`\`\`json
{
  "strategy": "weighted"
}
\`\`\`

**Response**:
\`\`\`json
{
  "success": true,
  "message": "Strategy updated to weighted"
}
\`\`\`

---

## Memory Agent API

### Store Data

Store data in memory agent.

**Endpoint**: `POST /api/memory/store`

**Request Body**:
\`\`\`json
{
  "key": "user_preferences",
  "value": {
    "theme": "dark",
    "language": "en"
  },
  "ttl": 3600
}
\`\`\`

**Response**:
\`\`\`json
{
  "success": true,
  "key": "user_preferences",
  "expiresAt": "2025-01-10T13:00:00Z"
}
\`\`\`

### Retrieve Data

Retrieve data from memory agent.

**Endpoint**: `GET /api/memory/retrieve/[key]`

**Response**:
\`\`\`json
{
  "key": "user_preferences",
  "value": {
    "theme": "dark",
    "language": "en"
  },
  "createdAt": "2025-01-10T12:00:00Z",
  "expiresAt": "2025-01-10T13:00:00Z"
}
\`\`\`

### Search Memory

Search memory agent storage.

**Endpoint**: `POST /api/memory/search`

**Request Body**:
\`\`\`json
{
  "query": "user preferences",
  "limit": 10
}
\`\`\`

**Response**:
\`\`\`json
{
  "results": [
    {
      "key": "user_preferences",
      "value": { ... },
      "relevance": 0.95
    }
  ],
  "total": 1
}
\`\`\`

### Delete Data

Delete data from memory agent.

**Endpoint**: `DELETE /api/memory/delete/[key]`

**Response**:
\`\`\`json
{
  "success": true,
  "message": "Data deleted successfully"
}
\`\`\`

---

## WebSocket API

### Connection

Connect to WebSocket for real-time updates.

**Endpoint**: `ws://localhost:3000/api/websocket`

**Connection Headers**:
\`\`\`
X-API-Key: your_api_key_here
\`\`\`

### Subscribe to Events

Subscribe to specific event types.

**Message**:
\`\`\`json
{
  "type": "subscribe",
  "events": ["agent.status", "metrics.update", "logs.new"]
}
\`\`\`

**Response**:
\`\`\`json
{
  "type": "subscribed",
  "events": ["agent.status", "metrics.update", "logs.new"]
}
\`\`\`

### Event Messages

Receive real-time event updates.

**Agent Status Update**:
\`\`\`json
{
  "type": "agent.status",
  "data": {
    "agentId": "agent-001",
    "status": "active",
    "timestamp": "2025-01-10T12:00:00Z"
  }
}
\`\`\`

**Metrics Update**:
\`\`\`json
{
  "type": "metrics.update",
  "data": {
    "cpu": 45,
    "memory": 2048,
    "timestamp": "2025-01-10T12:00:00Z"
  }
}
\`\`\`

**New Log**:
\`\`\`json
{
  "type": "logs.new",
  "data": {
    "level": "info",
    "message": "Agent started",
    "timestamp": "2025-01-10T12:00:00Z"
  }
}
\`\`\`

### Unsubscribe

Unsubscribe from events.

**Message**:
\`\`\`json
{
  "type": "unsubscribe",
  "events": ["logs.new"]
}
\`\`\`

---

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid or missing API key |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |
| 503 | Service Unavailable - Service is down |

---

## Rate Limiting

- **Default Limit**: 100 requests per minute per API key
- **Headers**: 
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Time when limit resets (Unix timestamp)

---

For implementation examples, see [DEVELOPMENT.md](./DEVELOPMENT.md).
