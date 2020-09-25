import { Col, Image, Row, Skeleton, Tag, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieReviewDetail = () => {
  const {id} = useParams()

  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`https://backendexample.sanbersy.com/api/data-movie/${id}`);
        setMovie(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    if (movie === null) {
      fetchData();
    }
  }, [id, movie, setLoading]);

  return (
    <Row gutter={[8, 16]}>
      <Col span={8} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {
          loading ? <Skeleton.Image /> : (
            <Image src={movie.image_url} alt={`${movie.title} (${movie.year})`} />
          )
        }
      </Col>
      <Col span={16} style={{paddingLeft: 20, paddingRight: 20}}>
        {
          loading ? <Skeleton /> : (
            <>
            <Typography.Title level={2}>{`${movie.title} (${movie.year})`}</Typography.Title>
            <Typography.Paragraph>
              <Typography.Text strong>Duration : </Typography.Text>
              <Typography.Text>{`${movie.duration}min`}</Typography.Text>
              <Typography.Text strong> | </Typography.Text>
              <Typography.Text strong>Rating : </Typography.Text>
              <Typography.Text>{`${movie.rating}/10`}</Typography.Text>
            </Typography.Paragraph>
            <Typography.Paragraph>
              <Typography.Text strong>Genre : </Typography.Text>
              <Typography.Text>{movie.genre.split(',').map(v => <Tag>{v.trim()}</Tag>)}</Typography.Text>
            </Typography.Paragraph>
            <Typography.Paragraph>{movie.description}</Typography.Paragraph>
            </>
          )
        }
      </Col>
    </Row>
  );
};

export default MovieReviewDetail;
