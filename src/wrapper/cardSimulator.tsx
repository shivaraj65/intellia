import React from "react";
import styles from "@/styles/wrapper/cardSimulator.module.scss";
import { Card, Col, Row } from "antd";
// import HighlightScreen from '@/screens/highlightsScreen';
// import PollsScreen from "@/screens/pollsScreen";
import ReviewScreen from "@/screens/reviewsScreen";

const CardSimulator = () => {
  return (
    <div className={styles.cardsimwrapper}>
      <Card className={styles.w2h1} title="" variant="borderless">
          <ReviewScreen/>
      </Card>
      <Row gutter={16}>
        <Col span={12}>
          <Card className={styles.w1h2} title="" variant="borderless">
            <ReviewScreen/>
          </Card>{" "}
        </Col>
        <Col span={12}>
          <Card className={styles.w1h1} title="" variant="borderless">
            <ReviewScreen/>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(CardSimulator);
