import React, { useRef, useState } from 'react';
import axios from 'axios';
import {
  Form,
  Input,
  InputNumber,
  Button, Row, Col, Space, Alert, Checkbox
} from 'antd';

const GameCreate = (props) => {
  const [form] = Form.useForm();
  const [errMessage, setErrMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const cbSingle = useRef()
  const cbMulti = useRef()

  const handleSubmit = async (values) => {
    setErrMessage(null)
    setSuccessMessage(null)
    try {
      await axios.post('https://backendexample.sanbersy.com/api/data-game', {
        image_url: values.image_url,
        name: values.name,
        release: values.release,
        singlePlayer: cbSingle.current.rcCheckbox.state.checked ? 1 : 0,
        multiplayer: cbMulti.current.rcCheckbox.state.checked ? 1 : 0,
        genre: values.genre
      }, {
        headers: {
          'Authorization': `Bearer ${props.user.token}`
        }
      });
      setSuccessMessage('Berhasil Menambahkan')
      form.resetFields();
    } catch (err) {
      setErrMessage('Gagal Menambahkan')
    }

  }

  return (
    <Row justify="center" align="middle" style={{height:'100%'}}>
      <Col span={12}>
        {
          successMessage !== null ? <Alert message={successMessage} type="success" style={{marginBottom:10}} /> : null
        }
        {
          errMessage !== null ? <Alert message={errMessage} type="error" style={{marginBottom:10}} /> : null
        }
        <Form labelCol={{
            span: 4
          }}
          wrapperCol={{
            span: 16
          }}
          name="nest-messages"
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item name="name" label="Game Name" rules={[{ required: true, message: 'Please input a Game Name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="image_url" label="Image Url" rules={[{ required: true, message: 'Please input an Image URL!' }, {type: 'url', message: 'Please input a valid url!'}]}>
            <Input />
          </Form.Item>
          <Form.Item name="release" label="Release Year" rules={[{ required: true, message: 'Please input a Release Year!', type: 'number' }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item name="genre" label="Genre" rules={[{ required: true, message: 'Please input a Genre!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Gameplay" rules={[]}>
            <Checkbox ref={cbSingle} >SinglePlayer</Checkbox>
            <Checkbox ref={cbMulti} >Multiplayer</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button type="default" htmlType="reset" onClick={()=>form.resetFields()}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default GameCreate;
