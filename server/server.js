const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
app.use(cors());

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Method", "GET,PUT,POST,PUSH,DELETE,OPTIONS")
//     next();
// });
//routes
const joinRoutes = require('./routes/joinRoutes');
const { addUser, getUser, removeUser, getUserInRoom } = require('./user');
const user = require('./user');

//using routes...

const io = socketio(server);

app.use(joinRoutes);
//setting up the socket.io
io.on('connection', (socket) => {

    //console.log("new user joined")
    socket.on('join', ({ name, room }, cb) => {

        //console.log(name,room);
        const { error, user } = addUser({ id: socket.id, name, room });

        console.log(user);

        if (error) return cb(error);

        //to show welcome msg to user.......
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });

        //to send msg to all other users about new joinin,...,.....
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined..!!` });

        socket.join(user.room)

        socket.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room) })

        cb();
    })
    //gettig user msg from the front end.......
    socket.on('sendMessage', (message, cb) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });
        io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room) });

        cb();

    })



    socket.on('leaveRoom', (cb) => {
        // console.log(socket.id + '66');

        const user = removeUser(socket.id);
        // console.log(user);
        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.!!!!` })

        }
    })
})



const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`sever running on ${PORT}`)
})
