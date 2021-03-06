// array to store users.........
const users = [];

//funtion to create user........
const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.name === name && user.room === room);

    if (existingUser) {
        return { error: "username is taken" }
    }

    const user = { id, name, room };

    users.push(user);

    return { user };


}

//function to remove user........................

const removeUser = (id) => {
    // console.log(users)
    // console.log(users.findIndex((user) => user.id === id));
    const index = users.findIndex((user) => user.id === id);
    // console.log(index);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }

}

const getUser = (id) => users.find(user => user.id === id)

const getUserInRoom = (room) => users.filter(user => user.room === room)

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUserInRoom
}