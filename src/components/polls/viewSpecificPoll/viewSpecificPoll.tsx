import React from "react";
import styles from "./viewPoll.module.scss";
import { App, Spin } from "antd";

interface Props {
  loading: boolean;
  pollData: any;
  isUserVoted: any;
  blockchainFunctions: any;
}

const ViewPoll = ({
  loading,
  pollData,
  isUserVoted,
  blockchainFunctions,
}: Props) => {
  const { message: antdMessage } = App.useApp();

  const getTotalVotes = () => {
    return pollData.votes.reduce((a: number, b: number) => a + b, 0);
  };

  const vote = async (optionsIndex: number) => {
    await blockchainFunctions.vote(pollData.id, optionsIndex);
  };

  return (
    <div className={styles.viewPollPage}>
      <div className={styles.pollCard}>
        <Spin spinning={loading} fullscreen />
        <p className={styles.cardtitle + " font2"}>{pollData.name}</p>
        <p className={styles.carddescription + " font2"}>
          {pollData.description}
        </p>
        <div className={styles.optionsContainer}>
          {pollData.options.map((option: string, index: number) => {
            const totalVotes = pollData.votes.reduce(
              (a: number, b: number) => a + b,
              0
            );
            const optionVotes = pollData.votes[index];
            const percentage =
              totalVotes > 0 ? (optionVotes / totalVotes) * 100 : 0;
            return (
              <div
                key={option + "_" + index}
                className={styles.optionWrapper}
                onClick={() => {
                  if (!isUserVoted.isvoted) {
                    vote(index);
                  } else {
                    antdMessage.open({
                      type: "info",
                      content: "You have aleady Voted!",
                    });
                  }
                }}
              >
                {isUserVoted.isvoted && (
                  <div
                    className={
                      isUserVoted.option === index
                        ? styles.userSelectedOptBg
                        : styles.optionBackground
                    }
                    style={{ width: `${percentage}%` }}
                  ></div>
                )}

                <span className={styles.optionText}>
                  {option}
                  {isUserVoted.isvoted && (
                    <span className={styles.votePercentage}>
                      {Math.round(percentage)}%
                    </span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
        <p className={styles.total + " font1"}>
          Total Votes - <b>{getTotalVotes()}</b>
        </p>
      </div>
    </div>
  );
};

export default React.memo(ViewPoll);
