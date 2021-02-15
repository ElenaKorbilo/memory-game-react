import React from 'react'
import { Redirect } from "react-router-dom";
import Game from '../Game/Game'
import NavBar from '../NavBar/index'

export const LoginPage = ({isAuth}) => {

  return (
    isAuth ? (
      <div>
        <NavBar />
        <Game />
      </div>
    ) : (
      <Redirect to="/" />
    )
  )
}
