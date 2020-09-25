import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Form,
  Input,
  InputNumber,
  Button, Row, Col, Space, Alert, Checkbox
} from 'antd';

const GameEdit = (props) => {
  const {id} = useParams()
  const [form] = Form.useForm();
  const [errMessage, setErrMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [game, setDataGame] = useState(null)
  const [checkedSingle, setCheckedSingle] = useState(false)
  const [checkedMulti, setCheckedMulti] = useState(false)

  const cbSingle = useRef()
  const cbMulti = useRef()

  if (game === null) {
    axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`, {
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    }).then(res => {
      setDataGame(res.data);
      form.setFieldsValue({
        image_url: res.data.image_url,
        name: res.data.name,
        release: parseInt(res.data.release),
        genre: res.data.genre
      })

      setCheckedSingle(res.data.singlePlayer)
      setCheckedMulti(res.data.multiplayer)
    })
  }

  const handleSubmit = async (values) => {
    setErrMessage(null)
    setSuccessMessage(null)
    try {
      await axios.put(`https://backendexample.sanbersy.com/api/data-game/${id}`, {
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
      setSuccessMessage('Game updated successfully!')
    } catch (err) {
      setErrMessage('Something went wrong when updating a game!')
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
            <Checkbox ref={cbSingle} checked={checkedSingle} onChange={()=>setCheckedSingle(!checkedSingle)}>SinglePlayer</Checkbox>
            <Checkbox ref={cbMulti} checked={checkedMulti} onChange={()=>setCheckedMulti(!checkedMulti)}>Multiplayer</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default GameEdit;
