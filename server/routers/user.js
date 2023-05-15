import express from "express";
import {
    signUp ,
    login,
}from "../controllers/user.js"; 

const router = express.Router();

//ROUTE TO SIGN UP USER
router.post("/signup",signUp);
//ROUTE TO LOGIN USER
router.put("/login",login);


export default router ;