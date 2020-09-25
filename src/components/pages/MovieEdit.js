import React, { useState } from 'react';
import axios from 'axios';
import {
  Form,
  Input,
  InputNumber,
  Button, Row, Col, Space, Alert
} from 'antd';
import { useParams } from 'react-router-dom';

const MovieEdit = (props) => {
  const {id} = useParams()
  const [form] = Form.useForm();
  const [errMessage, setErrMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [movie, setDataMovie] = useState(null)

  if (movie === null) {
    axios.get(`https://backendexample.sanbersy.com/api/data-movie/${id}`, {
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    }).then(res => {
      setDataMovie(res.data);
      form.setFieldsValue({
        image_url: res.data.image_url,
        title: res.data.title,
        description: res.data.description,
        year: res.data.year,
        duration: res.data.duration,
        genre: res.data.genre,
        rating: res.data.rating
      })
    })
  }

  const handleSubmit = async (values) => {
    setErrMessage(null)
    setSuccessMessage(null)

    try {
      const {data} = await axios.put(`https://backendexample.sanbersy.com/api/data-movie/${id}`, {
        image_url: values.image_url,
        title: values.title,
        description: values.description,
        year: values.year,
        duration: values.duration,
        genre: values.genre,
        rating: values.rating
      }, {
        headers: {
          'Authorization': `Bearer ${props.user.token}`
        }
      });
      setSuccessMessage('Update Berhasil')
      setDataMovie(data)
    } catch (err) {
      setErrMessage('Update Gagal')
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
          <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input a Title!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="image_url" label="Image Url" rules={[{ required: true, message: 'Please input an Image URL!' }, {type: 'url', message: 'Please input a valid url!'}]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input a Description!' }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="year" label="Year" rules={[{ required: true, message: 'Please input a Year!', type: 'number' }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item name="duration" label="Duration" rules={[{ required: true, message: 'Please input a Duration!', type: 'number' }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item name="genre" label="Genre" rules={[{ required: true, message: 'Please input a Genre!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="rating" label="Rating" rules={[{ required: true, type: 'number', min:1, max:10, message: 'Rating must be between 1 and 10!'}]}>
            <InputNumber />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              < Button type = "default"
              htmlType = "reset"
              onClick = {
                () => form.setFieldsValue({
                  image_url: movie.image_url,
                  title: movie.title,
                  description: movie.description,
                  year: movie.year,
                  duration: movie.duration,
                  genre: movie.genre,
                  rating: movie.rating
                })
              } >
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default MovieEdit;
