const express =  require('express')
const app = express()

app.get("/", (req, res)=>{
    res.sendFile("./views/index.html", {root : __dirname})
})

app.get("/about", (req, res)=>{
    res.sendFile("./views/about.html", {root : __dirname})
})

// redirects
app.get("/about-us", (req, res)=>{
    res.redirect("/about")
})

// 404 page
app.use((req, res)=>{
    res.status(404).sendFile("./views/404.html", {root : __dirname})
})  

// start server to listen
app.listen(8080, ()=>{ 
    console.log("server live at http://127.0.0.1:8080")
})