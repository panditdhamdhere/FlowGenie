// FlowGenie Agent Contract
// This contract manages AI agents and their trading permissions on Flow blockchain

import NonFungibleToken from 0x1d7e57aa55817448
import FungibleToken from 0x7e60df042a9c0868
import FlowToken from 0x7e60df042a9c0868

/// The FlowGenie Agent contract that manages AI trading agents
pub contract FlowGenieAgent: NonFungibleToken {

    // Agent data structure
    pub struct AgentData {
        pub let id: UInt64
        pub let name: String
        pub let description: String
        pub let owner: Address
        pub let isActive: Bool
        pub let maxTradeAmount: UFix64
        pub let riskTolerance: String
        pub let createdAt: UFix64
        pub let performance: AgentPerformance

        init(
            id: UInt64,
            name: String,
            description: String,
            owner: Address,
            maxTradeAmount: UFix64,
            riskTolerance: String
        ) {
            self.id = id
            self.name = name
            self.description = description
            self.owner = owner
            self.isActive = true
            self.maxTradeAmount = maxTradeAmount
            self.riskTolerance = riskTolerance
            self.createdAt = getCurrentBlock().timestamp
            self.performance = AgentPerformance()
        }
    }

    // Agent performance tracking
    pub struct AgentPerformance {
        pub var totalTrades: UInt64
        pub var successfulTrades: UInt64
        pub var totalProfit: UFix64
        pub var winRate: UFix64
        pub var lastTradeAt: UFix64?

        init() {
            self.totalTrades = 0
            self.successfulTrades = 0
            self.totalProfit = 0.0
            self.winRate = 0.0
            self.lastTradeAt = nil
        }
    }

    // Agent collection resource
    pub resource NFT: NonFungibleToken.INFT {
        pub let id: UInt64
        pub var data: AgentData

        init(id: UInt64, data: AgentData) {
            self.id = id
            self.data = data
        }

        pub fun getData(): AgentData {
            return self.data
        }

        pub fun updatePerformance(
            totalTrades: UInt64,
            successfulTrades: UInt64,
            totalProfit: UFix64,
            winRate: UFix64
        ) {
            self.data.performance.totalTrades = totalTrades
            self.data.performance.successfulTrades = successfulTrades
            self.data.performance.totalProfit = totalProfit
            self.data.performance.winRate = winRate
            self.data.performance.lastTradeAt = getCurrentBlock().timestamp
        }
    }

    // Agent collection resource
    pub resource Collection: NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic {
        pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

        init() {
            self.ownedNFTs <- {}
        }

        pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
            let nft <- self.ownedNFTs.remove(key: withdrawID)
                ?? panic("NFT not found in collection")
            return <-nft
        }

        pub fun deposit(token: @NonFungibleToken.NFT) {
            let nft <- token as! @FlowGenieAgent.NFT
            let id = nft.id
            let oldNFT <- self.ownedNFTs[id] <- nft
            destroy oldNFT
        }

        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
            return &self.ownedNFTs[id] as &NonFungibleToken.NFT
        }

        pub fun borrowAgent(id: UInt64): &AgentData {
            return &self.ownedNFTs[id]!.data
        }

        destroy() {
            destroy self.ownedNFTs
        }
    }

    // Factory resource for creating agents
    pub resource Factory {
        pub var nextAgentID: UInt64

        init() {
            self.nextAgentID = 1
        }

        pub fun createAgent(
            name: String,
            description: String,
            maxTradeAmount: UFix64,
            riskTolerance: String
        ): @NFT {
            let agentData = AgentData(
                id: self.nextAgentID,
                name: name,
                description: description,
                owner: self.owner?.address ?? panic("Factory not owned"),
                maxTradeAmount: maxTradeAmount,
                riskTolerance: riskTolerance
            )

            let agent = NFT(id: self.nextAgentID, data: agentData)
            self.nextAgentID = self.nextAgentID + 1

            return <-agent
        }
    }

    // Public paths
    pub let CollectionStoragePath: StoragePath
    pub let CollectionPublicPath: PublicPath
    pub let FactoryStoragePath: StoragePath

    // Initialize the contract
    init() {
        self.CollectionStoragePath = /storage/FlowGenieAgentCollection
        self.CollectionPublicPath = /public/FlowGenieAgentCollection
        self.FactoryStoragePath = /storage/FlowGenieAgentFactory

        // Create the factory
        let factory <- create Factory()
        self.account.save(<-factory, to: self.FactoryStoragePath)
    }

    // Create a new collection
    pub fun createEmptyCollection(): @Collection {
        return <-create Collection()
    }

    // Get the factory from storage
    pub fun getFactory(): &Factory {
        return self.account.borrow<&Factory>(from: self.FactoryStoragePath)
            ?? panic("Factory not found")
    }
}
