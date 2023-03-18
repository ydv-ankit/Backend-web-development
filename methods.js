const express =  require('express')
const app = express()
// middleware functions, change post data into json format
app.use(express.json())

let users = {};

app.get('/users', (req, res)=>{
    res.send(users);
})

app.post('/users', (req, res)=>{
    // console.log(req.body);
    users = req.body;
    res.json({
        message: "data recieved successfully",
        user: req.body
    })
})

// patch -> update
app.patch('/users', (req, res)=>{
    console.log("req.body -> ", req.body)
    let dataToBeUpdated = req.body;
    for(key in dataToBeUpdated){
        users[key] = dataToBeUpdated[key]
    }
    res.json({
        message: "data updated"
    })
})

// delete methods -> to delete data
app.delete('/users', (req, res)=>{
    users = {}
    res.json({
        message: "data has been deleted"
    })
})

// start server to listen
app.listen(8080, ()=>{ 
    console.log("server live at http://127.0.0.1:8080")
})