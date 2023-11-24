const request = require("supertest");
const app = require("../index");

const _ = require("lodash");
const {
    chunk
} = require("lodash");

describe("Index", () => {
    it('Should return "Hello World" on the / route', async () => {
        const response = await request(app).get("/");
        expect(response.status).toBe(200);
        expect(response.text).toBe("Hello World");
    });

    it("Should return a 404 error on a non-existent route", async () => {
        const response = await request(app).get("/non-existent-route");
        expect(response.status).toBe(404);
    });
});

describe("Users API", () => {
    describe("GET /users", () => {
        it("should return an existing user with status code 200", async () => {
            const response = await request(app).get("/users/1");
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                id: 1,
                name: "Cindy",
            });
        });

        it("should return a 404 error for a non-existent user", async () => {
            const response = await request(app).get("/users/999"); // Non-existent user
            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual({
                error: "Utilisateur non trouvé",
            });
        });
    });

    describe("POST /users", () => {
        it('should successfully add a user', async () => {
            const response = await request(app)
                .post('/users')
                .send({
                    name: 'John Doe'
                });

            expect(response.statusCode).toBe(201);
            expect(response.body.name).toBe('John Doe');
        });

        it('should return a 400 error if the username is not provided', async () => {
            const response = await request(app)
                .post('/users')
                .send({});

            expect(response.statusCode).toBe(400);
            expect(response.body.error).toBe('Utilisateur non valide');
        });

        it('should return a 400 error if additional fields are used along with name', async () => {
            const response = await request(app)
                .post('/users')
                .send({
                    name: 'John Doe',
                    age: 30
                });

            expect(response.statusCode).toBe(400);
            expect(response.body.error).toBe('Utilisateur non valide');
        });

        it('should return a 400 error if fields other than name are used', async () => {
            const response = await request(app)
                .post('/users')
                .send({
                    age: 30
                });

            expect(response.statusCode).toBe(400);
            expect(response.body.error).toBe('Utilisateur non valide');
        });

        it('should return a 400 error if a number is sent as the name', async () => {
            const response = await request(app)
                .post('/users')
                .send({
                    name: 30
                });

            expect(response.statusCode).toBe(400);
            expect(response.body.error).toBe('Utilisateur non valide');
        });

        it('should return a 400 error if the name is empty', async () => {
            const response = await request(app)
                .post('/users')
                .send({
                    name: ''
                });

            expect(response.statusCode).toBe(400);
            expect(response.body.error).toBe('Utilisateur non valide');
        });
    });
});

describe('UsersService', () => {
    const UsersService = require('../services/users.service');
    let usersService;

    beforeEach(() => {
        // Before each test, reset the user service instance
        usersService = new UsersService();
    });

    describe('getUserById', () => {
        it('should return an existing user by their ID', () => {
            const user = usersService.getUserById(1);
            expect(user).toEqual({
                id: 1,
                name: 'Cindy'
            });
        });

        it('should return undefined if no user exists with that ID', () => {
            const user = usersService.getUserById(99);
            expect(user).toBeUndefined();
        });
    });

    describe('addUser', () => {
        it('should add a user with a correctly incremented ID', () => {
            const newUser = {
                name: 'John Doe'
            };

            usersService.addUser(newUser);

            expect(usersService.users.length).toBe(4);
            expect(usersService.users[3]).toEqual({
                id: 4,
                name: 'John Doe'
            });
        });
    });
});

describe("Lodash", () => {
    describe("Chunk", () => {
        beforeEach(() => {
            inputArray = [1, 2, 3, 4, 5, 6, 7];
            chunkSize = 3;
        });
        it("Should divide an array into chunks of a given size", () => {
            expect(chunk(inputArray, chunkSize)).toEqual([
                [1, 2, 3],
                [4, 5, 6],
                [7]
            ]);
        });

        // Edge case
        it("Should handle an invalid chunk size", () => {
            chunkSize = -2; // Negative chunk size
            expect(chunk(inputArray, chunkSize)).toEqual([]);
        });

        it("Should handle an empty array", () => {
            inputArray = [];
            expect(chunk(inputArray, chunkSize)).toEqual([]);
        });

        it("Should handle an empty array and an invalid chunk size", () => {
            inputArray = [];
            chunkSize = 0; // Zero chunk size
            expect(chunk(inputArray, chunkSize)).toEqual([]);
        });
    });

    // MAP
    describe("Map", () => {
        beforeEach(() => {
            inputArray = [1, 2, 3, 4, 5, 6, 7];
            callback = (x) => x * 2;
        });
        it("Should apply the callback function to all elements of an array", () => {
            expect(_.map(inputArray, callback)).toEqual([2, 4, 6, 8, 10, 12, 14]);
        });

        it("Should handle an empty array", () => {
            inputArray = [];
            expect(_.map(inputArray, callback)).toEqual([]);
        });

        it("Should handle an invalid function", () => {
            callback = "not a function";
            expect(_.map(inputArray, callback)).toEqual([]);
        });
    });

    // INTERSECTION
    describe("Intersection", () => {
        beforeEach(() => {
            inputArray = [2, 3, 4, 5, 6, 7, 8];
            inputArray2 = [1, 2, 3, 4, 5, 6, 7];
        });
        it("Should return an array with elements common to both arrays", () => {
            expect(_.intersection(inputArray, inputArray2)).toEqual([
                2, 3, 4, 5, 6, 7,
            ]);
        });

        it("Should handle an empty array", () => {
            inputArray = [];
            expect(_.intersection(inputArray, inputArray2)).toEqual([]);
        });

        it("Should handle an invalid function", () => {
            inputArray = "not an array";
            expect(_.intersection(inputArray, inputArray2)).toEqual([]);
        });
    });

    // UNION
    describe("Union", () => {
        let inputArray;
        let inputArray2;

        beforeEach(() => {
            inputArray = [2, 3, 4, 5, 6, 7, 8];
            inputArray2 = [1, 2, 3, 4, 5, 6, 7];
        });

        it("Should return an array with all elements from both arrays", () => {
            expect(_.union(inputArray, inputArray2)).toEqual([
                2, 3, 4, 5, 6, 7, 8, 1,
            ]);
        });

        it("Should handle an empty array", () => {
            inputArray = [];
            expect(_.union(inputArray, inputArray2)).toEqual(inputArray2);
        });

        it("Should handle an invalid function", () => {
            inputArray = "not an array";
            expect(_.union(inputArray, inputArray2)).toEqual(inputArray2);
        });
    });

    // FLAT MAP
    describe("FlatMap", () => {
        let inputArray;
        let callback;

        beforeEach(() => {
            inputArray = [1, 2, 3, 4, 5, 6, 7];
            callback = (x) => [x, x];
        });

        it("Should apply the callback function to all elements of an array and flatten the result", () => {
            expect(_.flatMap(inputArray, callback)).toEqual([
                1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7,
            ]);
        });

        it("Should handle an empty array", () => {
            inputArray = [];
            expect(_.flatMap(inputArray, callback)).toEqual([]);
        });

        it("Should handle an invalid function", () => {
            callback = "not a function";
            expect(_.flatMap(inputArray, callback)).toEqual([]);
        });
    });

    // MAX
    describe("Max", () => {
        let inputArray;

        beforeEach(() => {
            inputArray = [1, 2, 3, 99, 5, 6, 7];
        });

        it("Should return the maximum value of an array", () => {
            expect(_.max(inputArray)).toEqual(99);
        });

        it("Should handle an empty array", () => {
            inputArray = [];
            expect(_.max(inputArray)).toEqual(undefined);
        });

        it("Should handle an invalid function", () => {
            inputArray = "not an array";
            expect(_.max(inputArray)).toEqual("y");
        });

        it("Should handle an array of strings", () => {
            inputArray = ["a", "b", "c", 4];
            expect(_.max(inputArray)).toEqual("c");
        });
    });

    // MAX BY
    describe("MaxBy", () => {
        // Nominal case
        it("Should return the element with the highest value of the specified property", () => {
            const inputArray = [{
                name: "Alice",
                age: 30
            }, {
                name: "Bob",
                age: 25
            }, {
                name: "Charlie",
                age: 35
            }, ];

            const result = _.maxBy(inputArray, "age");
            expect(result).toEqual({
                name: "Charlie",
                age: 35
            });
        });

        // Edge case
        it("Should return undefined for an empty array", () => {
            const inputArray = [];
            const result = _.maxBy(inputArray, "age");
            expect(result).toBeUndefined();
        });

        it("Should return undefined if the specified property does not exist in the objects of the array", () => {
            const inputArray = [{
                name: "Alice",
                height: 160
            }, {
                name: "Bob",
                height: 175
            }, {
                name: "Charlie",
                height: 150
            }, ];

            const result = _.maxBy(inputArray, "age"); // The 'age' property does not exist
            expect(result).toBeUndefined();
        });

        it("Should return the first element if multiple elements have the same maximum value", () => {
            const inputArray = [{
                name: "Alice",
                age: 30
            }, {
                name: "Bob",
                age: 35
            }, {
                name: "Charlie",
                age: 35
            }, ];

            const result = _.maxBy(inputArray, "age");
            expect(result).toEqual({
                name: "Bob",
                age: 35
            });
        });
    });
});