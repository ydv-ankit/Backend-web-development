const express =  require('express')
const app = express()
// middleware functions, change post data into json format
app.use(express.json())

const userRouter = express.Router();
app.use("/user", userRouter)

// miniapp
userRouter
.route("/")
.get(getUser)
.post(postUser)
.patch(updateUser)
.delete(deleteUser);

userRouter.route("/:id").get(getUserById)

let users = [
    {
        'id': 1,
        'name': "Ankit"
    },
    {
        "id": 2,
        "name": "Cyfer"
    },
    {
        "id": 3,
        "name": "hacker"
    }
];


// start server to listen
app.listen(8080, ()=>{ 
    console.log("server live at http://127.0.0.1:8080")
})

function getUser(req, res){
    console.log(req.query)  // query
    res.json(users);
}

function postUser(req, res){
    users = req.body;
    res.json({
        message: "data recieved successfully",
        user: req.body
    })
}

function updateUser(req, res){
    console.log("req.body -> ", req.body)
    let dataToBeUpdated = req.body;
    for(key in dataToBeUpdated){
        users[key] = dataToBeUpdated[key]
    }
    res.json({
        message: "data updated"
    })
}

function deleteUser(req, res){
    users = {}
    res.json({
        message: "data has been deleted"
    })
}

function getUserById(req, res){
    console.log(req.params.id);
    let paramId = req.params.id;
    let obj= {};
    for(let i = 0; i < users.length; i++){
        if(users[i].id == paramId){
            obj = users[i]
        }
    }
    res.json({
        message:"request recieved",
        data:obj
    })
}