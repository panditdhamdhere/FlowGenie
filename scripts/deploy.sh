#!/bin/bash

# FlowGenie Deployment Script
# This script deploys the FlowGenie contracts to Flow blockchain

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
NETWORK=${FLOW_NETWORK:-testnet}
CONTRACTS_DIR="contracts"
DEPLOYMENT_DIR="deployments"

echo -e "${BLUE}🚀 FlowGenie Deployment Script${NC}"
echo -e "${BLUE}Network: ${NETWORK}${NC}"
echo ""

# Check if Flow CLI is installed
if ! command -v flow &> /dev/null; then
    echo -e "${RED}❌ Flow CLI not found. Please install it first.${NC}"
    echo "Visit: https://docs.onflow.org/flow-cli/install/"
    exit 1
fi

# Check if we're logged in to Flow
if ! flow auth list | grep -q "Active"; then
    echo -e "${YELLOW}⚠️  No active Flow account. Please login first.${NC}"
    echo "Run: flow auth login"
    exit 1
fi

# Create deployment directory
mkdir -p $DEPLOYMENT_DIR

echo -e "${BLUE}📦 Preparing contracts for deployment...${NC}"

# Deploy FlowGenieAgent contract
echo -e "${YELLOW}Deploying FlowGenieAgent contract...${NC}"
flow accounts create --key $FLOW_PUBLIC_KEY --signer flowgenie-account
flow project deploy --network $NETWORK

# Deploy TradingActions contract
echo -e "${YELLOW}Deploying TradingActions contract...${NC}"
flow project deploy --network $NETWORK

# Deploy AgentMarketplace contract
echo -e "${YELLOW}Deploying AgentMarketplace contract...${NC}"
flow project deploy --network $NETWORK

echo -e "${GREEN}✅ All contracts deployed successfully!${NC}"

# Generate contract addresses file
echo -e "${BLUE}📝 Generating contract addresses...${NC}"
cat > $DEPLOYMENT_DIR/contracts.json << EOF
{
  "network": "$NETWORK",
  "contracts": {
    "FlowGenieAgent": {
      "address": "$(flow accounts get flowgenie-account --network $NETWORK | grep Address | cut -d' ' -f2)",
      "name": "FlowGenieAgent"
    },
    "TradingActions": {
      "address": "$(flow accounts get trading-actions-account --network $NETWORK | grep Address | cut -d' ' -f2)",
      "name": "TradingActions"
    },
    "AgentMarketplace": {
      "address": "$(flow accounts get marketplace-account --network $NETWORK | grep Address | cut -d' ' -f2)",
      "name": "AgentMarketplace"
    }
  },
  "deployedAt": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "deployedBy": "$(flow auth list | grep Active | cut -d' ' -f2)"
}
EOF

echo -e "${GREEN}✅ Contract addresses saved to $DEPLOYMENT_DIR/contracts.json${NC}"

# Setup initial accounts and permissions
echo -e "${BLUE}🔧 Setting up initial accounts and permissions...${NC}"

# Create service account for the platform
flow accounts create --key $FLOW_SERVICE_KEY --signer flowgenie-service

echo -e "${GREEN}✅ FlowGenie deployment completed successfully!${NC}"
echo ""
echo -e "${BLUE}📋 Next Steps:${NC}"
echo "1. Update your .env files with the contract addresses"
echo "2. Initialize the marketplace with seed data"
echo "3. Test the contracts with the test suite"
echo "4. Deploy the frontend and backend applications"
echo ""
echo -e "${BLUE}📄 Contract addresses saved to: $DEPLOYMENT_DIR/contracts.json${NC}"
