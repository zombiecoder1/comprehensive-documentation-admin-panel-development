import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import path from 'path';

// Load environment variables
dotenv.config();

// Import routes
import healthRoutes from './routes/health';
import statusRoutes from './routes/status';
import chatRoutes from './routes/chat';
import modelsRoutes from './routes/models';
import agentsRoutes from './routes/agents';
import memoryRoutes from './routes/memory';
import cliRoutes from './routes/cli';
import editorRoutes from './routes/editor';

// Import services
import { OllamaService } from './services/ollama';
import { WebSocketService } from './services/websocket';
import { Logger } from './utils/logger';

const app = express();
const server = createServer(app);
const port = process.env.PORT || 8000;

// Initialize services
const ollamaService = new OllamaService();
const logger = new Logger();

// WebSocket setup
const wss = new WebSocketServer({ server });
const wsService = new WebSocketService(wss);

// Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.path}`, {
        ip: req.ip,
        userAgent: req.get('User-Agent')
    });
    next();
});

// Routes
app.use('/health', healthRoutes);
app.use('/status', statusRoutes);
app.use('/chat', chatRoutes);
app.use('/models', modelsRoutes);
app.use('/agents', agentsRoutes);
app.use('/memory', memoryRoutes);
app.use('/cli-agent', cliRoutes);
app.use('/editor', editorRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'UAS TypeScript Server',
        version: '1.0.0',
        status: 'running',
        timestamp: new Date().toISOString(),
        endpoints: {
            health: '/health',
            status: '/status',
            chat: '/chat',
            models: '/models',
            agents: '/agents',
            memory: '/memory',
            cli: '/cli-agent',
            editor: '/editor'
        }
    });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.originalUrl} not found`
    });
});

// Start server
server.listen(port, () => {
    logger.info(`🚀 UAS TypeScript Server running on port ${port}`);
    logger.info(`📡 WebSocket server ready for real-time updates`);
    logger.info(`🔗 Ollama integration: ${ollamaService.isConnected ? 'Connected' : 'Disconnected'}`);

    // Test Ollama connection
    ollamaService.testConnection().then(connected => {
        if (connected) {
            logger.info('✅ Ollama service connected successfully');
        } else {
            logger.warn('⚠️ Ollama service not available - some features may not work');
        }
    });
});

// Graceful shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully');
    server.close(() => {
        logger.info('Server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    logger.info('SIGINT received, shutting down gracefully');
    server.close(() => {
        logger.info('Server closed');
        process.exit(0);
    });
});

export { app, server, wsService, ollamaService };
