import React from 'react';
import Cookies from 'universal-cookie';
import Board from '../Board/Board';


function Game() {

    const cookies = new Cookies();
    const roomNumber = cookies.get("room");
    const cookiesUsername = cookies.get("username");
    const boardData = {gameRoom:roomNumber ,username:cookiesUsername };


    return (
    <div>
      <Board data={boardData}/>
    </div>
  )
}

export default Game;