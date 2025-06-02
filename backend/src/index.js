import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import adminRouter from './routes/admin.route.js'

dotenv.config();

const app=express();
app.use(express.json());

app.use('/api/admin',adminRouter);
// app.use('/api/blog',blogRoute);
// app.use('/api/project',projectRoute);
// app.use('/api/contact',contactRoute);

app.listen(process.env.PORT || 5000,()=>{
    console.log(`server running at localhost ${process.env.PORT || 8000}`);
})