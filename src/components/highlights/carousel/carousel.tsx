"use client";

import React, { useState } from "react";
import styles from "./carousel.module.scss";
import { Input, Button, Modal, Divider, Avatar, FloatButton, App } from "antd";
import { Carousel } from "antd";
// import { App } from "antd";
// import { imagesConf } from "@/assets/imagesConf";
// import Image from "next/image";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { svgConf } from "@/assets/svgConf";
import Image from "next/image";

const { TextArea } = Input;

interface props {
  txnLoading: boolean;
  HighlightData: any;
  blockchainFunctions: any;
}

const CarouselComp = ({
  txnLoading,
  HighlightData,
  blockchainFunctions,
}: props) => {
  const { message: antdMessage } = App.useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string>("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setSelectedIcon("");
    setMessage("");
    setIsModalOpen(false);    
  };

  const updateMessage = (valye: string) => {
    setMessage(valye);
  };

  return (
    <div className={styles.carouselComp}>
      <div className={styles.innerComp}>
        <Carousel
          className={styles.customCarousel}
          arrows={true}
          dotPosition={"left"}
          infinite={true}
          autoplay={{ dotDuration: true }}
          autoplaySpeed={10000}
          effect={"scrollx"}
          waitForAnimate={true}
        >
          {HighlightData &&
            HighlightData?.messages
              ?.slice()
              ?.reverse()
              ?.map((message: any, index: number) => {
                return (
                  <div className="messageCard" key={index + message}>
                    <header className={styles.questionComp}>
                      {HighlightData && HighlightData.name && (
                        <h3 className="font2">{HighlightData.name}</h3>
                      )}
                      {/* {HighlightData && HighlightData.description && (
                      <p className="font2">{HighlightData.description}</p>
                    )} */}
                    </header>

                    <section className="message font2">                      
                      {svgConf.highlights.map((icon, index) => {
                        if (icon.name === message.icon) {
                          return (
                            <div key={index} className="pigeon">
                              <Image
                                src={icon.src}
                                alt={icon.name} 
                                className={"displayimage"}
                              />
                               {message?.text}
                            </div>
                          );
                        }
                      })}                     
                      <Divider />
                      <Avatar
                        style={{ backgroundColor: "#8c64c8" }}
                        icon={<UserOutlined />}
                      />
                      {/* //sender */}
                      <span className="title">&nbsp; Anonymous User</span>
                    </section>
                  </div>
                );
              })}
        </Carousel>
        <FloatButton
          icon={<PlusOutlined />}
          style={{ bottom: 12, right: 12 }}
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
          <header className={styles.questionComp}>
            {HighlightData && HighlightData.name && (
              <h3 className="font2">{HighlightData.name}</h3>
            )}
            {HighlightData && HighlightData.description && (
              <p className="font2">{HighlightData.description}</p>
            )}
          </header>
          <div className={styles.imagecontainer}>
            <p className={styles.label + " font2"}>
              How Does This Memory Feel?
            </p>
            <div className={styles.iconContainer}>
              {svgConf.highlights.map((icon, index) => {
                return (
                  <div
                    className={
                      selectedIcon === icon.name
                        ? styles.selectedIconComp
                        : styles.iconComp
                    }
                    key={icon.name + index}
                    onClick={() => {
                      setSelectedIcon(icon.name);
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
          </div>
          {/* <Divider /> */}
          <span className={styles.label + " font2"}>Your Message :</span>
          <TextArea
            className={styles.inputCont}
            rows={3}
            showCount
            maxLength={400}
            value={message}
            onChange={(e) => {
              updateMessage(e.target.value);
            }}
            placeholder="Your highlight goes here..."
          />
          <Divider />
          <div className={styles.btnContainer}>
            <Button
              loading={txnLoading}
              className={styles.submitBtn}
              type="primary"
              shape="round"
              onClick={async () => {
                if (message.length > 0 && selectedIcon.length > 0) {
                  await blockchainFunctions.addMessage(message, selectedIcon);
                  handleCancel();
                } else {
                  if(message.length === 0){
                    antdMessage.open({
                      type: "warning",
                      content: "Please Enter a message to continue",
                    });
                  }else{
                    antdMessage.open({
                      type: "warning",
                      content: "Please select a image to continue",
                    });
                  }
                  
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

export default React.memo(CarouselComp);
