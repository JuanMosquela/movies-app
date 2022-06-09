import { useEffect, useState } from 'react';
import './app.css';
import Movie from './components/Movie';
import SearchIcon from "./search.svg"

function App() {  

  const [input, setInput] = useState('')

  const [movies, setMovies] = useState([])

  const URL = "http://www.omdbapi.com/?i=tt3896198&apikey=459c19f3";

  const fetchData = async (title) => {
    const response = await fetch(`${URL}&s=${title}`);
    const data = await response.json(); 

    
    
    setMovies(data.Search)
  }

  useEffect(() =>{
    fetchData([])

  },[])

  useEffect(() => {
    fetchData()
  },[input])

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
        <img 
          src={SearchIcon} 
          alt="search-icon"
          onClick={() => fetchData(input)} 
        />
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
            <h2>Movies not found</h2>
          </div>
        )          
      }      
     
    </div>
  );
}

export default App;
