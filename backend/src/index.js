import express from 'express'
import cors from 'cors'

const app=express();

app.get('/',(req,res)=>{
    res.send("home page")
})

app.listen(3000,()=>{
    console.log("running on port 3000");
})