import { useEffect,useState } from "react";
import axios from "axios";
import './PokemonList.css';
import Pokemon from "../../Pokemon/Pokemon";



function PokemonList(){
    // const[pokemonList,setPokemonList] = useState([]);
    // const[isLoading, setIsLoading] = useState(true);
    // const [pokedexUrl, setPokedexUrl] =useState('https://pokeapi.co/api/v2/pokemon');

    // const[nextUrl,setNextUrl] = useState('');
    // const[prevUrl,setPrevUrl] = useState('');
    const[pokemonListState, setPokemonListState]=useState({
        pokemonList:[],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl:'',
        prevUrl:''

    });


    async function downloadPokemon(){
        //setIsloading(true);
        setPokemonListState({...pokemonListState,isLoading:true}); // Setting loading state to true before fetching data
        const response = await axios.get(pokemonListState.pokedexUrl) // Fetching the data from the API
        const pokemonResults = response.data.results; // Getting the results from the response
        console.log("respnose ise",response.data,response.data.next);

        console.log(pokemonListState)
        setPokemonListState((state)=>({
            ...state,
            nextUrl: response.data.next,
            prevUrl: response.data.previous,
        }));
        //ITERATING OVER THE POKEMON RESULTS AND using their url to create an array of promises
        // that will download those 20 pokemon 
        const pokemonResultPromise = pokemonResults.map((pokemon)=> axios.get(pokemon.url));
      
        //passing that promise array to axios all
        const pokemonData = await axios.all (pokemonResultPromise);// array of 20 pokemon detailed data
        console.log(pokemonData);
        //  setPokemonListState({...pokemonListState,nextUrl:response.data.next, prevUrl:response.data.previous}); //
        // setPrevUrl(response.data.previous); //setting the next and previous urls for pagination

        //now iterate over the pokemonData to extract the data we need
        const pokeListResult = pokemonData.map((pokeData) => { 
            const pokemon = pokeData.data;
            return {name: pokemon.name,
                 image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny , 
                 types: pokemon.types,
                 id: pokemon.id,
                };
        });
        console.log(pokeListResult
        );
        setPokemonListState((state)=>({...state,pokemonList:pokeListResult,isLoading:false})); 
       
    }

    //useEffect hook to call the downloadPokemon function when the component mounts

    useEffect(() => {
        downloadPokemon();
        
    },[pokemonListState.pokedexUrl]);
    

    return(
        <div className="pokemon-list-wrapper">
         
         <div className="pokemon-wrapper">
            {(pokemonListState.isLoading) ? 'Loading...' :
         pokemonListState.pokemonList.map((p)=> <Pokemon name ={p.name} image={p.image} key ={p.id} id={p.id}/>)
         }
         </div>
         <div className="controls">
            <button disabled={pokemonListState.prevUrl == null} onClick={()=> {
                const UrltoSet = pokemonListState.prevUrl;
                setPokemonListState({...pokemonListState,   pokedexUrl: UrltoSet})
                
                }}>Prev</button>
            <button  disabled={pokemonListState.nextUrl == null} onClick={()=>{
                const UrltoSet = pokemonListState.nextUrl;
                setPokemonListState({...pokemonListState,pokedexUrl:UrltoSet})}
                }>Next</button>
         </div>
         
         
        </div>
    )

}
export default PokemonList; 