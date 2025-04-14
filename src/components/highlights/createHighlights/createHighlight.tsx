"use client";

import React, { useState } from "react";
import styles from "./createHighlights.module.scss";
import { Input, Button, Modal } from "antd";
import { App } from "antd";
import { imagesConf } from "@/assets/imagesConf";
import Image from "next/image";

interface props {
  blockchainFunctions: any;
}

const CreateHighlights = ({ blockchainFunctions }: props) => {
  const { message } = App.useApp();

  const [formDetails, setFormDetails] = useState<{
    name: string;
    description: string;
    icon: string;
  }>({
    name: "",
    description: "",
    icon: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // const sendNotification = () => {
  //   message.open({
  //     type: "info",
  //     content: "notification",
  //   });
  // };

  const validateFormDetails = (
    formDetails: { name: string; description: string; icon: string },
    returnStatusOnly = false
  ): boolean => {
    const { name, description, icon } = formDetails;

    if (returnStatusOnly) {
      return !!(name && description && icon);
    }

    if (!icon) {
      message.open({
        type: "warning",
        content: "Please select an icon.",
      });
    } else if (!name) {
      message.open({
        type: "warning",
        content: "Please enter a name.",
      });
    } else if (!description) {
      message.open({
        type: "warning",
        content: "Please provide a description.",
      });
    }

    return true;
  };

  return (
    <div className={styles.creatHighlights}>
      <div className={styles.createForm}>
        <h2 className={styles.createTitle}>Start a New Highlight</h2>
        <span className={styles.label + " font2"}>Icon :</span>
        <div className={styles.iconContainer}>
          {imagesConf.highlights.icons.map((icon, index) => {
            return (
              <div
                className={
                  formDetails.icon === icon.name
                    ? styles.selectedIconComp
                    : styles.iconComp
                }
                key={icon.name + index}
                onClick={() => {
                  setFormDetails({
                    ...formDetails,
                    icon: icon.name,
                  });
                }}
              >
                <Image
                  src={icon.src}
                  alt={icon.name}
                  className={styles.image}
                />
              </div>
            );
          })}
        </div>
        <span className={styles.label + " font2"}>Name :</span>
        <Input
          className={styles.input + " font1"}
          showCount
          maxLength={20}
          value={formDetails.name}
          onChange={(e) => {
            setFormDetails({
              ...formDetails,
              name: e.target.value,
            });
          }}
        />
        <span className={styles.label + " font2"}>Description :</span>
        <Input
          className={styles.input + " font1"}
          showCount
          maxLength={50}
          value={formDetails.description}
          onChange={(e) => {
            setFormDetails({
              ...formDetails,
              description: e.target.value,
            });
          }}
        />
        <Button
          className={styles.submitBtn}
          type="primary"
          shape="round"
          onClick={async () => {
            await validateFormDetails(formDetails, false);
            const isvalid = await validateFormDetails(formDetails, true);
            if (isvalid) {
              blockchainFunctions.createHighlights(
                formDetails.name,
                formDetails.description,
                formDetails.icon
              );
            }
          }}
          block
        >
          Create Highlights
        </Button>
      </div>
      <Modal
        title="Basic Modal"
        style={{ top: 20 }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <p>{formDetails.name}</p>
        <p>{formDetails.description}</p>
        <p>{formDetails.icon}</p>
      </Modal>
    </div>
  );
};

export default React.memo(CreateHighlights);
