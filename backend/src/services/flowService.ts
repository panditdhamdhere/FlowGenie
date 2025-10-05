import * as fcl from '@onflow/fcl';
import * as sdk from '@onflow/sdk';

export interface FlowConfig {
  network: string;
  accessNode: string;
  discoveryWallet: string;
}

export interface FlowAction {
  id: string;
  name: string;
  description: string;
  parameters: Record<string, any>;
  execute: (params: Record<string, any>) => Promise<any>;
}

export class FlowService {
  private static instance: FlowService;
  private config: FlowConfig;
  private actions: Map<string, FlowAction> = new Map();

  private constructor(config: FlowConfig) {
    this.config = config;
    this.initializeFlow();
  }

  public static getInstance(config?: FlowConfig): FlowService {
    if (!FlowService.instance) {
      // Use default config if none provided
      const defaultConfig: FlowConfig = {
        network: 'testnet',
        accessNode: 'https://rest-testnet.onflow.org',
        discoveryWallet: 'https://fcl-discovery.onflow.org/testnet/authn'
      };
      FlowService.instance = new FlowService(config || defaultConfig);
    }
    return FlowService.instance;
  }

  private initializeFlow(): void {
    fcl.config({
      'flow.network': this.config.network,
      'accessNode.api': this.config.accessNode,
      'discovery.wallet': this.config.discoveryWallet,
      'app.detail.title': 'FlowGenie AI Agent Marketplace',
      'app.detail.icon': 'https://flowgenie.com/icon.png',
    });

    // Register built-in Flow Actions
    this.registerBuiltInActions();
  }

  private registerBuiltInActions(): void {
    // NFT Purchase Action
    this.registerAction({
      id: 'nft_purchase',
      name: 'Purchase NFT',
      description: 'Purchase an NFT from a marketplace',
      parameters: {
        marketplaceAddress: 'string',
        nftId: 'string',
        price: 'number'
      },
      execute: this.executeNFTPurchase.bind(this)
    });

    // NFT Sale Action
    this.registerAction({
      id: 'nft_sale',
      name: 'List NFT for Sale',
      description: 'List an NFT for sale on a marketplace',
      parameters: {
        nftId: 'string',
        price: 'number',
        marketplaceAddress: 'string'
      },
      execute: this.executeNFTSale.bind(this)
    });

    // Portfolio Check Action
    this.registerAction({
      id: 'portfolio_check',
      name: 'Check Portfolio',
      description: 'Check current portfolio holdings',
      parameters: {
        userAddress: 'string',
        collectionAddress: 'string'
      },
      execute: this.executePortfolioCheck.bind(this)
    });

    // DeFi Action
    this.registerAction({
      id: 'defi_action',
      name: 'Execute DeFi Strategy',
      description: 'Execute a DeFi trading strategy',
      parameters: {
        strategy: 'string',
        amount: 'number',
        tokenAddress: 'string'
      },
      execute: this.executeDeFiAction.bind(this)
    });
  }

  public registerAction(action: FlowAction): void {
    this.actions.set(action.id, action);
  }

  public getAction(actionId: string): FlowAction | undefined {
    return this.actions.get(actionId);
  }

  public getAllActions(): FlowAction[] {
    return Array.from(this.actions.values());
  }

  private async executeNFTPurchase(params: Record<string, any>): Promise<any> {
    const { marketplaceAddress, nftId, price } = params;
    
    try {
      const transaction = await fcl.send([
        fcl.transaction(`
          import NonFungibleToken from 0x1d7e57aa55817448
          import TopShot from 0x0ea2b1c0df6d07531
          import TopShotMarket from 0x4bcadc785a64c7c8
          import FungibleToken from 0x7e60df042a9c0868
          import FlowToken from 0x7e60df042a9c0868

          transaction(marketplaceAddress: Address, nftId: UInt64, price: UFix64) {
            let paymentVault: &FlowToken.Vault{FungibleToken.Receiver}
            let topShotCollection: &TopShot.Collection{NonFungibleToken.CollectionPublic}
            let marketplace: &TopShotMarket.Marketplace

            prepare(acct: AuthAccount) {
              self.paymentVault = acct.getCapability(/public/flowTokenReceiver)
                .borrow<&FlowToken.Vault{FungibleToken.Receiver}>()
                ?? panic("Could not borrow payment vault")
              
              self.topShotCollection = acct.getCapability(/public/topshotCollection)
                .borrow<&TopShot.Collection{NonFungibleToken.CollectionPublic}>()
                ?? panic("Could not borrow TopShot collection")
              
              self.marketplace = getAccount(marketplaceAddress)
                .getCapability(/public/topshotMarket)
                .borrow<&TopShotMarket.Marketplace>()
                ?? panic("Could not borrow marketplace")
            }

            execute {
              self.marketplace.purchase(tokenID: nftId, price: price, recipient: self.topShotCollection)
            }
          }
        `),
        fcl.args([
          fcl.arg(marketplaceAddress, fcl.t.Address),
          fcl.arg(nftId, fcl.t.UInt64),
          fcl.arg(price, fcl.t.UFix64)
        ]),
        fcl.payer(fcl.authz),
        fcl.proposer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.limit(1000)
      ]);

      const result = await fcl.tx(transaction).onceSealed();
      return {
        success: true,
        transactionId: result.transactionId,
        nftId,
        price,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('NFT Purchase failed:', error);
      throw new Error(`NFT purchase failed: ${error}`);
    }
  }

  private async executeNFTSale(params: Record<string, any>): Promise<any> {
    const { nftId, price, marketplaceAddress } = params;
    
    try {
      const transaction = await fcl.send([
        fcl.transaction(`
          import NonFungibleToken from 0x1d7e57aa55817448
          import TopShot from 0x0ea2b1c0df6d07531
          import TopShotMarket from 0x4bcadc785a64c7c8

          transaction(marketplaceAddress: Address, nftId: UInt64, price: UFix64) {
            let topShotCollection: &TopShot.Collection{NonFungibleToken.Provider}
            let marketplace: &TopShotMarket.Marketplace

            prepare(acct: AuthAccount) {
              self.topShotCollection = acct.getCapability(/private/topshotCollection)
                .borrow<&TopShot.Collection{NonFungibleToken.Provider}>()
                ?? panic("Could not borrow TopShot collection")
              
              self.marketplace = getAccount(marketplaceAddress)
                .getCapability(/public/topshotMarket)
                .borrow<&TopShotMarket.Marketplace>()
                ?? panic("Could not borrow marketplace")
            }

            execute {
              self.marketplace.listForSale(tokenID: nftId, price: price)
            }
          }
        `),
        fcl.args([
          fcl.arg(marketplaceAddress, fcl.t.Address),
          fcl.arg(nftId, fcl.t.UInt64),
          fcl.arg(price, fcl.t.UFix64)
        ]),
        fcl.payer(fcl.authz),
        fcl.proposer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.limit(1000)
      ]);

      const result = await fcl.tx(transaction).onceSealed();
      return {
        success: true,
        transactionId: result.transactionId,
        nftId,
        price,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('NFT Sale failed:', error);
      throw new Error(`NFT sale failed: ${error}`);
    }
  }

  private async executePortfolioCheck(params: Record<string, any>): Promise<any> {
    const { userAddress, collectionAddress } = params;
    
    try {
      const script = await fcl.send([
        fcl.script(`
          import NonFungibleToken from 0x1d7e57aa55817448
          import TopShot from 0x0ea2b1c0df6d07531

          pub fun main(address: Address): [TopShot.MomentData] {
            let account = getAccount(address)
            let collection = account.getCapability(/public/topshotCollection)
              .borrow<&TopShot.Collection{NonFungibleToken.CollectionPublic}>()
              ?? panic("Could not borrow TopShot collection")
            
            let moments: [TopShot.MomentData] = []
            let ids = collection.getIDs()
            
            for id in ids {
              if let moment = collection.borrowMoment(id: id) {
                moments.append(moment.getData())
              }
            }
            
            return moments
          }
        `),
        fcl.args([fcl.arg(userAddress, fcl.t.Address)])
      ]);

      const result = await fcl.decode(script);
      return {
        success: true,
        portfolio: result,
        userAddress,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Portfolio check failed:', error);
      throw new Error(`Portfolio check failed: ${error}`);
    }
  }

  private async executeDeFiAction(params: Record<string, any>): Promise<any> {
    // Placeholder for DeFi strategy execution
    const { strategy, amount, tokenAddress } = params;
    
    return {
      success: true,
      strategy,
      amount,
      tokenAddress,
      timestamp: new Date().toISOString(),
      message: 'DeFi action executed successfully'
    };
  }

  public async executeAction(actionId: string, params: Record<string, any>): Promise<any> {
    const action = this.getAction(actionId);
    if (!action) {
      throw new Error(`Action ${actionId} not found`);
    }

    return await action.execute(params);
  }

  public async getUserFlowAddress(userId: string): Promise<string | null> {
    // In a real implementation, this would fetch from a database
    // For now, return a placeholder
    return null;
  }
}

export async function initializeFlow(): Promise<void> {
  const config: FlowConfig = {
    network: process.env.FLOW_NETWORK || 'testnet',
    accessNode: process.env.FLOW_ACCESS_NODE || 'https://rest-testnet.onflow.org',
    discoveryWallet: process.env.FLOW_DISCOVERY_WALLET || 'https://fcl-discovery.onflow.org/testnet/authn'
  };

  FlowService.getInstance(config);
  console.log('Flow blockchain service initialized');
}
