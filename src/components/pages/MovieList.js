import React, { useEffect, useState } from 'react';
import { Table, Typography, Image, Button, Popconfirm, Input } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MovieList = (props) => {
  const [dataMovies, setDataMovies] = useState(null);
  const [dataList, setDataList] = useState(dataMovies);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('https://backendexample.sanbersy.com/api/data-movie');
        setDataMovies(data);
        setDataList(data);
      } catch (err) {
        console.error(err);
      }
    };
    if (dataMovies === null) {
      fetchData();
    }
  }, [dataMovies]);

  const handleDeleteBtn = async (id) => {
    try {
      await axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${id}`, {
        headers: {
          'Authorization': `Bearer ${props.user.token}`
        }
      });
      setDataMovies(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Typography.Title level={2}>
        Movie List
      </Typography.Title>

      <Link to="/movie-editor/create">
        <Button type="primary">Add</Button>
      </Link>

      <div style={{marginBottom: 10}} />

      <Input.Search
        placeholder="Cari"
        onSearch={q => {
          const newData = dataMovies.filter(v => {
            return v.title.toLowerCase().includes(q) || v.description.toLowerCase().includes(q) || v.genre.toLowerCase().includes(q)
          });
          setDataList(newData);
        }}
        size="large"
        style={{ width: 200 }}
      />

      <div style={{marginBottom: 10}} />

      <Table dataSource={dataList !== null && dataList.map((v, i) => {
        return {
          ...v,
          no: (i+1),
          key: v.id,
          title_year: <Typography.Paragraph>
            <Typography.Text strong>{`${v.title} (${v.year})`}</Typography.Text>
            <br />
            {v.description}
          </Typography.Paragraph>,
          image: <Image src={v.image_url} width={100} />,
          action: (
            <>
              <Button>
                <Link to={`/movie-editor/edit/${v.id}`}>Edit</Link>
              </Button>
              <Button>
                <Popconfirm title="Are you sure?" onConfirm={()=>handleDeleteBtn(v.id)}>
                  Delete
                </Popconfirm>
              </Button>
            </>
          )
        }
      })} columns={[
        {
          title: 'No',
          dataIndex: 'no',
          key: 'no',
        },
        {
          title: 'Image',
          dataIndex: 'image',
          key: 'image'
        },
        {
          title: 'Title / Year',
          dataIndex: 'title_year',
          key: 'title_year',
          sorter: (a, b) => (a.title > b.title) - (a.title < b.title),
        },
        {
          title: 'Genre',
          dataIndex: 'genre',
          key: 'genre',
          sorter: (a, b) => (a.genre > b.genre) - (a.genre < b.genre),
        },
        {
          title: 'Duration',
          dataIndex: 'duration',
          key: 'duration',
          sorter: (a, b) => a.duration - b.duration,
        },
        {
          title: 'Rating',
          dataIndex: 'rating',
          key: 'rating',
          sorter: (a, b) => a.rating - b.rating,
        },
        {
          title: 'Created At',
          dataIndex: 'created_at',
          key: 'created_at',
          sorter: (a, b) => (a.created_at > b.created_at) - (a.created_at < b.created_at),
        },
        {
          title: 'Updated At',
          dataIndex: 'updated_at',
          key: 'updated_at',
          sorter: (a, b) => (a.updated_at > b.updated_at) - (a.updated_at < b.updated_at),
        },
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action'
        }
      ]} />
    </>
  );
};

export default MovieList;
