import React from "react";
import styles from "./pollAdmin.module.scss";
import { App, Button, Collapse, FloatButton, Progress, theme } from "antd";
import {
  CaretRightOutlined,
  CopyOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { svgConf } from "@/assets/svgConf";

interface Props {
  pollData: any[];
  floatingButtonAction: () => void;
}

const PollAdmin = ({ pollData = [], floatingButtonAction }: Props) => {
  const { token } = theme.useToken();

  const { message: antdMessage } = App.useApp();

  const panelStyle: React.CSSProperties = {
    marginBottom: 6,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const collapseDataCreator = (votes: any[], options: any[]) => {
    console.log("options", options);
    const data: any[] = options.map((option: string, index: number) => {
      return {
        key: "123" + option + index,
        label: (
          <div className="pollsLabel">
            <Progress
              className="flex1"
              percent={getVotePercentage(votes, index)}
              showInfo={false}
            />
            <span className="last">{votes[index]}</span>
          </div>
        ),
        children: <p>{option}</p>,
        style: panelStyle,
      };
    });
    return data;
  };

  const getVotePercentage = (votes: number[], index: number): number => {
    const total = votes.reduce((sum, vote) => sum + vote, 0);
    if (total === 0) return 0;
    return Math.round((votes[index] / total) * 100);
  };

  const getTotalVotes = (votes: number[]): number => {
    return votes.reduce((sum, vote) => sum + vote, 0);
  };

  return (
    <div className={styles.adminPage}>
      <h3 className={styles.title + " font1"}>Manage Your Polls</h3>
      <p className={styles.description + " font2"}>
        Browse through the polls you've published and check performance.
      </p>
      {pollData && pollData.length === 0 && (
        <div className={styles.emptyImage}>
          <Image
            src={svgConf.general.empty[5].src}
            alt={svgConf.general.empty[5].src}
            className={styles.image}
          />
          <p className={styles.imageText}>Empty space! Create a poll.</p>
        </div>
      )}
      {pollData &&
        pollData
          ?.slice()
          ?.reverse()
          .map((poll: any, index: number) => {
            return (
              <div key={poll.id + index} className={styles.pollCard}>
                <p className={styles.cardtitle + " font2"}>{poll.name}</p>
                <p className={styles.carddescription + " font2"}>
                  {poll.description}
                </p>
                <Collapse
                  bordered={false}
                  defaultActiveKey={["1"]}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  style={{ background: token.colorBgContainer }}
                  items={collapseDataCreator(poll.votes, poll.options)}
                />
                <span className={styles.footerWrapper}>
                  <p className={styles.total + " font2"}>
                    Total Votes <b>{getTotalVotes(poll.votes)}</b>
                  </p>
                  <span>
                    {index}{" "}
                    <Button
                      shape="circle"
                      type="dashed"
                      icon={<CopyOutlined />}
                      onClick={() => {
                        const url = `https://intellia-widgets.vercel.app/polls/${index}`;
                        navigator.clipboard
                          .writeText(url)
                          .then(() => {
                            antdMessage.open({
                              type: "success",
                              content: "Link copied to clipboard!",
                            });
                          })
                          .catch(() => {
                            antdMessage.open({
                              type: "warning",
                              content: "Failed to copy to clipboard!",
                            });
                          });
                      }}
                    />
                  </span>
                </span>
              </div>
            );
          })}
      <FloatButton
        icon={<PlusOutlined />}
        style={{ bottom: 12, right: 12 }}
        tooltip={<div>Create a new Poll</div>}
        onClick={() => {
          floatingButtonAction();
        }}
      />
    </div>
  );
};

export default React.memo(PollAdmin);
