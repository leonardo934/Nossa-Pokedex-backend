const express = require("express");
const router = express.Router();

const userController = require("../controllers/userControllers")
const pokemonController = require("../controllers/pokemonControllers")
const catchPokemonController = require("../controllers/catchPokemonControllers")
const userPokemonController = require("../controllers/userPokemonControllers")

router.get('/users', userController.listUsers);
router.post('/user', userController.createUser);
router.get('/user/:id',userController.getUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id',userController.deleteUser);

router.get('/pokemons', pokemonController.listPokemons);

router.post('/catch/:userId',catchPokemonController.catchPokemon );

router.get('/mypokemons/:userId',userPokemonController.userPokemonList);

module.exports = router;