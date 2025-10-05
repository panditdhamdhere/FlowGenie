# FlowGenie

**AI Agent Marketplace for Flow Blockchain**

FlowGenie is a comprehensive platform that enables users to create, deploy, and manage AI-powered trading agents on the Flow blockchain. These agents can autonomously trade NFTs, manage portfolios, and execute DeFi strategies with natural language commands.

## 🚀 Features

### Core Functionality
- **AI Agent Creation**: Build custom trading agents with natural language instructions
- **Autonomous Trading**: Agents execute trades based on market conditions and user-defined strategies
- **Portfolio Management**: Automated portfolio balancing and risk management
- **NFT Trading**: Seamless integration with NBA Top Shot, NFL All Day, and other Flow-based NFT collections
- **DeFi Strategies**: Automated yield farming, liquidity provision, and token swaps

### Technical Features
- **Flow Actions Integration**: Atomic transactions using FLIP-338 Flow Actions
- **Scheduled Transactions**: Time-based automated trading strategies
- **Real-time Analytics**: Performance tracking and market analysis
- **Social Features**: Agent sharing and marketplace discovery
- **Risk Controls**: Built-in safety mechanisms and trading limits

## 🏗️ Architecture

### Frontend
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom components
- **State Management**: React Context API
- **UI Components**: Lucide React icons, Framer Motion animations
- **Blockchain Integration**: Flow FCL SDK

### Backend
- **Runtime**: Node.js with Express
- **Language**: TypeScript
- **AI Integration**: OpenAI GPT-4 for natural language processing
- **Blockchain**: Flow SDK for transaction management
- **Authentication**: JWT-based user authentication
- **Scheduling**: Node-cron for automated tasks

### Smart Contracts
- **Language**: Cadence
- **Contracts**:
  - `FlowGenieAgent.cdc`: Core agent management
  - `TradingActions.cdc`: Flow Actions for trading operations
  - `AgentMarketplace.cdc`: Agent discovery and sharing

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Flow CLI
- OpenAI API key (optional - demo mode available)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/flowgenie.git
   cd flowgenie
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Backend
   cp backend/env.example backend/.env
   # Edit backend/.env with your configuration
   
   # Frontend
   cp frontend/env.local.example frontend/.env.local
   # Edit frontend/.env.local with your configuration
   ```

4. **Start development servers**
   ```bash
   # Start backend (port 3001)
   cd backend && npm run dev
   
   # Start frontend (port 3000)
   cd frontend && npm run dev
   ```

## 🔧 Configuration

### Environment Variables

#### Backend (`backend/.env`)
```env
OPENAI_API_KEY=your_openai_api_key
FLOW_NETWORK=testnet
FLOW_ACCESS_NODE=https://rest-testnet.onflow.org
FLOW_CONTRACT_ADDRESS=0xyour_contract_address
JWT_SECRET=your_jwt_secret
PORT=3001
```

#### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_FLOW_NETWORK=testnet
```

### Flow Blockchain Setup

1. **Install Flow CLI**
   ```bash
   sh -ci "$(curl -fsSL https://storage.googleapis.com/flow-cli/install.sh)"
   ```

2. **Initialize Flow project**
   ```bash
   flow init
   ```

3. **Deploy contracts**
   ```bash
   chmod +x scripts/deploy.sh
   ./scripts/deploy.sh
   ```

## 🎯 Usage

### Creating an AI Agent

1. **Access the platform** at `http://localhost:3000`
2. **Connect your Flow wallet**
3. **Navigate to "Create Agent"**
4. **Define agent parameters**:
   - Name and description
   - Trading strategy and rules
   - Risk management settings
   - Supported NFT collections

### Natural Language Commands

Agents respond to natural language commands such as:
- "Buy undervalued NBA Top Shot moments under $50"
- "Sell my LeBron James moments if price increases 20%"
- "Analyze my portfolio and rebalance monthly"
- "Buy NFL All Day rookie cards every Tuesday"

### Agent Management

- **Monitor Performance**: Real-time analytics and trading history
- **Adjust Settings**: Modify trading parameters and risk controls
- **Schedule Strategies**: Set up recurring trading patterns
- **Share Agents**: Publish successful agents to the marketplace

## 🔒 Security

- **Atomic Transactions**: All trades use Flow Actions for safety
- **Risk Controls**: Built-in limits and circuit breakers
- **User Permissions**: Granular control over agent capabilities
- **Audit Trail**: Complete transaction history and logging

## 🧪 Development

### Project Structure
```
flowgenie/
├── frontend/              # Next.js React application
│   ├── src/
│   │   ├── app/          # App Router pages
│   │   ├── components/   # Reusable UI components
│   │   └── contexts/     # React context providers
├── backend/              # Node.js API server
│   ├── src/
│   │   ├── routes/       # API route handlers
│   │   ├── services/     # Business logic services
│   │   └── middleware/   # Express middleware
├── contracts/            # Cadence smart contracts
│   ├── FlowGenie/       # Core agent contracts
│   ├── FlowActions/     # Trading action contracts
│   └── Marketplace/     # Agent marketplace contracts
└── scripts/             # Deployment and utility scripts
```

### Available Scripts

```bash
# Development
npm run dev              # Start all services
npm run dev:frontend     # Start frontend only
npm run dev:backend      # Start backend only

# Building
npm run build            # Build all packages
npm run build:frontend   # Build frontend
npm run build:backend    # Build backend

# Testing
npm test                 # Run all tests
npm run test:frontend    # Test frontend
npm run test:backend     # Test backend

# Deployment
npm run deploy           # Deploy to production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Documentation**: [docs/](docs/)
- **Smart Contracts**: [contracts/](contracts/)
- **API Reference**: [backend/README.md](backend/README.md)
- **Flow Blockchain**: [https://flow.com](https://flow.com)
- **Flow FCL**: [https://docs.onflow.org/fcl](https://docs.onflow.org/fcl)

## 📞 Support

For questions, issues, or contributions:
- **Issues**: [GitHub Issues](https://github.com/your-username/flowgenie/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/flowgenie/discussions)
- **Discord**: [FlowGenie Community](https://discord.gg/flowgenie)

---

**Built with ❤️ for the Flow ecosystem**