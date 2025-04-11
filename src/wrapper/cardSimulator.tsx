import React from "react";
import "@/styles/wrapper/cardSimulator.module.scss";
import { Card, Col, Row } from "antd";
import HighlightScreen from '@/screens/highlightsScreen';

const CardSimulator = () => {
  return (
    <div className={'card-sim-wrapper'}>
      <Card className="w2-h1" title="" variant="borderless">
          <HighlightScreen/>
      </Card>
      <Row gutter={16}>
        <Col span={12}>
          <Card className="w1-h2" title="" variant="borderless">
            <HighlightScreen/>
          </Card>{" "}
        </Col>
        <Col span={12}>
          <Card className="w1-h1" title="" variant="borderless">
            <HighlightScreen/>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(CardSimulator);
