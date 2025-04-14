/**
 * component for the empty content
 * when DApp is available and no content exists
 */

import React, { useState } from "react";
import styles from "./emptyContent.module.scss";
import Image from "next/image";
import {
  Button,
  Divider,
  FloatButton,
  Input,
  Modal,
  message as antdMessage,
} from "antd";
import { svgConf } from "@/assets/svgConf";
import { PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;

interface props {
  message: string;
  title: string;
  buttonText: string;
  blockchainFunctions: any;
}

const NoContent = ({
  title = "",
  message = "",
  buttonText = "",
  blockchainFunctions,
}: props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setMessages("");
    setIsModalOpen(false);
  };

  const updateMessage = (valye: string) => {
    setMessages(valye);
  };
  return (
    <div className={`${styles.emptyscreen} primaryText`}>
      <div className={styles.errorRow}>
        <div className={styles.errorCol1}>
          <div className={styles.imageContainer}>
            <Image
              src={svgConf.general?.empty?.[0]?.src}
              alt={svgConf.general?.empty?.[0]?.name}
              className={styles.image}
            />
          </div>
        </div>
        <div className={styles.errorCol2}>
          <div className={styles.displayContent}>
            <h2 className={styles.displayContentInfo + " title"}>{title}</h2>
            <div className={`${styles.errorCard} font1`}>
              <p className={styles.displayContentText}>{message}</p>
            </div>
            <div className={styles.btnContainer}>
              <Button
                className={styles.actionBtn + " font2"}
                type={"default"}
                size="large"
                block
                shape="round"
                onClick={() => {
                  showModal();
                }}
              >
                {buttonText}
              </Button>
            </div>
          </div>
        </div>
        <FloatButton
          icon={<PlusOutlined />}
          style={{bottom:12,right:12}}
          tooltip={<div>Add Your Highlight</div>}
          onClick={() => {
            showModal();
          }}
        />
      </div>

      <Modal
        className={styles.addHighlightModal}
        title="Create a Highlight"
        style={{ top: 20 }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className={styles.container}>
          <span className={styles.label + " font2"}>Your Message :</span>
          <TextArea
            className={styles.inputCont}
            rows={3}
            showCount
            maxLength={400}
            value={messages}
            onChange={(e: any) => {
              updateMessage(e.target.value);
            }}
            placeholder="Your highlight goes here..."
          />
          <Divider />
          <div className={styles.btnContainer}>
            <Button
              className={styles.submitBtn}
              type="primary"
              shape="round"
              onClick={async () => {
                if (messages.length > 0) {
                  await blockchainFunctions.addMessage(messages);
                } else {
                  antdMessage.open({
                    type: "warning",
                    content: "Please Enter a message to continue",
                  });
                }
              }}
            >
              Submit
            </Button>
            <Button
              className={styles.submitBtn}
              type="default"
              shape="round"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default React.memo(NoContent);
