import {Col, List, Row} from "antd";
import Title from "antd/es/typography/Title";
import {Link} from "react-router-dom";

const Overview = ({}) => {
  const data = [
    {link: '/form', content: 'My Form'},
    {link: '/table', content: 'My Table'}
  ];

  return (
    <>
      <Row>
        <Col span={6}>
        </Col>
        <Col span={16}>
          <Title>
            Overview
          </Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <List
            size="large"
            bordered
            dataSource={data}
            renderItem={item =>
              <List.Item>
                <Link to={item.link}>{item.content}</Link>
              </List.Item>}
          />
        </Col>
      </Row>
    </>
  );
}

export default Overview;