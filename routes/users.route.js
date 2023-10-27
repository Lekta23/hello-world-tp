const express = require('express');
const router = express.Router();
const UsersService = require('../services/users.service');

// Route pour répondre à la requête GET /users/{id}
router.get('/:id', (req, res) => {
    const userId = parseInt(req.params.id); // Convertir le paramètre en nombre entier
    console.log(`Requête GET reçue pour l'utilisateur ${userId}`);

    // Recherchez l'utilisateur correspondant à l'ID fourni
    const user = UsersService.getUserById(userId);

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

module.exports = router;