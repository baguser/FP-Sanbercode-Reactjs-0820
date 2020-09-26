import axios from 'axios'
import React, {useContext, useEffect} from 'react'
import {Row, Col} from 'antd'
import {DataContext} from '../contexts/DataContext'
import {UsContext} from '../contexts/UsContext'
import GameList from './GameList'
import GameCreate from './GameCreate'

const Games = () => {
  const [api , user, ,isLogin] = useContext(UsContext)
  const [, , games, setGames] = useContext(DataContext)

  useEffect(()=> {
    if(games === null){
      Axios.get(`${api}/data-game`)
           .then(res => {
             setGames(res.data)
           }).catch(err => {
             alert(err)
           })
    }
  })

  return(
    <>
      <Row>
        <Col>
          <h3>List Game</h3>
        </Col>
      </Row>
      <hr />
      {
        isLogin === true ? (<><GameCreate /></>) : (<><GameList games={games} /></>)
      }
    </>
  )
}

export default Games
