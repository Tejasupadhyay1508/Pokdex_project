import Search from "../search/Search";
//css import
import './Pokedex.css';
import PokemonList from "./PokemonList/PokemonList";

function Pokedex(){
    return(
        <div className="pokedex-wrapper">
         
        
              <Search />
              <PokemonList/>
        
        </div>
    )

}
export default Pokedex;