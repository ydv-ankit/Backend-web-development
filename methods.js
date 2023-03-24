const express =  require('express')
const app = express()
const mongoose = require('mongoose')
// middleware functions, change post data into json format
app.use(express.json())

const userRouter = express.Router();
const authRouter = express.Router();

// base route
app.use("/user", userRouter)
app.use("/auth", authRouter)

// miniapp
userRouter
    .route("/")
    .get(getUsers)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser);
userRouter.route("/:id").get(getUserById)

authRouter
    .route("/signup")
    .get(getSignUp)
    .post(postSignUp)

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

// middleware function
function middleware(req, res, next){
    console.log("middleware encountered")
    next()
}

async function getUsers(req, res){
    // console.log(req.query)  // query
    let allUsers = await userModel.find()

    res.json({
        message : "list of all users",
        users : allUsers 
    });
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

function getSignUp(req, res){
    res.sendFile(__dirname + "/public/signup.html")
}

async function postSignUp(req, res){
    let obj = req.body;
    data = await userModel.insertMany(obj);
    console.log("backend -> " , data)
    res.json({
        message: "user signed up",
        data: obj
    });
}

const db_link = "mongodb://127.0.0.1:27017/test"

mongoose.connect(db_link)
.then(function(db){
    console.log("databse connected");
})
.catch(function(err){
    console.log("error occured");
})

// user schema for mongoDB
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 8
    },
    confirmPassword:{
        type: String,
        required: true,
        minlength: 8
    }
});

userSchema.pre('save', function(){
    console.log("before saving to database")
})

userSchema.post('save', function(doc){
    console.log("after saving to database")
})

// model -> what purpose schema is used
const userModel = mongoose.model('userModel', userSchema);

// (async function createUser(){
//     let user = [
//         {
//             name: "Ankit",
//             email: 'ankt@gmail.com',
//             password: "Ankit123",
//             confirmPassword: "Ankit123"
//         },
//         {
//             name: "Ankit",
//             email: 'ankitydv@gmail.com',
//             password: "Ankit123",
//             confirmPassword: "Ankit123"
//         }
//     ];
//     let data = 'done'
//     data = await userModel.create(user);
//     console.log(data)
// })();
