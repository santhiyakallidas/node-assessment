import express from 'express';
import cors from 'cors';
import { db } from './models/db';
import authRoutes from './routes/authRoutes'
import taskRoute from './routes/taskRoutes'
import chatRoutes from './routes/chatRoutes'

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use('/api/users',authRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/tasks', taskRoute)

app.get('/',(req,res) =>{
    res.send('API running..');
});

app.listen(PORT,()=>{
    console.log("server is running on",{PORT})
})
