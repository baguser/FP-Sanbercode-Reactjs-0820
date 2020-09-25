import axios from 'axios'
import React, {useContext, useEffect} from 'react'
import {Row, Col} from 'antd'
import {ThemeContext} from '../contexts/ThemeContext'
import {UserContext} from '../contexts/UserContext'
import GameList from './GameList'
import GameCreate from './GameCreate'

const Games = () => {
  const [api , user, ,isLogin] = useContext(UserContext)
  const [, , games, setGames] = useContext(ThemeContext)

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
