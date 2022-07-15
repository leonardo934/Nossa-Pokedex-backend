const { v4: uuidv4 } = require('uuid');
const database = require('../config/database');
const api = require('../api/pokeApi');


const catchPokemon = async (req, res, next) => {

    try {
        const userId = req.params;
        const pokemon = req.body



        if (!userId) res.status(400).send({ error: "User not foud" });
        if (!pokemon.id) res.status(400).send({ error: "Pokemon not foud" });

        const capturedPokemon = await database.query(
            `INSERT INTO pokemon.pokemon(id , name, hp, attack, defense, special_attack, special_defense, speed, type_one, type_one, sprite,ability_one,ability_two,pokeapi_id)
       VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       RETURNING `,

            [...Object.values(pokemon).map(status => status)]
        )


        const caughtId = uuidv4()

        const userCaughtPokemon = await database.query(
            `INSERT INTO pokemon.user_pokemon( id, user_id, pokemon_ id) VALUES($1, $2, $3) RETURNING id, user_id, pokemon_id`,
            [userId, pokemon.id]
        )

        return res.status(200).send({
            user: userId,
            pokemon: pokemon.id,
            catch: caughtId,
        })

    } catch (error) {
        return res.status(400).send(error)
    }




}



module.exports = { catchPokemon }


