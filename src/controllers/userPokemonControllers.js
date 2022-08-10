const database = require('../config/database');

const userPokemonList = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const getPokemonByUser = await database.query(`SELECT * FROM pokemon.user_pokemons WHERE user_id = $1`, [userId]);

        console.log(getPokemonByUser)

        if (getPokemonByUser.length) {
            const getPokemons = await database.query(`SELECT * FROM pokemon.pokemons WHERE id IN (${getPokemonByUser.map((pokemon, i) => `$${i + 1}`)})`,
                [...getPokemonByUser.map((pokemon) => pokemon.pokemon_id)]
            )

            return res.status(200).send(getPokemons)
        }

        return res.status(200).send({ menssage: 'pokemon not found' })


    } catch (error) {
        return res.status(400).send(error)
    }
}


module.exports = { userPokemonList };