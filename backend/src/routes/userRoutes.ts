import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

// Mock user database (in production, use a real database)
interface User {
  id: string;
  email: string;
  password: string;
  flowAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

const users: Map<string, User> = new Map();

// Register a new user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, flowAddress } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email and password are required' 
      });
    }

    // Check if user already exists
    const existingUser = Array.from(users.values()).find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({ 
        success: false, 
        error: 'User already exists' 
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email,
      password: hashedPassword,
      flowAddress,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    users.set(user.id, user);

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET not configured');
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email,
        flowAddress: user.flowAddress
      },
      jwtSecret,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(201).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        flowAddress: user.flowAddress,
        createdAt: user.createdAt
      },
      token
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to register user',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Login user
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email and password are required' 
      });
    }

    // Find user
    const user = Array.from(users.values()).find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET not configured');
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email,
        flowAddress: user.flowAddress
      },
      jwtSecret,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        flowAddress: user.flowAddress,
        createdAt: user.createdAt
      },
      token
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to login',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get current user profile
router.get('/profile', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = users.get(userId);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        flowAddress: user.flowAddress,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch profile',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { email, flowAddress } = req.body;
    const user = users.get(userId);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }

    // Update fields
    if (email) {
      // Check if email is already taken by another user
      const existingUser = Array.from(users.values()).find(
        u => u.email === email && u.id !== userId
      );
      if (existingUser) {
        return res.status(409).json({ 
          success: false, 
          error: 'Email already in use' 
        });
      }
      user.email = email;
    }

    if (flowAddress !== undefined) {
      user.flowAddress = flowAddress;
    }

    user.updatedAt = new Date();

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        flowAddress: user.flowAddress,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update profile',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Change password
router.put('/password', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { currentPassword, newPassword } = req.body;
    const user = users.get(userId);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        success: false, 
        error: 'Current password and new password are required' 
      });
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        success: false, 
        error: 'Current password is incorrect' 
      });
    }

    // Hash new password
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedNewPassword;
    user.updatedAt = new Date();

    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update password',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export { router as userRoutes };
