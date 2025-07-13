import { Card } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import React from "react";

interface Contract {
  title: string;
  content: string;
}

const ContractPermisens: React.FC<Contract> = ({ content, title }) => {
  return (
    <Card title={title} style={{marginTop:"30px"}}>
      <Paragraph style={{ marginTop: 24, lineHeight: 1.8 }}>
        {content}
      </Paragraph>
    </Card>
  );
};

export default ContractPermisens;
