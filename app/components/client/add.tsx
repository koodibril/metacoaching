import React from 'react';
import { Button, Row, Form, Input, Spin, InputNumber, AutoComplete } from 'antd';
import { useState } from 'react';
import { Customer } from './customer.d';
import { useCustomerActions } from '../../store/customer/actions/customer';
import styles from '../../styles/Add.module.css';

const CreateCustomer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<{ value: string }[]>([]);

  const { create } = useCustomerActions();

  const onSearch = (searchText: string) => {
    if (searchText.length > 3) {
      fetch("https://api-adresse.data.gouv.fr/search/?q=" + searchText + "&limit=4").then((res) => res.json()).then((data) => {
        const list = data.features.map((el: any) => {
          return { value: el.properties.label };
        });
        setOptions(
            !searchText ? [] : list,
          );
      })
    }
  };

  const handleSignup = (user: Customer) => {
    setLoading(true);
    create({ ...user });
    setLoading(false);
  };

  return (
    <Row justify="center" align="middle">
      <Form style={{ margin: "16px 0" }} name="signup" onFinish={handleSignup}>
        <Form.Item
          label={"firstname"}
          name="firstname"
          rules={[
            {
              required: true,
              message: "Firstname missing",
            },
          ]}
        >
          <Input placeholder="Enter your firstname"/>
        </Form.Item>

        <Form.Item
          label={"lastname"}
          name="lastname"
          rules={[
            {
              required: true,
              message: "Lastname missing",
            },
          ]}
        >
          <Input placeholder="Enter your lastname"/>
        </Form.Item>

        <Form.Item
          label={"age"}
          name="age"
          rules={[
            {
              required: true,
              message: "Age missing",
            },
          ]}
        >
          <InputNumber
            min={1}
            max={100}>
          </InputNumber>
        </Form.Item>

        <Form.Item
          label={"email"}
          name="email"
          rules={[
            {
              required: true,
              message: "Email missing",
              type: "email",
            },
          ]}
        >
          <Input placeholder="Enter your email"/>
        </Form.Item>

        <Form.Item
          label={"phone"}
          name="phone"
          rules={[
            {
              required: true,
              message: "Phone missing",
            },
            {
              pattern:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
              message: "Please enter a valid phone number"
            }
          ]}
        >
          <Input 
            placeholder="Enter your phone number" className={styles.phone}></Input>
        </Form.Item>

        <Form.Item
          label={"address"}
          name="address"
          rules={[
            {
              required: true,
              message: "address missing",
            },
          ]}
        >
          <AutoComplete
            options={options}
            style={{ width: 200 }}
            onSearch={onSearch}
            placeholder="Enter your address"
          />
        </Form.Item>

        <Form.Item>
          <Spin spinning={loading}>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Spin>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default CreateCustomer
