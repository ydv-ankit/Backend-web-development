const express =  require('express')
const app = express()

app.get("/", (req, res)=>{
    res.send("Welcome to my server app")
})

app.listen(8080, ()=>{ 
    console.log("server live at http://127.0.0.1:8080")
})