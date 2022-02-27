import {Button, Card, Col, DatePicker, Form, Input, InputNumber, Row, Table} from "antd";
import Title from "antd/es/typography/Title";
import {Link} from "react-router-dom";
import Icon, {ArrowLeftOutlined, MinusOutlined, SearchOutlined} from "@ant-design/icons";
import {useEffect, useRef, useState} from "react";
import Highlighter from 'react-highlight-words';

const MyTable = ({}) => {
  const [searchTerms, setSearchTerms] = useState({});

  const inpRef = useRef(null);

  useEffect(() => {
    console.log('search terms:', searchTerms);
  }, [searchTerms]);

  const buildFilter = (dataIndex, inputType) => {
    const handleSearch = (selectedKeys, confirm) => {
      confirm();

      const newSearchTerms = {
        ...searchTerms,
        [dataIndex]: selectedKeys[0]
      }

      setSearchTerms(newSearchTerms);
    };

    const handleReset = (setSelectedKeys, confirm) => {
      setSelectedKeys('');

      handleSearch({ 0: ''}, confirm);
    };

    return {
      filterDropdown: ({setSelectedKeys, selectedKeys, confirm}) => {
        return (
          <Card>
            <Input
              ref={inpRef}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() => handleSearch(selectedKeys, confirm)}
              style={{width: 188, marginBottom: 8, display: "block"}}
            />
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm)}
              size="small"
              style={{width: 90, marginRight: 8}}
            >
              <SearchOutlined/>
              Search
            </Button>
            <Button
              onClick={() => handleReset(setSelectedKeys, confirm)}
              size="small"
              style={{width: 90}}
            >
              Reset
            </Button>
          </Card>
        )
      },
      filterIcon: filtered => (
        <SearchOutlined/>
      ),
      onFilter: (value, record) => (
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())
      ),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => inpRef.current.focus());
        }
      },
      render: text => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchTerms[dataIndex]]}
          autoEscape
          textToHighlight={text.toString()}
        />
      )
    }
  }

  const columns = [
    {
      title: "Firstname",
      dataIndex: "firstname",
      key: "firstname",
      sorter: true,
      ...buildFilter('firstname')
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: true,
      ...buildFilter('age')
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
      sorter: true,
      ...buildFilter('birthday')
    }
  ];

  const testData = [
    {
      key: '1',
      firstname: 'Sebastian',
      age: 22,
      birthday: '1999-05-24'
    },{
      key: '2',
      firstname: 'Kevin',
      age: 20,
      birthday: 'im winter'
    },{
      key: '3',
      firstname: 'Florian',
      age: 14,
      birthday: 'mr. trans age'
    },{
      key: '4',
      firstname: 'Marcel',
      age: 29,
      birthday: 'mr. doppelmoral'
    }
  ]

  return (
    <>
      <Row>
        <Col span={6}>
          <Title>
            <Link to='/'>
              <ArrowLeftOutlined/>
            </Link>
          </Title>
        </Col>
        <Col span={16}>
          <Title>
            Some Table
          </Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card title='Search via Api' style={{marginBottom: '24px'}}>
            <Form>
              <Form.Item
                label='Age Range'
                style={{marginBottom: 0}}
              >
                <Input.Group>
                  <Row>
                    <Col span={9}>
                      <Form.Item
                        name='ageMin'
                        style={{marginBottom: 0}}
                        rules={[
                          {
                            type: 'number',
                            min: 0,
                            message: 'Age needs to be at least 0'
                          }
                        ]}
                      >
                        <InputNumber
                          placeholder='From'
                          style={{width: '100%'}}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={9}>
                      <Form.Item
                        name='ageMax'
                        style={{marginBottom: 0}}
                        rules={[
                          {
                            type: 'number',
                            min: 0,
                            message: 'Age needs to be at least 0'
                          }
                        ]}
                      >
                        <InputNumber
                          placeholder='To'
                          style={{width: '100%'}}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        style={{marginBottom: 0}}
                      >
                        <Button
                          type='primary'
                          htmlType='submit'
                          style={{width: '100%'}}
                        >
                          Submit
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Input.Group>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={testData} />
        </Col>
      </Row>
    </>
  );
}

export default MyTable;