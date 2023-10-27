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

}

module.exports = new UsersService();