import express from 'express';
import { OllamaService, ChatMessage } from '../services/ollama';
import { Logger } from '../utils/logger';

const router = express.Router();
const ollamaService = new OllamaService();
const logger = new Logger();

// Chat endpoint
router.post('/message', async (req, res) => {
    try {
        const { message, model, conversation_history } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({
                error: 'Message is required and must be a string'
            });
        }

        // Prepare messages array
        const messages: ChatMessage[] = [];

        // Add conversation history if provided
        if (conversation_history && Array.isArray(conversation_history)) {
            messages.push(...conversation_history);
        }

        // Add current user message
        messages.push({
            role: 'user',
            content: message
        });

        // Generate response
        const response = await ollamaService.chat(messages, model);

        // Log the interaction
        logger.info('Chat interaction', {
            userMessage: message.substring(0, 100),
            responseLength: response.length,
            model: model || 'default'
        });

        res.json({
            success: true,
            response: response,
            model: model || process.env.OLLAMA_DEFAULT_MODEL,
            timestamp: new Date().toISOString(),
            conversation: {
                user: message,
                assistant: response
            }
        });
    } catch (error) {
        logger.error('Chat error:', error);

        res.status(500).json({
            success: false,
            error: 'Failed to generate response',
            message: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
        });
    }
});

// Stream chat endpoint
router.post('/stream', async (req, res) => {
    try {
        const { message, model } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({
                error: 'Message is required and must be a string'
            });
        }

        // Set up Server-Sent Events
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Cache-Control'
        });

        // Send initial message
        res.write(`data: ${JSON.stringify({
            type: 'start',
            message: 'Starting response generation...',
            timestamp: new Date().toISOString()
        })}\n\n`);

        let fullResponse = '';

        // Generate streaming response
        await ollamaService.streamGenerate(
            message,
            model,
            (chunk: string) => {
                fullResponse += chunk;

                // Send chunk to client
                res.write(`data: ${JSON.stringify({
                    type: 'chunk',
                    content: chunk,
                    timestamp: new Date().toISOString()
                })}\n\n`);
            }
        );

        // Send completion message
        res.write(`data: ${JSON.stringify({
            type: 'complete',
            fullResponse: fullResponse,
            timestamp: new Date().toISOString()
        })}\n\n`);

        res.end();

        logger.info('Stream chat completed', {
            userMessage: message.substring(0, 100),
            responseLength: fullResponse.length,
            model: model || 'default'
        });

    } catch (error) {
        logger.error('Stream chat error:', error);

        res.write(`data: ${JSON.stringify({
            type: 'error',
            error: 'Failed to generate streaming response',
            message: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
        })}\n\n`);

        res.end();
    }
});

// Simple generate endpoint (for prompt generation)
router.post('/generate', async (req, res) => {
    try {
        const { prompt, model } = req.body;

        if (!prompt || typeof prompt !== 'string') {
            return res.status(400).json({
                error: 'Prompt is required and must be a string'
            });
        }

        const response = await ollamaService.generate(prompt, model);

        res.json({
            success: true,
            prompt: prompt,
            response: response,
            model: model || process.env.OLLAMA_DEFAULT_MODEL,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        logger.error('Generate error:', error);

        res.status(500).json({
            success: false,
            error: 'Failed to generate response',
            message: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
        });
    }
});

// Get chat history (mock implementation)
router.get('/history', async (req, res) => {
    try {
        // In a real implementation, this would fetch from a database
        const mockHistory = [
            {
                id: '1',
                timestamp: new Date(Date.now() - 3600000).toISOString(),
                messages: [
                    { role: 'user', content: 'Hello, how are you?' },
                    { role: 'assistant', content: 'I am doing well, thank you for asking!' }
                ]
            }
        ];

        res.json({
            success: true,
            conversations: mockHistory,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        logger.error('Get chat history error:', error);

        res.status(500).json({
            success: false,
            error: 'Failed to get chat history',
            timestamp: new Date().toISOString()
        });
    }
});

export default router;
