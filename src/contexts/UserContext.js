import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {

  const currentUser = localStorage.getItem('user')
  const [user, setUserX] = useState(currentUser ? JSON.parse(currentUser) : null)

  const setUser = (val) => {
    setUserX(val)
    if (val === null) { 
      localStorage.removeItem('user')
    } else {
      localStorage.setItem('user', JSON.stringify(val))
    }
  }

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  )
}