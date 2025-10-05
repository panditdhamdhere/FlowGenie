import OpenAI from 'openai';
import { FlowService } from './flowService';

export interface Agent {
  id: string;
  name: string;
  description: string;
  userId: string;
  prompt: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  performance: AgentPerformance;
  settings: AgentSettings;
}

export interface AgentPerformance {
  totalTrades: number;
  successfulTrades: number;
  totalProfit: number;
  winRate: number;
  lastTradeAt?: Date;
}

export interface AgentSettings {
  maxTradeAmount: number;
  riskTolerance: 'low' | 'medium' | 'high';
  tradingPairs: string[];
  schedule?: {
    enabled: boolean;
    interval: string; // cron expression
    lastExecuted?: Date;
  };
}

export interface AgentCommand {
  type: 'buy' | 'sell' | 'analyze' | 'schedule' | 'stop';
  parameters: Record<string, any>;
  confidence: number;
  reasoning: string;
}

export interface MarketData {
  nftId: string;
  name: string;
  price: number;
  rarity: string;
  series: string;
  set: string;
  marketplace: string;
  lastSale?: {
    price: number;
    date: Date;
  };
}

export class AIAgentService {
  private static instance: AIAgentService;
  private openai: OpenAI;
  private flowService: FlowService;
  private agents: Map<string, Agent> = new Map();

  private constructor() {
    // Initialize OpenAI with a mock API key for demo purposes
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'demo-api-key',
    });
    // FlowService will be initialized lazily when needed
    this.flowService = null as any;
  }

  public static getInstance(): AIAgentService {
    if (!AIAgentService.instance) {
      AIAgentService.instance = new AIAgentService();
    }
    return AIAgentService.instance;
  }

  private getFlowService(): FlowService {
    if (!this.flowService) {
      this.flowService = FlowService.getInstance();
    }
    return this.flowService;
  }

  public async createAgent(
    userId: string,
    name: string,
    description: string,
    prompt: string,
    settings: Partial<AgentSettings> = {}
  ): Promise<Agent> {
    const agent: Agent = {
      id: this.generateAgentId(),
      name,
      description,
      userId,
      prompt,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      performance: {
        totalTrades: 0,
        successfulTrades: 0,
        totalProfit: 0,
        winRate: 0
      },
      settings: {
        maxTradeAmount: 100,
        riskTolerance: 'medium',
        tradingPairs: [],
        ...settings
      }
    };

    this.agents.set(agent.id, agent);
    return agent;
  }

  public async processNaturalLanguageCommand(
    agentId: string,
    command: string,
    marketData?: MarketData[]
  ): Promise<AgentCommand[]> {
    const agent = this.agents.get(agentId);
    if (!agent) {
      throw new Error(`Agent ${agentId} not found`);
    }

    // Mock AI response for demo purposes
    return this.generateMockAIResponse(command, agent);
  }

  private generateMockAIResponse(command: string, agent: Agent): AgentCommand[] {
    const lowerCommand = command.toLowerCase();
    
    // Simple keyword-based mock responses
    if (lowerCommand.includes('buy') && (lowerCommand.includes('nba') || lowerCommand.includes('topshot'))) {
      return [{
        type: 'buy',
        parameters: {
          nftId: '12345',
          price: 45.50,
          marketplaceAddress: '0x4bcadc785a64c7c8'
        },
        confidence: 0.85,
        reasoning: 'Found undervalued NBA Top Shot moment matching your criteria. Current market price is favorable.'
      }];
    }
    
    if (lowerCommand.includes('sell') && lowerCommand.includes('nft')) {
      return [{
        type: 'sell',
        parameters: {
          nftId: '67890',
          price: 125.00,
          marketplaceAddress: '0x4bcadc785a64c7c8'
        },
        confidence: 0.75,
        reasoning: 'Current market conditions suggest this is a good time to sell for profit.'
      }];
    }
    
    if (lowerCommand.includes('analyze') || lowerCommand.includes('portfolio')) {
      return [{
        type: 'analyze',
        parameters: {
          userAddress: '0x1234567890abcdef',
          collectionAddress: '0x0ea2b1c0df6d07531'
        },
        confidence: 0.90,
        reasoning: 'Analyzing your portfolio for optimization opportunities.'
      }];
    }
    
    if (lowerCommand.includes('schedule') || lowerCommand.includes('recurring')) {
      return [{
        type: 'schedule',
        parameters: {
          interval: '0 9 * * *', // Daily at 9 AM
          action: 'buy',
          amount: 50
        },
        confidence: 0.80,
        reasoning: 'Setting up automated recurring trades based on your preferences.'
      }];
    }
    
    // Default response
    return [{
      type: 'analyze',
      parameters: {
        userAddress: '0x1234567890abcdef',
        collectionAddress: '0x0ea2b1c0df6d07531'
      },
      confidence: 0.70,
      reasoning: 'Analyzing market conditions and your portfolio to determine best course of action.'
    }];
  }

  private buildSystemPrompt(agent: Agent, marketData?: MarketData[]): string {
    const flowActions = this.getFlowService().getAllActions();
    const availableActions = flowActions.map(action => 
      `- ${action.id}: ${action.description} (parameters: ${JSON.stringify(action.parameters)})`
    ).join('\n');

    const marketContext = marketData ? 
      `Current market data:\n${marketData.map(item => 
        `- ${item.name} (ID: ${item.nftId}): $${item.price} (${item.rarity}, ${item.series})`
      ).join('\n')}` : 
      'No current market data available';

    return `You are FlowGenie, an AI agent for trading NFTs and managing portfolios on the Flow blockchain.

Agent Profile:
- Name: ${agent.name}
- Description: ${agent.description}
- Risk Tolerance: ${agent.settings.riskTolerance}
- Max Trade Amount: $${agent.settings.maxTradeAmount}
- Custom Prompt: ${agent.prompt}

Available Flow Actions:
${availableActions}

${marketContext}

Your task is to analyze user commands and generate appropriate trading actions. Always consider:
1. Risk management and position sizing
2. Market conditions and trends
3. Agent's performance history
4. User's risk tolerance

Respond with a JSON array of actions in this format:
[
  {
    "type": "buy|sell|analyze|schedule|stop",
    "parameters": {...},
    "confidence": 0.0-1.0,
    "reasoning": "explanation of decision"
  }
]

Be conservative with trades and always provide clear reasoning for your decisions.`;
  }

  private parseAIResponse(response: string): AgentCommand[] {
    try {
      // Extract JSON from response (handle cases where AI adds extra text)
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response');
      }

      const commands = JSON.parse(jsonMatch[0]);
      
      // Validate command structure
      return commands.map((cmd: any) => ({
        type: cmd.type,
        parameters: cmd.parameters || {},
        confidence: Math.max(0, Math.min(1, cmd.confidence || 0.5)),
        reasoning: cmd.reasoning || 'No reasoning provided'
      }));
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      throw new Error('Invalid AI response format');
    }
  }

  public async executeAgentCommand(
    agentId: string,
    command: AgentCommand
  ): Promise<any> {
    const agent = this.agents.get(agentId);
    if (!agent) {
      throw new Error(`Agent ${agentId} not found`);
    }

    try {
      let result;
      
      switch (command.type) {
        case 'buy':
          result = await this.executeBuyCommand(agent, command.parameters);
          break;
        case 'sell':
          result = await this.executeSellCommand(agent, command.parameters);
          break;
        case 'analyze':
          result = await this.executeAnalyzeCommand(agent, command.parameters);
          break;
        case 'schedule':
          result = await this.executeScheduleCommand(agent, command.parameters);
          break;
        case 'stop':
          result = await this.executeStopCommand(agent, command.parameters);
          break;
        default:
          throw new Error(`Unknown command type: ${command.type}`);
      }

      // Update agent performance
      this.updateAgentPerformance(agentId, command, result);

      return result;
    } catch (error) {
      console.error(`Command execution failed for agent ${agentId}:`, error);
      throw error;
    }
  }

  private async executeBuyCommand(
    agent: Agent,
    parameters: Record<string, any>
  ): Promise<any> {
    const { nftId, price, marketplaceAddress } = parameters;
    
    if (!nftId || !price || !marketplaceAddress) {
      throw new Error('Missing required parameters for buy command');
    }

    if (price > agent.settings.maxTradeAmount) {
      throw new Error(`Price ${price} exceeds max trade amount ${agent.settings.maxTradeAmount}`);
    }

    return await this.getFlowService().executeAction('nft_purchase', {
      marketplaceAddress,
      nftId,
      price
    });
  }

  private async executeSellCommand(
    agent: Agent,
    parameters: Record<string, any>
  ): Promise<any> {
    const { nftId, price, marketplaceAddress } = parameters;
    
    if (!nftId || !price || !marketplaceAddress) {
      throw new Error('Missing required parameters for sell command');
    }

    return await this.getFlowService().executeAction('nft_sale', {
      nftId,
      price,
      marketplaceAddress
    });
  }

  private async executeAnalyzeCommand(
    agent: Agent,
    parameters: Record<string, any>
  ): Promise<any> {
    const { userAddress, collectionAddress } = parameters;
    
    if (!userAddress) {
      throw new Error('Missing user address for analyze command');
    }

    return await this.getFlowService().executeAction('portfolio_check', {
      userAddress,
      collectionAddress: collectionAddress || '0x0ea2b1c0df6d07531' // TopShot default
    });
  }

  private async executeScheduleCommand(
    agent: Agent,
    parameters: Record<string, any>
  ): Promise<any> {
    // Implement scheduled transaction logic
    return {
      success: true,
      message: 'Scheduled transaction created',
      scheduleId: this.generateScheduleId(),
      parameters
    };
  }

  private async executeStopCommand(
    agent: Agent,
    parameters: Record<string, any>
  ): Promise<any> {
    agent.isActive = false;
    agent.updatedAt = new Date();
    
    return {
      success: true,
      message: 'Agent stopped successfully'
    };
  }

  private updateAgentPerformance(
    agentId: string,
    command: AgentCommand,
    result: any
  ): void {
    const agent = this.agents.get(agentId);
    if (!agent) return;

    agent.performance.totalTrades++;
    agent.performance.lastTradeAt = new Date();

    if (result.success) {
      agent.performance.successfulTrades++;
      if (result.profit) {
        agent.performance.totalProfit += result.profit;
      }
    }

    agent.performance.winRate = 
      agent.performance.totalTrades > 0 
        ? agent.performance.successfulTrades / agent.performance.totalTrades 
        : 0;

    agent.updatedAt = new Date();
  }

  public getAgent(agentId: string): Agent | undefined {
    return this.agents.get(agentId);
  }

  public getUserAgents(userId: string): Agent[] {
    return Array.from(this.agents.values()).filter(agent => agent.userId === userId);
  }

  public getAllAgents(): Agent[] {
    return Array.from(this.agents.values());
  }

  private generateAgentId(): string {
    return `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateScheduleId(): string {
    return `schedule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
