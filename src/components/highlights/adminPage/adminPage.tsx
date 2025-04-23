import React from "react";
import styles from "./adminPage.module.scss";
import { Avatar, FloatButton } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { svgConf } from "@/assets/svgConf";
import Image from "next/image";

// const { TextArea } = Input;

interface Props {
  HighlightData: any;
  buttonAction: any;
}
const AdminPage = ({ HighlightData, buttonAction }: Props) => {
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
                      {svgConf.highlights.map((icon, index) => {
                        if (icon.name === message?.icon) {
                          return (
                            <div key={index} className={styles.pigeon}>
                              <Image
                                src={icon.src}
                                alt={icon.name}
                                className={styles.displayimage}
                              />
                              {message?.text}
                            </div>
                          );
                        }
                      })}                      
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
            {HighlightData?.messages.length === 0 && (
              <div
                style={{
                  width: "90%",
                  minHeight: "200px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "1rem",
                  color: "#555",
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  backgroundColor: "#f9f9f9",
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                  margin:"auto",
                  marginTop: "2rem",
                }}
              >
                <span>
                  ✨ Your highlight space is ready! Now just sit back — others
                  will start posting soon.
                </span>
              </div>
            )}
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
