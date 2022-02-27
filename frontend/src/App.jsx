import {Route, Routes} from "react-router-dom";
import {Card, Col, Row} from "antd";

import MyForm from "./components/MyForm";
import Overview from "./components/Overview";
import MyTable from "./components/MyTable";

function App() {
  const initialValues = {

  }

  return (
    <Row justify='center'>
      <Col>
        <Card style={{ margin: '40px', maxWidth: '900px', minWidth: '600px'}}>
          <Routes>
            <Route path='/form' element={<MyForm initialValues={initialValues} />} />
            <Route path='/table' element={<MyTable />} />
            <Route path='/' element={<Overview />} />
          </Routes>
        </Card>
      </Col>
    </Row>
  )
}

export default App
