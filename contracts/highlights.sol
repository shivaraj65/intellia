// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Highlights {
    struct Message {
        address sender;
        string text;
        string icon; 
        uint256 timestamp;
    }

    struct Highlight {
        string name;
        string description;
        string icon;
        address creator;
        Message[] messages;
        uint256 nextIndex; 
        bool exists;
    }

    mapping(address => Highlight) private highlights;
    address[] private highlightUsers;

    uint256 private totalMessages;
    uint256 private totalUsers;

    /// @notice Create a new highlight (one per user)
    function createHighlight(
        string calldata name,
        string calldata description,
        string calldata icon
    ) external {
        Highlight storage highlight = highlights[msg.sender];

        // Only add to highlightUsers on first creation
        if (!highlight.exists) {
            highlightUsers.push(msg.sender);
            totalUsers++;
            highlight.exists = true;
        }
        // Always (re)set all fields
        highlights[msg.sender].name = name;
        highlights[msg.sender].description = description;
        highlights[msg.sender].icon = icon;
        highlights[msg.sender].creator = msg.sender;
        highlights[msg.sender].nextIndex = 0;
        highlights[msg.sender].exists = true;
        delete highlight.messages; 

        highlightUsers.push(msg.sender);        
    }

    /// @notice View a user's highlight
    function viewHighlight(address user)
        external
        view
        returns (
            string memory name,
            string memory description,
            string memory icon,
            Message[] memory messages
        )
    {
        require(highlights[user].exists, "Highlight does not exist");

        Highlight storage h = highlights[user];
        return (h.name, h.description, h.icon, h.messages);
    }

    /// @notice Write a message on someone else's highlight
    function writeMessage(address to, string calldata messageText, string calldata icon) external {
        require(highlights[to].exists, "Highlight not found");
        require(to != msg.sender, "Can't message your own highlight");

        Message memory newMessage = Message({
            sender: msg.sender,
            text: messageText,
            icon:icon,
            timestamp: block.timestamp
        });

        Highlight storage h = highlights[to];

        if (h.messages.length < 10) {
            h.messages.push(newMessage);
        } else {
            h.messages[h.nextIndex] = newMessage;
        }

        h.nextIndex = (h.nextIndex + 1) % 10;
        totalMessages++;
    }


    /// @notice Get total usage statistics
    function getStats() external view returns (uint256 messagesSent, uint256 usersCreated) {
        return (totalMessages, totalUsers);
    }
}
