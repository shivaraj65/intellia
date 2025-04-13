import React, { useState } from "react";
import styles from "./createHighlights.module.scss";
import { Input, Button, Modal } from "antd";
import { App } from 'antd';
import { imagesConf } from "@/assets/imagesConf";

const CreateHighlights = () => {
  const { message, notification } = App.useApp();

  const [formDetails, setFormDetails] = useState<{
    name: string;
    descriptions: string;
    icon: string;
  }>({
    name: "",
    descriptions: "",
    icon: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const sendNotification =( ) => {  
    // message.success('Good!');  
    message.open({
      type: "info",
      content: "notification",
    });
  }

  return (
    <div className={styles.creatHighlights}>
      <div className="createForm">
        <h2>create a new highlight</h2>
        <label>name :</label>
        <Input
          showCount
          maxLength={20}
          onChange={(e) => {
            console.log(e);
          }}
        />
        <label>description :</label>
        <Input
          showCount
          maxLength={20}
          onChange={(e) => {
            console.log(e);
          }}
        />
        <label>Icon :</label>
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
        <Button type="default" onClick={sendNotification}>
          notification test
        </Button>
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default React.memo(CreateHighlights);
