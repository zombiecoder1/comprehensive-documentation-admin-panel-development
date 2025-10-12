import express from 'express';
import { OllamaService } from '../services/ollama';
import { Logger } from '../utils/logger';

const router = express.Router();
const ollamaService = new OllamaService();
const logger = new Logger();

// Get all models
router.get('/', async (req, res) => {
    try {
        const models = await ollamaService.getModels();

        const modelsList = models.map(model => ({
            name: model.name,
            model: model.model,
            size: model.size,
            modified: model.modified_at,
            digest: model.digest,
            details: {
                format: model.details.format,
                family: model.details.family,
                parameterSize: model.details.parameter_size,
                quantizationLevel: model.details.quantization_level
            }
        }));

        res.json({
            success: true,
            models: modelsList,
            total: models.length,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        logger.error('Failed to get models:', error);

        res.status(500).json({
            success: false,
            error: 'Failed to fetch models',
            message: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
        });
    }
});

// Get specific model info
router.get('/:modelName', async (req, res) => {
    try {
        const { modelName } = req.params;
        const modelInfo = await ollamaService.getModelInfo(modelName);

        res.json({
            success: true,
            model: modelName,
            info: modelInfo,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        logger.error(`Failed to get model info for ${req.params.modelName}:`, error);

        res.status(500).json({
            success: false,
            error: 'Failed to get model information',
            message: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
        });
    }
});

// Pull a new model
router.post('/pull', async (req, res) => {
    try {
        const { modelName } = req.body;

        if (!modelName || typeof modelName !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Model name is required'
            });
        }

        const success = await ollamaService.pullModel(modelName);

        if (success) {
            res.json({
                success: true,
                message: `Model ${modelName} pulled successfully`,
                model: modelName,
                timestamp: new Date().toISOString()
            });
        } else {
            res.status(500).json({
                success: false,
                error: `Failed to pull model ${modelName}`,
                timestamp: new Date().toISOString()
            });
        }
    } catch (error) {
        logger.error('Failed to pull model:', error);

        res.status(500).json({
            success: false,
            error: 'Failed to pull model',
            message: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
        });
    }
});

// Test model
router.post('/test', async (req, res) => {
    try {
        const { modelName, prompt } = req.body;

        if (!modelName || typeof modelName !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Model name is required'
            });
        }

        const testPrompt = prompt || 'Hello, how are you?';
        const response = await ollamaService.generate(testPrompt, modelName);

        res.json({
            success: true,
            model: modelName,
            testPrompt,
            response,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        logger.error('Failed to test model:', error);

        res.status(500).json({
            success: false,
            error: 'Failed to test model',
            message: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
        });
    }
});

export default router;
