const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users.route');

const app = express();
const PORT = 3000;
app.use(cors());

app.get('/', (req, res) => {
    res.status(200);
    res.send("Hello World");
});

// Utilisation du routeur des utilisateurs
app.use('/users', usersRouter);

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
});

module.exports = app;