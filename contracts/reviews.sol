// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CampaignManager {
    struct Message {
        address user;
        string message;
        uint256 rating;
        string timestamp;
    }

    struct Campaign {
        string name;
        string description;
        uint256 messageCount;
        mapping(uint256 => Message) messages;
        bool exists;
    }

    mapping(address => Campaign) private campaigns;

    /// @notice Create a new campaign
    function addCampaign(
        string calldata name,
        string calldata description
    ) external {
        require(!campaigns[msg.sender].exists, "Campaign already exists");

        Campaign storage c = campaigns[msg.sender];
        c.name = name;
        c.description = description;
        c.exists = true;
    }

    /// @notice Add a message with rating and timestamp
    function addMessage(
        address campaignId,
        string calldata messageText,
        uint256 rating,
        string calldata timestamp
    ) external {
        require(campaigns[campaignId].exists, "Campaign not found");

        Campaign storage c = campaigns[campaignId];
        uint256 index = c.messageCount;

        c.messages[index] = Message({
            user: msg.sender,
            message: messageText,
            rating: rating,
            timestamp: timestamp
        });

        c.messageCount += 1;
    }

   /// @notice Get metadata of a campaign without any messages
    function getCampaignMeta(
        address campaignId
    ) external view returns (
        string memory name,
        string memory description,
        uint256 totalMessages
    ) {
        require(campaigns[campaignId].exists, "Campaign not found");

        Campaign storage c = campaigns[campaignId];
        return (c.name, c.description, c.messageCount);
    }

    /// @notice Get a specific message from a campaign by index
    function getCampaignMessage(
        address campaignId,
        uint256 messageIndex
    ) external view returns (
        address user,
        string memory message,
        uint256 rating,
        string memory timestamp
    ) {
        require(campaigns[campaignId].exists, "Campaign not found");

        Campaign storage c = campaigns[campaignId];
        require(messageIndex < c.messageCount, "Invalid message index");

        Message storage m = c.messages[messageIndex];
        return (m.user, m.message, m.rating, m.timestamp);
    }

}
