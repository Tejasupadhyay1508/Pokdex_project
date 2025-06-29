import Search from "../search/Search";
//css import
import './Pokedex.css';
import PokemonList from "./PokemonList/PokemonList";

function Pokedex(){
    return(
        <div className="pokedex-wrapper">
            <h1 id="Pokedex-heading">Pokedex</h1>
        
              <Search />
              <PokemonList/>
        
        </div>
    )

}
export default Pokedex;