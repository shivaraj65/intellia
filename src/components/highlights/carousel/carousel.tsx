"use client";

import React, { useState } from "react";
import styles from "./carousel.module.scss";
import { Input, Button, Modal, Divider, Avatar, FloatButton } from "antd";
import { Carousel } from "antd";
// import { App } from "antd";
// import { imagesConf } from "@/assets/imagesConf";
// import Image from "next/image";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const sampleMessage = [
  "I’ve used dozens of apps in this space, but Intellia stands out with its sleek UI and fast performance. The icon selection is surprisingly smooth — a small touch, but it shows attention to UX. I also like how intuitive the form validation is. Small things like that keep the flow uninterrupted. Would love to see more automation or keyboard shortcuts in future updates.",
  "I don’t usually get excited about apps, but Intellia feels really modern and easy to use. I was able to set up my highlights super quickly without any confusion. The notifications help when I forget stuff, and the layout is clean. Definitely not overwhelming like some other apps I've tried!",
  "As someone who handles a team, Intellia is surprisingly effective for keeping things structured. The form setup for highlights allows us to log key wins or updates weekly. It's minimal yet purposeful — and the icon selection makes entries visually identifiable, which is great when scanning through logs.",
  "Visually, Intellia has great potential. The card-based layout for selecting icons and the way highlights are presented feels polished and aesthetic. I’d love to see more customization in color themes or icon packs to match different brand vibes. But overall, it’s slick and satisfying to use.",
];

const CarouselComp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
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
          autoplaySpeed={5000}
          effect={"scrollx"}
          waitForAnimate={true}
        >
          {sampleMessage.map((message, index) => {
            return (
              <div className="messageCard" key={index + message}>
                <section className="message font2">
                  {message}
                  <Divider />
                  <Avatar
                    style={{ backgroundColor: "#8c64c8" }}
                    icon={<UserOutlined />}
                  />
                  <span className="title">&nbsp; Anonymous User</span>
                </section>
              </div>
            );
          })}
        </Carousel>
        <FloatButton
          icon={<PlusOutlined />}
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
            value={message}
            onChange={(e) => {
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
              onClick={() => {}}
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
