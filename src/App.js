import React,{useState} from 'react';
import './App.css';
import MovieCard from './MovieCard';

const API_URL='http://www.omdbapi.com/?i=tt3896198&apikey=1357519e';

function App() {

  const [searchTerm,setSearchTerm]=useState('');
  const [movies,setMovies]=useState([]);
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const searchMovies=async(page=1)=>{
    if(!searchTerm.trim()){
      setError('please enter a movie name.');
      setMovies([]);
      return;
    }

    try{
      setLoading(true);
      const response = await fetch(`${API_URL}&s=${searchTerm}&page=${page}`);
      const data = await response.json();

      if(data.Response==='True'){
        const totalResults=parseInt(data.totalResults);
        setTotalPages(Math.ceil(totalResults/10));
        setCurrentPage(page);
        setMovies(data.Search);

        const sortedMovies = data.Search
          .filter((movie) => movie.Year && /\d{4}/.test(movie.Year))
          .sort((a, b) => {
            const yearA = parseInt(a.Year.match(/\d{4}/));
            const yearB = parseInt(b.Year.match(/\d{4}/));
            return yearB - yearA;
          });
        setMovies(sortedMovies);

        setError('');
      }

      else{
        setMovies([]);
        setError(data.Error || 'No movies found.');
      }
    }
    catch{
      setError('Something went wrong. Please try again.');
      setMovies([]);
    }
    finally{
      setLoading(false);
    }
  };


  return (
    <div className="app-container">

      <h1>🎬 MovieLand</h1> 

      <div className='search-bar'>
        <input 
          type='text' placeholder='Search Movies...' value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
          onKeyDown={(e)=>{
            if(e.key==="Enter") searchMovies(1);
            
          }}>
        </input>
        <button onClick={() => searchMovies(1)}>Search</button>
      </div>

      {error && <p className='error'></p>}
      {loading && <p className='loading'>Loading...</p>}

      <div className='movie-list'>
          {movies.map((movie)=>(
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
      </div>

      <div className='pagination'>
        {currentPage>1 && (<button onClick={()=>searchMovies(currentPage - 1)}>Previous</button>)}
        <span>Page {currentPage} of {totalPages}</span>
        {currentPage < totalPages && (<button onClick={()=>searchMovies(currentPage + 1)}>Next</button>)}
      </div>


    </div>
  );



}

export default App;


