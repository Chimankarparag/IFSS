const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema(
  {
    Name: String,
    Pokedex_Number: Number,
    Type1: String,
    Type2: String,
    Classification: String,
    Height: Number,
    Weight: Number,
    Abilities: String,
    Generation: Number,
    Legendary_Status: String,
  },
  { collection: "poke" } // ✅ Explicitly set collection name
);

const Pokemon = mongoose.model("Pokemon", pokemonSchema); 
module.exports = Pokemon;
