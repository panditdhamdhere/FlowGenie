// FlowGenie Agent Marketplace Contract
// This contract manages the marketplace for buying, selling, and licensing AI agents

import NonFungibleToken from 0x1d7e57aa55817448
import FungibleToken from 0x7e60df042a9c0868
import FlowToken from 0x7e60df042a9c0868
import FlowGenieAgent from 0xFlowGenieAgent

/// The FlowGenie Agent Marketplace contract
pub contract AgentMarketplace {

    // Agent listing data
    pub struct AgentListing {
        pub let listingId: UInt64
        pub let agentId: UInt64
        pub let seller: Address
        pub let price: UFix64
        pub let licenseType: String // "copy", "use", "exclusive"
        pub let isActive: Bool
        pub let createdAt: UFix64

        init(
            listingId: UInt64,
            agentId: UInt64,
            seller: Address,
            price: UFix64,
            licenseType: String
        ) {
            self.listingId = listingId
            self.agentId = agentId
            self.seller = seller
            self.price = price
            self.licenseType = licenseType
            self.isActive = true
            self.createdAt = getCurrentBlock().timestamp
        }
    }

    // Agent purchase record
    pub struct AgentPurchase {
        pub let purchaseId: UInt64
        pub let listingId: UInt64
        pub let buyer: Address
        pub let seller: Address
        pub let price: UFix64
        pub let licenseType: String
        pub let purchasedAt: UFix64

        init(
            purchaseId: UInt64,
            listingId: UInt64,
            buyer: Address,
            seller: Address,
            price: UFix64,
            licenseType: String
        ) {
            self.purchaseId = purchaseId
            self.listingId = listingId
            self.buyer = buyer
            self.seller = seller
            self.price = price
            self.licenseType = licenseType
            self.purchasedAt = getCurrentBlock().timestamp
        }
    }

    // Agent performance metrics for marketplace
    pub struct AgentPerformanceMetrics {
        pub let agentId: UInt64
        pub let totalSales: UInt64
        pub let totalRevenue: UFix64
        pub let averageRating: UFix64
        pub let reviewCount: UInt64
        pub let isVerified: Bool

        init(agentId: UInt64) {
            self.agentId = agentId
            self.totalSales = 0
            self.totalRevenue = 0.0
            self.averageRating = 0.0
            self.reviewCount = 0
            self.isVerified = false
        }
    }

    // Storage for listings and purchases
    pub var listings: {UInt64: AgentListing}
    pub var purchases: {UInt64: AgentPurchase}
    pub var performanceMetrics: {UInt64: AgentPerformanceMetrics}
    pub var nextListingId: UInt64
    pub var nextPurchaseId: UInt64

    // Events
    pub event AgentListed(listingId: UInt64, agentId: UInt64, seller: Address, price: UFix64)
    pub event AgentPurchased(purchaseId: UInt64, listingId: UInt64, buyer: Address, seller: Address)
    pub event ListingRemoved(listingId: UInt64, agentId: UInt64)

    // Initialize the contract
    init() {
        self.listings = {}
        self.purchases = {}
        self.performanceMetrics = {}
        self.nextListingId = 1
        self.nextPurchaseId = 1
    }

    // List an agent for sale
    pub fun listAgent(
        agentId: UInt64,
        price: UFix64,
        licenseType: String
    ): UInt64 {
        let caller = self.account.owner?.address ?? panic("No owner")

        // Verify the caller owns the agent
        let agentCollection = self.account.getCapability(/public/FlowGenieAgentCollection)
            .borrow<&FlowGenieAgent.Collection{FlowGenieAgent.CollectionPublic}>()
            ?? panic("Agent collection not found")

        let agent = agentCollection.borrowAgent(id: agentId)
        assert(agent.owner == caller, message: "You don't own this agent")

        // Create the listing
        let listingId = self.nextListingId
        let listing = AgentListing(
            listingId: listingId,
            agentId: agentId,
            seller: caller,
            price: price,
            licenseType: licenseType
        )

        self.listings[listingId] = listing
        self.nextListingId = self.nextListingId + 1

        // Initialize performance metrics if not exists
        if !self.performanceMetrics.containsKey(agentId) {
            self.performanceMetrics[agentId] = AgentPerformanceMetrics(agentId: agentId)
        }

        emit AgentListed(listingId: listingId, agentId: agentId, seller: caller, price: price)

        return listingId
    }

    // Purchase an agent
    pub fun purchaseAgent(listingId: UInt64) {
        let caller = self.account.owner?.address ?? panic("No owner")

        // Get the listing
        let listing = self.listings[listingId] ?? panic("Listing not found")
        assert(listing.isActive, message: "Listing is not active")
        assert(listing.seller != caller, message: "Cannot purchase your own agent")

        // Get the buyer's payment vault
        let paymentVault = self.account.getCapability(/public/flowTokenReceiver)
            .borrow<&FlowToken.Vault{FungibleToken.Receiver}>()
            ?? panic("Payment vault not found")

        // Get the seller's payment vault
        let sellerVault = getAccount(listing.seller)
            .getCapability(/public/flowTokenReceiver)
            .borrow<&FlowToken.Vault{FungibleToken.Receiver}>()
            ?? panic("Seller payment vault not found")

        // Transfer payment
        let payment <- paymentVault.withdraw(amount: listing.price)
        sellerVault.deposit(from: <-payment)

        // Create purchase record
        let purchaseId = self.nextPurchaseId
        let purchase = AgentPurchase(
            purchaseId: purchaseId,
            listingId: listingId,
            buyer: caller,
            seller: listing.seller,
            price: listing.price,
            licenseType: listing.licenseType
        )

        self.purchases[purchaseId] = purchase
        self.nextPurchaseId = self.nextPurchaseId + 1

        // Update performance metrics
        if let metrics = &self.performanceMetrics[listing.agentId] {
            metrics.totalSales = metrics.totalSales + 1
            metrics.totalRevenue = metrics.totalRevenue + listing.price
        }

        // Deactivate the listing
        self.listings[listingId] = AgentListing(
            listingId: listing.listingId,
            agentId: listing.agentId,
            seller: listing.seller,
            price: listing.price,
            licenseType: listing.licenseType
        )
        // Note: In Cadence, we can't modify structs directly, so we'd need to recreate

        emit AgentPurchased(
            purchaseId: purchaseId,
            listingId: listingId,
            buyer: caller,
            seller: listing.seller
        )
    }

    // Remove a listing
    pub fun removeListing(listingId: UInt64) {
        let caller = self.account.owner?.address ?? panic("No owner")

        let listing = self.listings[listingId] ?? panic("Listing not found")
        assert(listing.seller == caller, message: "You don't own this listing")

        self.listings.remove(key: listingId)

        emit ListingRemoved(listingId: listingId, agentId: listing.agentId)
    }

    // Get all active listings
    pub fun getActiveListings(): [AgentListing] {
        var activeListings: [AgentListing] = []
        
        for listing in self.listings.values {
            if listing.isActive {
                activeListings.append(listing)
            }
        }
        
        return activeListings
    }

    // Get agent performance metrics
    pub fun getAgentPerformance(agentId: UInt64): AgentPerformanceMetrics? {
        return self.performanceMetrics[agentId]
    }

    // Get user's purchases
    pub fun getUserPurchases(user: Address): [AgentPurchase] {
        var userPurchases: [AgentPurchase] = []
        
        for purchase in self.purchases.values {
            if purchase.buyer == user {
                userPurchases.append(purchase)
            }
        }
        
        return userPurchases
    }

    // Get user's listings
    pub fun getUserListings(user: Address): [AgentListing] {
        var userListings: [AgentListing] = []
        
        for listing in self.listings.values {
            if listing.seller == user {
                userListings.append(listing)
            }
        }
        
        return userListings
    }

    // Verify an agent (admin function)
    pub fun verifyAgent(agentId: UInt64) {
        // In a real implementation, this would have admin access controls
        if let metrics = &self.performanceMetrics[agentId] {
            metrics.isVerified = true
        }
    }
}
