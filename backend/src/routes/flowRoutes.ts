import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth';
import { FlowService } from '../services/flowService';

const router = Router();

// Get Flow Actions
router.get('/actions', authenticateToken, async (req: Request, res: Response) => {
  try {
    const flowService = FlowService.getInstance();
    const actions = flowService.getAllActions();
    
    res.json({
      success: true,
      actions: actions.map(action => ({
        id: action.id,
        name: action.name,
        description: action.description,
        parameters: action.parameters
      }))
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch Flow Actions',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Execute a Flow Action
router.post('/actions/:actionId/execute', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { actionId } = req.params;
    const { parameters } = req.body;
    const userId = (req as any).user.id;

    if (!parameters) {
      return res.status(400).json({ 
        success: false, 
        error: 'Parameters are required' 
      });
    }

    const flowService = FlowService.getInstance();
    const result = await flowService.executeAction(actionId, parameters);

    res.json({
      success: true,
      result,
      executedBy: userId,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to execute Flow Action',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get user's Flow account info
router.get('/account', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const flowService = FlowService.getInstance();
    const flowAddress = await flowService.getUserFlowAddress(userId);

    res.json({
      success: true,
      account: {
        userId,
        flowAddress,
        isConnected: !!flowAddress
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch Flow account info',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Connect Flow wallet
router.post('/connect', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { flowAddress } = req.body;

    if (!flowAddress) {
      return res.status(400).json({ 
        success: false, 
        error: 'Flow address is required' 
      });
    }

    // In a real implementation, you would:
    // 1. Verify the user owns the Flow address
    // 2. Store the connection in the database
    // 3. Set up wallet permissions

    res.json({
      success: true,
      message: 'Flow wallet connected successfully',
      flowAddress,
      userId
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to connect Flow wallet',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get Flow network status
router.get('/network', async (req: Request, res: Response) => {
  try {
    const networkInfo = {
      network: process.env.FLOW_NETWORK || 'testnet',
      accessNode: process.env.FLOW_ACCESS_NODE || 'https://rest-testnet.onflow.org',
      status: 'connected',
      latestBlock: {
        height: 12345678,
        timestamp: new Date().toISOString()
      },
      gasPrice: '0.00001',
      supportedContracts: [
        'NonFungibleToken',
        'TopShot',
        'TopShotMarket',
        'FungibleToken',
        'FlowToken'
      ]
    };

    res.json({
      success: true,
      network: networkInfo
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch network info',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get Flow transaction history
router.get('/transactions', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { limit = 20, offset = 0 } = req.query;

    // Mock transaction history
    const transactions = [
      {
        id: 'tx_1',
        type: 'nft_purchase',
        status: 'completed',
        amount: 45.50,
        nftId: '1',
        nftName: 'LeBron James - The King Dunk',
        timestamp: '2024-01-15T10:30:00Z',
        blockHeight: 12345678
      },
      {
        id: 'tx_2',
        type: 'nft_sale',
        status: 'completed',
        amount: 78.25,
        nftId: '2',
        nftName: 'Stephen Curry - Deep Three',
        timestamp: '2024-01-14T15:45:00Z',
        blockHeight: 12345670
      }
    ];

    // Apply pagination
    const startIndex = Number(offset);
    const endIndex = startIndex + Number(limit);
    const paginatedTransactions = transactions.slice(startIndex, endIndex);

    res.json({
      success: true,
      transactions: paginatedTransactions,
      total: transactions.length,
      pagination: {
        limit: Number(limit),
        offset: Number(offset),
        hasMore: endIndex < transactions.length
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch transaction history',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get Flow account balance
router.get('/balance', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const flowService = FlowService.getInstance();
    const flowAddress = await flowService.getUserFlowAddress(userId);

    // Mock balance data
    const balance = {
      flowAddress: flowAddress || 'Not connected',
      flow: '1000.50',
      usd: '1000.50', // Assuming 1 FLOW = 1 USD for demo
      nfts: {
        nbaTopShot: 5,
        nflAllDay: 2,
        total: 7
      }
    };

    res.json({
      success: true,
      balance
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch balance',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export { router as flowRoutes };
