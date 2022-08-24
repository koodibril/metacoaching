import { Col, Row } from 'antd';
import type { NextPage } from 'next'
import CreateCustomer from '../components/client/add';
import ListCustomer from '../components/client/list';

const Home: NextPage = () => {
  return (
    <Row justify='space-around'>
      <Col span={4}>
        <CreateCustomer></CreateCustomer>
      </Col>
      <Col span={16}>
        <ListCustomer></ListCustomer>
      </Col>
    </Row>
  );
}

export default Home
