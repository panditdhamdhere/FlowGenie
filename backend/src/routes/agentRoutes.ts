import { Router, Request, Response } from 'express';
import { AIAgentService } from '../services/aiAgentService';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const aiAgentService = AIAgentService.getInstance();

// Get all agents for a user
router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const agents = aiAgentService.getUserAgents(userId);
    res.json({ success: true, agents });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch agents',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get a specific agent
router.get('/:agentId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { agentId } = req.params;
    const agent = aiAgentService.getAgent(agentId);
    
    if (!agent) {
      return res.status(404).json({ 
        success: false, 
        error: 'Agent not found' 
      });
    }

    // Check if user owns this agent
    const userId = (req as any).user.id;
    if (agent.userId !== userId) {
      return res.status(403).json({ 
        success: false, 
        error: 'Access denied' 
      });
    }

    res.json({ success: true, agent });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch agent',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Create a new agent
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { name, description, prompt, settings } = req.body;

    if (!name || !description || !prompt) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: name, description, prompt' 
      });
    }

    const agent = await aiAgentService.createAgent(
      userId,
      name,
      description,
      prompt,
      settings
    );

    res.status(201).json({ success: true, agent });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create agent',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Update an agent
router.put('/:agentId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { agentId } = req.params;
    const userId = (req as any).user.id;
    const updates = req.body;

    const agent = aiAgentService.getAgent(agentId);
    if (!agent) {
      return res.status(404).json({ 
        success: false, 
        error: 'Agent not found' 
      });
    }

    if (agent.userId !== userId) {
      return res.status(403).json({ 
        success: false, 
        error: 'Access denied' 
      });
    }

    // Update agent properties
    if (updates.name) agent.name = updates.name;
    if (updates.description) agent.description = updates.description;
    if (updates.prompt) agent.prompt = updates.prompt;
    if (updates.settings) {
      agent.settings = { ...agent.settings, ...updates.settings };
    }
    if (updates.isActive !== undefined) agent.isActive = updates.isActive;
    
    agent.updatedAt = new Date();

    res.json({ success: true, agent });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update agent',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Delete an agent
router.delete('/:agentId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { agentId } = req.params;
    const userId = (req as any).user.id;

    const agent = aiAgentService.getAgent(agentId);
    if (!agent) {
      return res.status(404).json({ 
        success: false, 
        error: 'Agent not found' 
      });
    }

    if (agent.userId !== userId) {
      return res.status(403).json({ 
        success: false, 
        error: 'Access denied' 
      });
    }

    // In a real implementation, you would remove from database
    // For now, just mark as inactive
    agent.isActive = false;
    agent.updatedAt = new Date();

    res.json({ success: true, message: 'Agent deleted successfully' });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete agent',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Execute a natural language command
router.post('/:agentId/command', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { agentId } = req.params;
    const userId = (req as any).user.id;
    const { command, marketData } = req.body;

    if (!command) {
      return res.status(400).json({ 
        success: false, 
        error: 'Command is required' 
      });
    }

    const agent = aiAgentService.getAgent(agentId);
    if (!agent) {
      return res.status(404).json({ 
        success: false, 
        error: 'Agent not found' 
      });
    }

    if (agent.userId !== userId) {
      return res.status(403).json({ 
        success: false, 
        error: 'Access denied' 
      });
    }

    if (!agent.isActive) {
      return res.status(400).json({ 
        success: false, 
        error: 'Agent is not active' 
      });
    }

    const commands = await aiAgentService.processNaturalLanguageCommand(
      agentId,
      command,
      marketData
    );

    res.json({ success: true, commands });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to process command',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Execute a specific command
router.post('/:agentId/execute', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { agentId } = req.params;
    const userId = (req as any).user.id;
    const { type, parameters, confidence, reasoning } = req.body;

    if (!type || !parameters) {
      return res.status(400).json({ 
        success: false, 
        error: 'Command type and parameters are required' 
      });
    }

    const agent = aiAgentService.getAgent(agentId);
    if (!agent) {
      return res.status(404).json({ 
        success: false, 
        error: 'Agent not found' 
      });
    }

    if (agent.userId !== userId) {
      return res.status(403).json({ 
        success: false, 
        error: 'Access denied' 
      });
    }

    if (!agent.isActive) {
      return res.status(400).json({ 
        success: false, 
        error: 'Agent is not active' 
      });
    }

    const command = {
      type,
      parameters,
      confidence: confidence || 0.5,
      reasoning: reasoning || 'No reasoning provided'
    };

    const result = await aiAgentService.executeAgentCommand(agentId, command);

    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to execute command',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get agent performance
router.get('/:agentId/performance', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { agentId } = req.params;
    const userId = (req as any).user.id;

    const agent = aiAgentService.getAgent(agentId);
    if (!agent) {
      return res.status(404).json({ 
        success: false, 
        error: 'Agent not found' 
      });
    }

    if (agent.userId !== userId) {
      return res.status(403).json({ 
        success: false, 
        error: 'Access denied' 
      });
    }

    res.json({ success: true, performance: agent.performance });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch performance',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get marketplace agents (public agents that users can copy)
router.get('/marketplace/public', async (req: Request, res: Response) => {
  try {
    const allAgents = aiAgentService.getAllAgents();
    const publicAgents = allAgents
      .filter(agent => agent.isActive)
      .map(agent => ({
        id: agent.id,
        name: agent.name,
        description: agent.description,
        performance: agent.performance,
        createdAt: agent.createdAt,
        // Don't expose sensitive information like prompts or user IDs
      }));

    res.json({ success: true, agents: publicAgents });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch marketplace agents',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export { router as agentRoutes };
