// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ReviewApp {
    struct Review {
        address reviewer;
        string message;
        uint256 rating;
        string timestamp;
    }

    struct ReviewTopic {
        string id;
        string title;
        string description;
        string imageURL;
        string externalLink;
        bool isDeleted;
        uint256 reviewCount;
        mapping(uint256 => Review) reviews;
        mapping(address => bool) hasReviewed;
        bool exists;
    }

    mapping(string => ReviewTopic) private reviewTopics;             // topicId => ReviewTopic
    mapping(string => address) private topicToOwner;                 // topicId => owner
    mapping(address => string[]) private userTopics;                 // user => topicId[]

    mapping(address => bool) private uniqueUsers;

    uint256 public totalTopics;
    uint256 public totalUsers;
    uint256 public totalReviews;

    /// @notice Create a new review topic
    function createReviewTopic(
        string calldata topicId,
        string calldata title,
        string calldata description,
        string calldata imageURL,
        string calldata externalLink
    ) external {
        require(!reviewTopics[topicId].exists, "Topic ID already exists");

        ReviewTopic storage topic = reviewTopics[topicId];
        topic.id = topicId;
        topic.title = title;
        topic.description = description;
        topic.imageURL = imageURL;
        topic.externalLink = externalLink;
        topic.exists = true;

        topicToOwner[topicId] = msg.sender;
        userTopics[msg.sender].push(topicId);
        totalTopics++;

        if (!uniqueUsers[msg.sender]) {
            uniqueUsers[msg.sender] = true;
            totalUsers++;
        }
    }

    /// @notice Leave a review on someone's topic
    function leaveReview(
        string calldata topicId,
        string calldata message,
        uint256 rating,
        string calldata timestamp
    ) external {
        require(reviewTopics[topicId].exists, "Review topic does not exist");
        require(!reviewTopics[topicId].isDeleted, "Topic has been deleted");
        require(!reviewTopics[topicId].hasReviewed[msg.sender], "Already reviewed");

        ReviewTopic storage topic = reviewTopics[topicId];

        topic.reviews[topic.reviewCount] = Review({
            reviewer: msg.sender,
            message: message,
            rating: rating,
            timestamp: timestamp
        });

        topic.reviewCount++;
        topic.hasReviewed[msg.sender] = true;
        totalReviews++;
    }

    /// @notice Check if a user has reviewed a topic
    function hasReviewed(string calldata topicId, address user) external view returns (bool) {
        require(reviewTopics[topicId].exists, "Topic does not exist");
        return reviewTopics[topicId].hasReviewed[user];
    }

    /// @notice Get all topic IDs for a given user
    function getMyTopicIds(address user) external view returns (string[] memory) {
        return userTopics[user];
    }

    /// @notice Get metadata for a topic (only creator can view)
    function getTopicDetails(string calldata topicId)
        external
        view
        returns (
            string memory id,
            string memory title,
            string memory description,
            string memory imageURL,
            string memory externalLink,
            bool isDeleted,
            uint256 reviewCount
        )
    {
        require(reviewTopics[topicId].exists, "Topic does not exist");
        ReviewTopic storage topic = reviewTopics[topicId];

        return (
            topic.id,
            topic.title,
            topic.description,
            topic.imageURL,
            topic.externalLink,
            topic.isDeleted,
            topic.reviewCount
        );
    }

    /// @notice Get a specific review from your topic
    function getTopicReview(string calldata topicId, uint256 index)
        external
        view
        returns (
            address reviewer,
            string memory message,
            uint256 rating,
            string memory timestamp
        )
    {
        require(reviewTopics[topicId].exists, "Topic does not exist");
        ReviewTopic storage topic = reviewTopics[topicId];
        require(index < topic.reviewCount, "Invalid review index");

        Review storage r = topic.reviews[index];
        return (r.reviewer, r.message, r.rating, r.timestamp);
    }

    /// @notice Soft delete your topic
    function deleteTopic(string calldata topicId) external {
        require(topicToOwner[topicId] == msg.sender, "Not your topic");
        reviewTopics[topicId].isDeleted = true;
    }

    /// @notice Get app-level metrics
    function getAppMetrics()
        external
        view
        returns (
            uint256 totalCreatedTopics,
            uint256 totalRegisteredUsers,
            uint256 totalSubmittedReviews
        )
    {
        return (totalTopics, totalUsers, totalReviews);
    }

    /// @notice Get owner of a topic
    function getTopicOwner(string calldata topicId) external view returns (address) {
        require(reviewTopics[topicId].exists, "Topic not found");
        return topicToOwner[topicId];
    }
}
