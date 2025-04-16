import React from "react";
import styles from "./adminPage.module.scss";
import {  Avatar,  FloatButton } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";

// const { TextArea } = Input;

interface Props {
  HighlightData: any;  
  buttonAction: any;
}
const AdminPage = ({
  HighlightData,  
  buttonAction,
}: Props) => {
  // const { message: antdMessage } = App.useApp();

  return (
    <div className={styles.adminPage}>
      {HighlightData && (
        <div className={styles.innerComp}>
          <header className={styles.questionComp}>
            {HighlightData && HighlightData.name && (
              <h3 className={styles.title + " font1"}>{HighlightData.name}</h3>
            )}
            {HighlightData && HighlightData.description && (
              <p className={styles.description + " font2"}>
                {HighlightData.description}
              </p>
            )}
          </header>
          <div className={styles.highlightsData}>
            {HighlightData?.messages
              ?.slice()
              ?.reverse()
              ?.map((message: any, index: number) => {
                return (
                  <div key={index + message} className={styles.messages}>
                    <section className={styles.message + " font2"}>
                      {message?.text}
                      <span className={styles.userCard}>
                        <Avatar
                          style={{ backgroundColor: "#8c64c8" }}
                          icon={<UserOutlined />}
                        />
                        <span className="title">&nbsp; Anonymous User</span>
                      </span>
                    </section>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      <FloatButton
        icon={<PlusOutlined />}
        style={{ bottom: 12, right: 12 }}
        tooltip={<div>Creating new highlight will replace existing one!</div>}
        onClick={() => {
          buttonAction();
        }}
      />
    </div>
  );
};

export default React.memo(AdminPage);
