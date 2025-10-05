import { Router, Request, Response } from 'express';
import { optionalAuth } from '../middleware/auth';
import axios from 'axios';

const router = Router();

// NBA Top Shot API endpoints
const NBA_TOPSHOT_API = 'https://api.nbatopshot.com';
const FLOW_MARKETPLACE_API = 'https://api.flowverse.co';

interface NFTListing {
  id: string;
  name: string;
  price: number;
  rarity: string;
  series: string;
  set: string;
  marketplace: string;
  imageUrl: string;
  lastSale?: {
    price: number;
    date: string;
  };
  owner?: string;
}

// Get NBA Top Shot moments
router.get('/nba-topshot', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { limit = 20, offset = 0, minPrice, maxPrice, rarity, series } = req.query;

    // In a real implementation, you would call the actual NBA Top Shot API
    // For now, we'll return mock data
    const mockMoments: NFTListing[] = [
      {
        id: '1',
        name: 'LeBron James - The King Dunk',
        price: 45.50,
        rarity: 'Common',
        series: 'Series 3',
        set: 'Base Set',
        marketplace: 'NBA Top Shot',
        imageUrl: 'https://images.nbatopshot.com/moments/1.jpg',
        lastSale: {
          price: 42.00,
          date: '2024-01-15T10:30:00Z'
        }
      },
      {
        id: '2',
        name: 'Stephen Curry - Deep Three',
        price: 78.25,
        rarity: 'Rare',
        series: 'Series 3',
        set: 'Rising Stars',
        marketplace: 'NBA Top Shot',
        imageUrl: 'https://images.nbatopshot.com/moments/2.jpg',
        lastSale: {
          price: 75.00,
          date: '2024-01-14T15:45:00Z'
        }
      },
      {
        id: '3',
        name: 'Giannis Antetokounmpo - Block',
        price: 125.00,
        rarity: 'Legendary',
        series: 'Series 3',
        set: 'Championship',
        marketplace: 'NBA Top Shot',
        imageUrl: 'https://images.nbatopshot.com/moments/3.jpg'
      },
      {
        id: '4',
        name: 'Luka Dončić - Game Winner',
        price: 35.75,
        rarity: 'Common',
        series: 'Series 3',
        set: 'Base Set',
        marketplace: 'NBA Top Shot',
        imageUrl: 'https://images.nbatopshot.com/moments/4.jpg',
        lastSale: {
          price: 38.00,
          date: '2024-01-13T09:20:00Z'
        }
      },
      {
        id: '5',
        name: 'Kevin Durant - Fadeaway',
        price: 95.50,
        rarity: 'Rare',
        series: 'Series 3',
        set: 'All-Star',
        marketplace: 'NBA Top Shot',
        imageUrl: 'https://images.nbatopshot.com/moments/5.jpg'
      }
    ];

    // Apply filters
    let filteredMoments = mockMoments;

    if (minPrice) {
      filteredMoments = filteredMoments.filter(m => m.price >= Number(minPrice));
    }
    if (maxPrice) {
      filteredMoments = filteredMoments.filter(m => m.price <= Number(maxPrice));
    }
    if (rarity) {
      filteredMoments = filteredMoments.filter(m => m.rarity === rarity);
    }
    if (series) {
      filteredMoments = filteredMoments.filter(m => m.series === series);
    }

    // Apply pagination
    const startIndex = Number(offset);
    const endIndex = startIndex + Number(limit);
    const paginatedMoments = filteredMoments.slice(startIndex, endIndex);

    res.json({
      success: true,
      moments: paginatedMoments,
      total: filteredMoments.length,
      pagination: {
        limit: Number(limit),
        offset: Number(offset),
        hasMore: endIndex < filteredMoments.length
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch NBA Top Shot moments',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get NFL All Day moments
router.get('/nfl-allday', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { limit = 20, offset = 0, minPrice, maxPrice, rarity } = req.query;

    // Mock NFL All Day data
    const mockMoments: NFTListing[] = [
      {
        id: 'nfl-1',
        name: 'Tom Brady - Touchdown Pass',
        price: 125.00,
        rarity: 'Rare',
        series: 'Series 2',
        set: 'Playoffs',
        marketplace: 'NFL All Day',
        imageUrl: 'https://images.nflallday.com/moments/1.jpg',
        lastSale: {
          price: 130.00,
          date: '2024-01-15T14:20:00Z'
        }
      },
      {
        id: 'nfl-2',
        name: 'Aaron Donald - Sack',
        price: 85.50,
        rarity: 'Common',
        series: 'Series 2',
        set: 'Base Set',
        marketplace: 'NFL All Day',
        imageUrl: 'https://images.nflallday.com/moments/2.jpg'
      },
      {
        id: 'nfl-3',
        name: 'Cooper Kupp - Catch',
        price: 65.25,
        rarity: 'Rare',
        series: 'Series 2',
        set: 'Rising Stars',
        marketplace: 'NFL All Day',
        imageUrl: 'https://images.nflallday.com/moments/3.jpg'
      }
    ];

    // Apply filters (same logic as NBA Top Shot)
    let filteredMoments = mockMoments;

    if (minPrice) {
      filteredMoments = filteredMoments.filter(m => m.price >= Number(minPrice));
    }
    if (maxPrice) {
      filteredMoments = filteredMoments.filter(m => m.price <= Number(maxPrice));
    }
    if (rarity) {
      filteredMoments = filteredMoments.filter(m => m.rarity === rarity);
    }

    // Apply pagination
    const startIndex = Number(offset);
    const endIndex = startIndex + Number(limit);
    const paginatedMoments = filteredMoments.slice(startIndex, endIndex);

    res.json({
      success: true,
      moments: paginatedMoments,
      total: filteredMoments.length,
      pagination: {
        limit: Number(limit),
        offset: Number(offset),
        hasMore: endIndex < filteredMoments.length
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch NFL All Day moments',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get market trends and analytics
router.get('/analytics', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { timeframe = '7d', collection = 'all' } = req.query;

    // Mock analytics data
    const analytics = {
      timeframe,
      collection,
      totalVolume: 1250000,
      totalSales: 15420,
      averagePrice: 81.05,
      priceChange: {
        '24h': 2.5,
        '7d': -5.2,
        '30d': 15.8
      },
      topPerformers: [
        {
          name: 'LeBron James - The King Dunk',
          priceChange: 25.5,
          volume: 12500
        },
        {
          name: 'Stephen Curry - Deep Three',
          priceChange: 18.2,
          volume: 8900
        }
      ],
      marketCap: {
        nbaTopShot: 850000,
        nflAllDay: 400000
      }
    };

    res.json({
      success: true,
      analytics
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch market analytics',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Search across all marketplaces
router.get('/search', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { q, limit = 20, offset = 0 } = req.query;

    if (!q || typeof q !== 'string') {
      return res.status(400).json({ 
        success: false, 
        error: 'Search query is required' 
      });
    }

    // Mock search results combining NBA Top Shot and NFL All Day
    const mockResults: NFTListing[] = [
      {
        id: 'search-1',
        name: 'LeBron James - The King Dunk',
        price: 45.50,
        rarity: 'Common',
        series: 'Series 3',
        set: 'Base Set',
        marketplace: 'NBA Top Shot',
        imageUrl: 'https://images.nbatopshot.com/moments/1.jpg'
      },
      {
        id: 'search-2',
        name: 'Tom Brady - Touchdown Pass',
        price: 125.00,
        rarity: 'Rare',
        series: 'Series 2',
        set: 'Playoffs',
        marketplace: 'NFL All Day',
        imageUrl: 'https://images.nflallday.com/moments/1.jpg'
      }
    ];

    // Simple text search (in production, use proper search engine)
    const searchResults = mockResults.filter(item => 
      item.name.toLowerCase().includes(q.toLowerCase()) ||
      item.set.toLowerCase().includes(q.toLowerCase()) ||
      item.series.toLowerCase().includes(q.toLowerCase())
    );

    // Apply pagination
    const startIndex = Number(offset);
    const endIndex = startIndex + Number(limit);
    const paginatedResults = searchResults.slice(startIndex, endIndex);

    res.json({
      success: true,
      results: paginatedResults,
      total: searchResults.length,
      query: q,
      pagination: {
        limit: Number(limit),
        offset: Number(offset),
        hasMore: endIndex < searchResults.length
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to search marketplace',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get specific NFT details
router.get('/nft/:id', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Mock NFT details
    const nftDetails = {
      id,
      name: 'LeBron James - The King Dunk',
      price: 45.50,
      rarity: 'Common',
      series: 'Series 3',
      set: 'Base Set',
      marketplace: 'NBA Top Shot',
      imageUrl: 'https://images.nbatopshot.com/moments/1.jpg',
      description: 'LeBron James with an incredible dunk during the 2023-24 season',
      attributes: [
        { trait_type: 'Player', value: 'LeBron James' },
        { trait_type: 'Team', value: 'Los Angeles Lakers' },
        { trait_type: 'Play Type', value: 'Dunk' },
        { trait_type: 'Rarity', value: 'Common' }
      ],
      history: [
        {
          price: 42.00,
          date: '2024-01-15T10:30:00Z',
          type: 'sale'
        },
        {
          price: 40.00,
          date: '2024-01-14T16:45:00Z',
          type: 'sale'
        }
      ],
      owner: '0x1234567890abcdef'
    };

    res.json({
      success: true,
      nft: nftDetails
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch NFT details',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export { router as marketplaceRoutes };
