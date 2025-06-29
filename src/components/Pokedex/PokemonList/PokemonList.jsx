import { useEffect,useState } from "react";
import axios from "axios";
import './PokemonList.css';
import Pokemon from "../../Pokemon/Pokemon";


function PokemonList(){
    const[pokemonList,setPokemonList] = useState([]);
    const[isLoading, setIsLoading] = useState(true);
    const POKEDEX_URL ='https://pokeapi.co/api/v2/pokemon';
    async function downloadPokemon(){
        const response = await axios.get(POKEDEX_URL) // Fetching the data from the API
        const pokemonResults = response.data.results; // Getting the results from the response
        console.log(pokemonResults);
        //ITERATING OVER THE POKEMON RESULTS AND using their url to create an array of promises
        // that will download those 20 pokemon 
        const pokemonResultPromise = pokemonResults.map((pokemon)=> axios.get(pokemon.url));
      
        //passing that promise array to axios all
        const pokemonData = await axios.all (pokemonResultPromise);// array of 20 pokemon detailed data
        console.log(pokemonData);

        //now iterate over the pokemonData to extract the data we need
        const res = pokemonData.map((pokeData) => { 
            const pokemon = pokeData.data;
            return {name: pokemon.name,
                 image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny , 
                 types: pokemon.types,
                 id: pokemon.id,
                };
        });
        console.log(res);
        setPokemonList(res);
        setIsLoading(false);
    }

    //useEffect hook to call the downloadPokemon function when the component mounts

    useEffect(() => {
        downloadPokemon();
        
    },[]);
    

    return(
        <div className="pokemon-list-wrapper">
         <div>pokemon List</div> 
         {(isLoading) ? 'Loading...' :
         pokemonList.map((p)=> <Pokemon name ={p.name} image={p.image} key ={p.id}/>)
         }
         
        </div>
    )

}
export default PokemonList; 