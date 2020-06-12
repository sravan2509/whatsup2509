const path=require('path')
const express=require('express')
const socketIO=require('socket.io')
const http =require('http')

const {generateMsg,generateLocMsg}=require("./utils/message")
const {isReal}=require('./utils/isRealValid')
const {Users}=require('./utils/user')

const port =process.env.PORT||3000
// console.log(__dirname+"/../public")
// console.log(publicpath);
const publicpath=path.join(__dirname,"/../public")
let app=express()
let server=http.createServer(app)
let io=socketIO(server)
let users=new Users()

app.use(express.static(publicpath))


io.on("connection",(socket)=>{
    console.log("new user connected");

    // this will send the data to room to isolate this we include in "join" event
    // socket.emit('newMsg',

    // // without testing
    // // {
    // //     from:"admin",
    // //     text:"welcome to the chat room",
    // //     time:new Date().getTime() 
    // // }

    // // with testing type
    // generateMsg("Admin","welcome to the chat room")

    // )

    // socket.broadcast.emit('newMsg',

    // // without testing
    // // {
    // //     from:"admin",
    // //     text:"new user joined",
    // //     time:new Date().getTime()
    // // }

    // // with testing type
    // generateMsg("Admin","new user joined")
    // )
    socket.on('join',(userData,callback)=>{
     if(!isReal(userData.name)||!isReal(userData.room)){
        return callback('Name or roomid invalid')
     }
     socket.join(userData.room);
     users.delectUser(socket.id)
     users.addUser(socket.id,userData.name,userData.room)
     io.to(userData.room).emit('updateUser',users.getUserList(userData.room))
     //including here for isolation
     socket.emit('newMsg',generateMsg("Admin",`welcome to the chat room:${userData.room}`))
     socket.broadcast.to(userData.room).emit('newMsg',generateMsg("Admin",`${userData.name} has  joined now` ))
         callback()
     
    })

    socket.on('createMsg',(msg,callback)=>{
        // for callback to call it include in arg after msg

        console.log("creatMsg",msg);

        //to send to only that roomid
        let user=users.getUser(socket.id)
        if(user&& isReal(msg.text)){
            io.to(user.room).emit('newMsg',generateMsg(user.name,msg.text))
        }
        // to send all rooms
        // // to send to all connected clients includes sender
        // io.emit('newMsg',

        // //  without testing
        // // { from:msg.from,
        // //     text:msg.text,
        // //     time:new Date().getTime()
        // // }

        // // with testing type
        // generateMsg(msg.from,msg.text)
        // )
        // callback explain
        callback("server")//one can also pass msg obj
            
        // excepts sender
        // socket.broadcast.emit('newMsg',{
        //         from:msg.from,
        //         text:msg.text,
        //         time:new Date().getTime()
        //     })
    })



    // msg from server to users
    // socket.emit('newMsg',{from:"hi,sravan",from:"server"})

     socket.on("createLocationmsg",(loc)=>{
        let user=users.getUser(socket.id)
        if(user){
            io.to(user.room).emit("newLocMsg",generateLocMsg(user.name,loc.lat,loc.long))
        }
        //  io.emit("newLocMsg",generateLocMsg(loc.from,loc.lat,loc.long))
     })

    socket.on("disconnect",()=>{
        console.log("user disconnected");
       let user= users.delectUser(socket.id)
if(user){
    io.to(user.room).emit('updateUser',users.getUserList(user.room))
    io.to(user.room).emit('newMsg',generateMsg('Admin',`${user.name} has left from ${user.room}`))
}

    });

});
server.listen(port,()=>{
    console.log(`server is ready at ${port} `)
})

