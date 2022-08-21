import { useEffect, useState } from 'react';
import './app.css';
import Movie from './components/Movie';
import {BiSearch} from 'react-icons/bi'

function App() {  

  const [input, setInput] = useState('')

  const [movies, setMovies] = useState([])

  const URL = "http://www.omdbapi.com/?i=tt3896198&apikey=459c19f3";

  useEffect(() =>{
    fetchData(['disney'])

  },[])

  const fetchData = async (title) => {
    const response = await fetch(`${URL}&s=${title}`);
    const data = await response.json();       
    
    setMovies(data.Search)
  }

  

  return (
    <div className="app">
      <h1>Movie app</h1>

      <div className="search">
        <input 
          
          type="text"
          placeholder='Search movies'
          value={input} 
          onChange={(e) => setInput(e.target.value)}
        />
        <BiSearch onClick={() => fetchData(input)} style={{ color:'#a1a1a1',  fontSize:'1.6rem', cursor:'pointer' }} />
      </div>

      {movies?.length > 0
        ?  (
          <div className="container">
          {movies.map((movie) => (
            <Movie
              id={movie.imdbID}              
              movie={movie} />
          ))} 
          </div>
        ) : (
          <div className="empty">
            <h2>Movies not founddd</h2>
          </div>
        )          
      }      
     
    </div>
  );
}

export default App;