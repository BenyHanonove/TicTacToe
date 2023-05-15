import React, { useEffect, useState } from 'react';
import {io} from "socket.io-client";
import "./Board.css";

function Board(object) {


    
  const [turn ,setTurn] = useState(true);
  const [socket ]  = useState(io('http://localhost:3002',{reconnection: false})); 
  const [boardArr ,setBoardArr] = useState(new Array(9).fill(null));
  
    
    //FUNCTION THAT HANDELS THE CLICK ON DIV / BOX OF THE BOARD
    const clickHandler = (clickedIndex)=>{
      if(!turn){
        alert("not your turn.");
        return ;
       }
       
       const clickData = {room:object.data.gameRoom ,index:clickedIndex };
       socket.emit("client_update_board",clickData);
      };
      

      //USE EFFECT THAT JOIN YOU TO A ROOM ONCE YOU CREATE SOCKET FOR ONCE
      useEffect(()=>{
        socket.emit("joinRoom" ,object.data);    
      },[object ,socket]);


      //USE EFFECT THAT UPDATE THE BOARD BY SERVER ORDER
      useEffect(()=>{

        socket.on("server_update",(serverData)=>{
        if(socket.id === serverData.userId){
          setTurn(false);
        }else{
          setTurn(true);
        }

        setBoardArr(serverData.board);
      });
    });


    //USE EFFECT THAT CHECK IF THERE IS 2 PLAYES IN GAME ROOM 
    useEffect(()=>{
      socket.on("empty_room",()=>{
        alert("room has to have 2 playes");
      });
    });

    useEffect(()=>{
      socket.on("full_room",()=>{
        alert("this room his currently full !");
        window.location.replace("/search");
      });
    });
    
    //USE EFFECT THAT CHECKS IF YOU YOU WON THE GAME
    useEffect(()=>{
      socket.on("win",()=>{window.location.replace("win");});
    },[socket ,object]);


    //USE EFFECT THAT CHECK IF YOU LOST THE GAME
    useEffect(()=>{
      socket.on("lose",()=>{window.location.replace("lose");});
    },[socket ,object]);

        
    return (
    <div className='boardDiv'>
      {boardArr.map((item ,index)=>(
        <div className='boxDiv' key={index} onClick={()=>{clickHandler(index)}}>
          <label className='boxLabel'>{item}</label>
        </div>
      ))} 
    </div>
  )
}

export default Board;