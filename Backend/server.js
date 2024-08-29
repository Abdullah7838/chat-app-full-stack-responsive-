const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const PORT = 9000;
const db = require('./db');
require('dotenv').config()

const UserRouter = require('./Routes/User')
app.use('/',UserRouter)

const ChatRoute = require('./Routes/Chat')
app.use('/',ChatRoute)

const WorldChat = require('./Routes/WorldChat')
app.use('/',WorldChat)

app.listen(PORT,()=>{console.log(`Server is runnig on Port ${PORT}`)})