import { useEffect,useState } from "react";
import axios from "axios";
import './PokemonList.css';
import Pokemon from "../../Pokemon/Pokemon";


function PokemonList(){
    const[pokemonList,setPokemonList] = useState([]);
    const[isLoading, setIsLoading] = useState(true);
    const [pokedexUrl, setPokedexUrl] =useState('https://pokeapi.co/api/v2/pokemon');

    const[nextUrl,setNextUrl] = useState('');
    const[prevUrl,setPrevUrl] = useState('');


    async function downloadPokemon(){
        setIsLoading(true); // Setting loading state to true before fetching data
        const response = await axios.get(pokedexUrl) // Fetching the data from the API
        const pokemonResults = response.data.results; // Getting the results from the response
        console.log(pokemonResults);
        //ITERATING OVER THE POKEMON RESULTS AND using their url to create an array of promises
        // that will download those 20 pokemon 
        const pokemonResultPromise = pokemonResults.map((pokemon)=> axios.get(pokemon.url));
      
        //passing that promise array to axios all
        const pokemonData = await axios.all (pokemonResultPromise);// array of 20 pokemon detailed data
        console.log(pokemonData);
        setNextUrl(response.data.next); 
        setPrevUrl(response.data.previous); //setting the next and previous urls for pagination

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
        
    },[pokedexUrl]);
    

    return(
        <div className="pokemon-list-wrapper">
         
         <div className="pokemon-wrapper">
            {(isLoading) ? 'Loading...' :
         pokemonList.map((p)=> <Pokemon name ={p.name} image={p.image} key ={p.id}/>)
         }
         </div>
         <div className="controls">
            <button disabled={prevUrl == null} onClick={()=> setPokedexUrl(prevUrl)}>Prev</button>
            <button  disabled={nextUrl == null} onClick={()=>setPokedexUrl(nextUrl)}>Next</button>
         </div>
         
         
        </div>
    )

}
export default PokemonList; 