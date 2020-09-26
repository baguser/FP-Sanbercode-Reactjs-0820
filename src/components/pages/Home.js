import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [dataMovies, setDataMovies] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('https://backendexample.sanbersy.com/api/data-movie');
        setDataMovies(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    if (dataMovies === null) {
      fetchData();
    }
  }, [dataMovies]);

  return (
    <>
      <Typography.Title level={2}>Daftar Movie</Typography.Title>
      <Row gutter={[8, 16]}>
        {
          dataMovies !== null && dataMovies.map(movie => (
            <Col span={6} key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <Card
                  loading={loading}
                  cover={
                    <img src={movie.image_url} alt={`${movie.title} (${movie.year})`} />
                  }
                >
                  <Card.Meta
                  title={`${movie.title} (${movie.year})`}
                  description = {
                    <Typography.Paragraph ellipsis={{
                      rows: 5
                    }}>{movie.description}</Typography.Paragraph>
                  }
                  />
                </Card>
              </Link>
            </Col>
          ))
        }
      </Row>
    </>
  );
};

export default Home;
