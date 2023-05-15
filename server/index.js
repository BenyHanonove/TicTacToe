import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./router/users.js";
import {createServer} from "http";
import {Server} from "socket.io";

//START OF THE APP AND CONFING THE .ENV FILE 
const app = express();
dotenv.config();

//CONNECT THE SERVER TO DATA BASE MONGO DB
const mongo = process.env.MONGO ;
const connect = async () =>{
    try{
        mongoose.set("strictQuery",true);
        await mongoose.connect(mongo);
        console.log("server is connected to MongoDB");
    }catch(err){
        console.log(err);
    }
};


//MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
app.use("/api/user",userRouter);


//START THE SERVER WITH PORT FROM ENV FILE
const port = process.env.PORT;
const server = app.listen(port,()=>{
    console.log(`server is running on port:${port}`);
    connect();
});



//CREATE SERVER FOR SOCKET.IO INSIDE APP 
const httpServer = createServer(app);
const io = new Server (httpServer,{
    cors:{
        origin:"*",
        methods:["GET","POST"],
    },
});


//MAPS FOR HANDLEING SOCKETS DATA
var userMap = new Map();
var roomMap = new Map();

//SOCKET FUNCTION AND ACTION
io.on("connection",(socket)=>{


    //SOCKET FUNCTION WHEN USER JOINS ROOM
    socket.on("joinRoom",(data)=>{

        //ADD USER ID TO ROOM MAP ARRAY FOR SPECIFIC ROOM NUMBER
        if(roomMap.has(data.gameRoom)){
            var roomData = roomMap.get(data.gameRoom);
            var userArr = roomData.users ;
            var str = "";

            //CHECK IF THERE IS ALREADY 2 USERS IN ROOM
            if(userArr.length<2){
                str = "O";
                userArr.push(socket.id);
                roomMap.delete(data.gameRoom);
                roomMap.set(data.gameRoom ,{users:userArr ,board:new Array(9).fill(null)});
                io.to(socket.id).emit("server_update",{userId:socket.id ,board:new Array(9).fill(null)});
            //IF THERE ARE ALREADY 2 USERS KICK THE NEW USER OUT OF THE ROOM
            }else{
                console.log(`room :${data.gameRoom} is full for now kicking ${data.username} from game room.`);
                io.to(socket.id).emit("full_room");
                return;
            }
        //IF THERE IS NO KEY IN ROOIM MAP PUSH USER TO ROOM
        }else{
            var userArr = [socket.id];
            str = "X";
            var boardArr = new Array(9).fill(null);
            roomMap.set(data.gameRoom ,{users:userArr ,board:boardArr});
        }
        
        //ADD NEW USER TO USERS MAP
        var newData = {...data ,symbol:str};
        userMap.set(socket.id ,newData);
        console.log(`${data.username} has joined room :${data.gameRoom}`);
        
        
    });

    socket.on("client_update_board",(data)=>{
        try{
        let userData = userMap.get(socket.id);
        let str = userData.symbol;

        const roomData = roomMap.get(data.room);
        var boardArr = roomData.board;
        boardArr[data.index] = str;
        const userArr = roomData.users;

        if(userArr.length < 2){
            io.to(socket.id).emit("empty_room");
            return;
        }

        roomMap.delete(data.room);
        roomMap.set(data.room ,{users:userArr ,board:boardArr});

        const newData = {userId:socket.id ,board:boardArr};
        io.to(userArr[0]).emit("server_update",newData);
        io.to(userArr[1]).emit("server_update",newData);

        
        //COMBOS YOU CAN WIN THE GAME WITH
        const combos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[6,4,2]];
        
        //RUN THROUGH A LOOP ON ALL COMBOS TO CHECK IF THERE IS A WINNER
            combos.forEach(combo=>{
                if(boardArr[combo[0]] && boardArr[combo[1]] && boardArr[combo[2]]){
                    if(boardArr[combo[0]] === boardArr[combo[1] ]&& boardArr[combo[1]] === boardArr[combo[2]]){

                        if(userArr[0] === socket.id){
                            io.to(userArr[0]).emit("win");
                            io.to(userArr[1]).emit("lose");
                        }else{
                            io.to(userArr[1]).emit("win");
                            io.to(userArr[0]).emit("lose");
                        }
                    
                    };
                };
            });

        }catch(err){
            console.log(err);
        }
    });


    //SOCKET FUNCTINO WHEN USER DISCONNECT
    socket.on("disconnect",()=>{
        
        //DELETE USER FROM USERS MAP AND PRINT TO SERVER THAT THE USER HAS DISCONNECTED
        try{

            //DONT REMOVE NOTHING MAP DONT HAS USER ID
            if(!userMap.get(socket.id)){
                return;
            }

            const user = userMap.get(socket.id);
            userMap.delete(socket.id);
            console.log(`${user.username} has left room :${user.gameRoom}`);
        }catch(err){
            console.log(err);
        }

    });

});

//SOCKET SEREVER RUNNING ON HTTP PROTOCOL AND LISTENING TO PORT 3002
httpServer.listen(3002,()=>{
    console.log(`http server + socket.io is listening on port:3002`);
});