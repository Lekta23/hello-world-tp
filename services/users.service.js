class UsersService {
    users = [{
            id: 1,
            name: 'Cindy'
        },
        {
            id: 2,
            name: 'Mario'
        },
        {
            id: 3,
            name: 'Karl'
        }
    ];

    getUserById(id) {
        return this.users.find((user) => user.id === id);
    }

    addUser(user) {
        const id = this.users.length + 1;
        this.users.push({
            name: user.name,
            id: id
        });
        const addedUser = this.users.find((user) => user.id === id);
        if (addedUser) {
            return addedUser;
        } else {
            throw new Error('User not add');
        }
    };
}


module.exports = UsersService;