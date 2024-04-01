import express from 'express';
import bodyParser from 'body-parser';
import {dirname} from "path";
import { fileURLToPath } from 'url';
import fs from "fs";

const app=express();
const PORT=1000;
const dir=dirname(fileURLToPath(import.meta.url))

app.use(bodyParser.urlencoded({extended:true}))
app.listen(PORT,()=>{
    console.log("Server has started")
})
app.get("/",(req,res)=>{
res.sendFile(dir+"/public/index.html")
})
app.get("/login",(req,res)=>{
    res.sendFile(dir+"/public/index2.html")
})
app.post("/",(req,res)=>{
    fs.writeFile('storage.json', JSON.stringify(req.body), function (err){ 
        if (err){
            throw err;
        }
})
res.render("index.ejs",{
    name:req.body.fullname
})
})
app.post("/check",(req,res)=>{
   fs .readFile("storage.json","utf8",(err,data)=>{
    var check=JSON.parse(data)
    if(req.body["fullname"]===check.fullname&&req.body["email"]===check.email&&req.body["password"]===check.password){
        res.send("Authorised")
    }
    else{
        res.send("Unauthorised")
    }
   })
})