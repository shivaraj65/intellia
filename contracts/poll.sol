// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Polls {
    struct Poll {
        string name;
        string description;
        string[] options;
        uint256[] votes;
        address creator;
        bool exists;
        mapping(address => bool) hasVoted;
        mapping(address => uint256) userVote; // maps voter to option index
    }

    mapping(string => Poll) private polls;
    mapping(address => string[]) private userPolls;
    uint256 public pollCount;

    /// @notice Create a new poll
    function createPoll(
        string calldata pollId,
        string calldata name,
        string calldata description,
        string[] calldata options
    ) external {
        require(options.length >= 2 && options.length <= 5, "Options must be 2-5");
        require(!polls[pollId].exists, "Poll already exists");

        Poll storage p = polls[pollId];
        p.name = name;
        p.description = description;
        p.creator = msg.sender;
        p.exists = true;

        for (uint i = 0; i < options.length; i++) {
            p.options.push(options[i]);
            p.votes.push(0);
        }

        userPolls[msg.sender].push(pollId);
        pollCount++;
    }

    /// @notice Vote on a poll option
    function vote(string calldata pollId, uint256 optionIndex) external {
        Poll storage p = polls[pollId];
        require(p.exists, "Poll does not exist");
        require(optionIndex < p.options.length, "Invalid option");
        require(!p.hasVoted[msg.sender], "Already voted");

        p.votes[optionIndex]++;
        p.hasVoted[msg.sender] = true;
        p.userVote[msg.sender] = optionIndex;
    }

    /// @notice Get poll metadata and vote counts
    function getPoll(string calldata pollId)
        external
        view
        returns (
            string memory name,
            string memory description,
            string[] memory options,
            uint256[] memory votes,
            address creator
        )
    {
        Poll storage p = polls[pollId];
        require(p.exists, "Poll not found");

        return (p.name, p.description, p.options, p.votes, p.creator);
    }

    /// @notice Get poll IDs created by a user
    function getPollsByUser(address user) external view returns (string[] memory) {
        return userPolls[user];
    }

    /// @notice Check if a user has voted in a poll and their selected option
    function getUserVote(string calldata pollId, address voter) external view returns (bool voted, uint256 optionIndex) {
        Poll storage p = polls[pollId];
        require(p.exists, "Poll not found");

        voted = p.hasVoted[voter];
        optionIndex = voted ? p.userVote[voter] : 0;
    }

    /// @notice Get total number of votes cast in a poll
    function getTotalVotes(string calldata pollId) external view returns (uint256 totalVotes) {
        Poll storage p = polls[pollId];
        require(p.exists, "Poll not found");

        for (uint i = 0; i < p.votes.length; i++) {
            totalVotes += p.votes[i];
        }
    }

    /// @notice Get total number of polls created
    function getTotalPolls() external view returns (uint256) {
        return pollCount;
    }
}
