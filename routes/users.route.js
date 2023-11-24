const express = require('express');
const router = express.Router();
const UsersService = require('../services/users.service');

router.use(express.json());
const usersService = new UsersService();

// Route pour répondre à la requête GET /users/{id}
router.get('/:id', (req, res) => {
    const userId = parseInt(req.params.id); // Convertir le paramètre en nombre entier
    console.log(`Requête GET reçue pour l'utilisateur ${userId}`);

    // Recherchez l'utilisateur correspondant à l'ID fourni
    const user = usersService.getUserById(userId);

    if (user) {
        // Si un utilisateur est trouvé, renvoyez-le avec le code 200
        res.status(200).json(user);
    } else {
        // Si aucun utilisateur correspondant n'est trouvé, renvoyez une erreur 404
        res.status(404).json({
            error: 'Utilisateur non trouvé'
        });
    }
});

// Route pour ajouter un utilisateur avec la méthode POST /users
router.post('/', (req, res) => {
    if (req.body) {
        const user = req.body;
        const keys = Object.keys(user);
        console.log(`Requête POST reçue pour l'utilisateur ${user.name}`);
        if (user.name && keys.length === 1 && user.name !== '' && typeof user.name === 'string') {
            // Ajouter l'utilisateur à la liste des utilisateurs
            usersService.addUser(user);
            // Renvoyer une réponse 201 Created
            res.status(201).json(user);
        } else {
            // Si le nom d'utilisateur n'est pas fourni, renvoyer une erreur 400 Bad Request
            res.status(400).json({
                error: 'Utilisateur non valide'
            });
            return;
        }
    } else {
        console.log(req.body);
        // Si aucun utilisateur n'est fourni, renvoyer une erreur 400 Bad Request
        res.status(400).json({
            error: 'Utilisateur non valide'
        });
    }
});


module.exports = router;