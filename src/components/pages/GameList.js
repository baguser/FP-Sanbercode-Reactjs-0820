import React, { useEffect, useState } from 'react';
import { Table, Typography, Image, Button, Popconfirm, Input, Tag } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GameList = (props) => {
  const [dataGames, setDataGames] = useState(null);
  const [dataList, setDataList] = useState(dataGames);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('https://backendexample.sanbersy.com/api/data-game');
        setDataGames(data);
        setDataList(data);
      } catch (err) {
        console.error(err);
      }
    };
    if (dataGames === null) {
      fetchData();
    }
  }, [dataGames]);

  const handleDeleteBtn = async (id) => {
    try {
      await axios.delete(`https://backendexample.sanbersy.com/api/data-game/${id}`, {
        headers: {
          'Authorization': `Bearer ${props.user.token}`
        }
      });
      setDataGames(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Typography.Title level={2}>
        Game List
      </Typography.Title>

      <Link to="/game-editor/create">
        <Button type="primary">Add</Button>
      </Link>

      <div style={{marginBottom: 10}} />

      <Input.Search
        placeholder="Cari"
        onSearch={q => {
          const newData = dataGames.filter(v => {
            return v.name.toLowerCase().includes(q) || v.release.toLowerCase().includes(q) || v.genre.toLowerCase().includes(q)
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
          name_release: <Typography.Paragraph>
            <Typography.Text strong>{`${v.name} (${v.release})`}</Typography.Text>
          </Typography.Paragraph>,
          image: <Image src={v.image_url} width={100} />,
          gameplay: <Typography.Paragraph>
            {v.singlePlayer > 0 ? <Tag>Singleplayer</Tag>:''}
            {v.multiplayer > 0 ? <Tag>Multiplayer</Tag>:''}
          </Typography.Paragraph>,
          action: (
            <>
              <Button>
                <Link to={`/game-editor/edit/${v.id}`}>Edit</Link>
              </Button>
              <Button>
                <Popconfirm title="Anda yakin ingin menghapus?" onConfirm={()=>handleDeleteBtn(v.id)}>
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
          title: 'Name / Release',
          dataIndex: 'name_release',
          key: 'name_release',
          sorter: (a, b) => (a.name > b.name) - (a.name < b.name),
        },
        {
          title: 'Genre',
          dataIndex: 'genre',
          key: 'genre',
          sorter: (a, b) => (a.genre > b.genre) - (a.genre < b.genre),
        },
        {
          title: 'Gameplay',
          dataIndex: 'gameplay',
          key: 'gameplay',
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

export default GameList;
