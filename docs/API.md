# FlowGenie API Documentation

## Base URL
```
Development: http://localhost:3001/api
Production: https://api.flowgenie.com/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Endpoints

### Users

#### Register User
```http
POST /users/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "flowAddress": "0x..." // optional
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "flowAddress": "0x...",
    "createdAt": "2025-10-05T13:46:51.604Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Login
```http
POST /users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "user": { ... },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Get Profile
```http
GET /users/profile
Authorization: Bearer YOUR_JWT_TOKEN
```

### Agents

#### Get All User Agents
```http
GET /agents
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "success": true,
  "agents": [
    {
      "id": "agent_123",
      "name": "NBA Top Shot Hunter",
      "description": "Finds undervalued moments",
      "userId": "user_123",
      "prompt": "Buy undervalued NBA moments under $50",
      "isActive": true,
      "performance": {
        "totalTrades": 47,
        "successfulTrades": 37,
        "totalProfit": 234.50,
        "winRate": 78.7
      },
      "settings": {
        "maxTradeAmount": 100,
        "riskTolerance": "medium",
        "tradingPairs": []
      },
      "createdAt": "2025-10-05T10:00:00Z",
      "updatedAt": "2025-10-05T13:47:07Z"
    }
  ]
}
```

#### Create Agent
```http
POST /agents
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "name": "My Trading Agent",
  "description": "Agent description",
  "prompt": "Trading strategy in natural language",
  "settings": {
    "maxTradeAmount": 100,
    "riskTolerance": "medium",
    "tradingPairs": ["NBA_TOP_SHOT"]
  }
}
```

#### Get Specific Agent
```http
GET /agents/:agentId
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Update Agent
```http
PUT /agents/:agentId
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description",
  "isActive": true
}
```

#### Delete Agent
```http
DELETE /agents/:agentId
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Execute Natural Language Command
```http
POST /agents/:agentId/command
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "command": "Buy undervalued NBA Top Shot moments under $50",
  "marketData": [] // optional
}
```

**Response:**
```json
{
  "success": true,
  "commands": [
    {
      "type": "buy",
      "parameters": {
        "nftId": "12345",
        "price": 45.50,
        "marketplaceAddress": "0x4bcadc785a64c7c8"
      },
      "confidence": 0.85,
      "reasoning": "Found undervalued NBA Top Shot moment matching your criteria"
    }
  ]
}
```

#### Execute Agent Command
```http
POST /agents/:agentId/execute
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "type": "buy",
  "parameters": {
    "nftId": "12345",
    "price": 45.50,
    "marketplaceAddress": "0x4bcadc785a64c7c8"
  },
  "confidence": 0.85,
  "reasoning": "Strategic purchase"
}
```

#### Get Agent Performance
```http
GET /agents/:agentId/performance
Authorization: Bearer YOUR_JWT_TOKEN
```

### Marketplace

#### Get NBA Top Shot Moments
```http
GET /marketplace/nba-topshot?limit=20&offset=0&minPrice=10&maxPrice=100&rarity=Common
```

#### Get NFL All Day Moments
```http
GET /marketplace/nfl-allday?limit=20&offset=0
```

#### Get Market Analytics
```http
GET /marketplace/analytics?timeframe=7d&collection=all
```

#### Search Marketplace
```http
GET /marketplace/search?q=lebron&limit=20
```

#### Get NFT Details
```http
GET /marketplace/nft/:id
```

### Flow Blockchain

#### Get Flow Actions
```http
GET /flow/actions
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Execute Flow Action
```http
POST /flow/actions/:actionId/execute
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "parameters": {
    "nftId": "12345",
    "price": 45.50
  }
}
```

#### Get Flow Account Info
```http
GET /flow/account
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Connect Flow Wallet
```http
POST /flow/connect
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "flowAddress": "0x1234567890abcdef"
}
```

#### Get Network Status
```http
GET /flow/network
```

#### Get Transaction History
```http
GET /flow/transactions?limit=20&offset=0
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Get Account Balance
```http
GET /flow/balance
Authorization: Bearer YOUR_JWT_TOKEN
```

## Error Responses

All endpoints return errors in this format:
```json
{
  "success": false,
  "error": "Error message",
  "message": "Detailed error message"
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Server Error

## Rate Limiting

- Rate limit: 100 requests per 15 minutes per IP
- Headers:
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Requests remaining
  - `X-RateLimit-Reset`: Time when limit resets

## Webhooks (Coming Soon)

Subscribe to events:
- Agent trade executed
- Performance milestone reached
- Market alert triggered
- Balance threshold crossed
