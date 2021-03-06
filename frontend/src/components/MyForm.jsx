import {Button, Col, Row, DatePicker, Form, Input, InputNumber, Alert} from "antd";
import {AddUser} from "../api/requests";
import Title from "antd/es/typography/Title";
import {Link} from "react-router-dom";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useState} from "react";

const MyForm = ({initialValues}) => {
  const [form] = Form.useForm();
  const [error, setError] = useState();
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
  };

  const onFinish = (fieldValues) => {
    const values = {
      ...fieldValues,
      birthday: fieldValues['birthday'].format('YYYY-MM-DD')
    }

    setIsLoading(true);
    AddUser(values).then(data => {
      setIsLoading(false);
      setError(data.error ?? undefined);
      setResponse(data.payload ?? undefined);

      if(data.payload) {
        form.resetFields();
        console.log('aaa');
      }
    });
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }

  return (
    <>
      <Row>
        <Col span={6}>
          <Title>
            <Link to='/'>
              <ArrowLeftOutlined />
            </Link>
          </Title>
        </Col>
        <Col span={16}>
          <Title>
            Add user
          </Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {
            error && (
              <Alert
                message={error}
                type='error'
                closable
                style={{marginBottom: '16px'}}
              />
            )
          }
          {
            response && (
              <Alert
                message='Successfully added user'
                type='success'
                closable
                style={{marginBottom: '16px'}}
              />
            )
          }
          <Form
            {...layout}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            initialValues={initialValues}
            form={form}
          >
            <Form.Item
              label='Firstname'
              name='firstname'
              rules={[
                {
                  required: true,
                  message: 'Firstname is required'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Age'
              name='age'
              rules={[
                {
                  type: 'number',
                  min: 0,
                  max: 125,
                  message: 'Age needs to bin in the range between 0 - 125'
                },
                {
                  required: true,
                  message: 'Age is required'
                }
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label='Birthday'
              name='birthday'
              rules={[
                {
                  type: 'date',
                  required: 'true',
                  message: 'Birthday is required'
                }
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: { span: 16, offset: 6 },
              }}
            >
              <Button
                type='primary'
                htmlType='submit'
                loading={isLoading}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default MyForm;