const UsersRepository = require("../repos/users.repository");

class UsersService {
    usersRepository = new UsersRepository();

    getUserById(id) {
        return this.usersRepository.listUsers.find((user) => user.id === id);
    }

    getUsers() {
        return this.usersRepository.listUsers;
    }

    addUser(user) {
        const id = this.usersRepository.listUsers.length + 1;
        this.usersRepository.listUsers.push({
            name: user.name,
            id: id
        });
        const addedUser = this.usersRepository.listUsers.find((user) => user.id === id);
        if (addedUser) {
            return addedUser;
        } else {
            throw new Error('User not add');
        }
    };
}


module.exports = UsersService;