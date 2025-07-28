import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {

  const handleimdbClick= ()=>{
    const formattedTitle=movie.Title.trim().replace(/\s+/g, '_');
    const imdbUrl = `https://www.imdb.com/find?q=${encodeURIComponent(`${movie.Title} ${movie.Year}`)}`;
    window.open(imdbUrl,'_blank');
  }

  const handlewikiClick= ()=>{
    const formattedTitle=movie.Title.trim().replace(/\s+/g, '_');
    const wikiUrl = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(`${movie.Title}`)}`;
    //const wikiUrl = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(`${movie.Title} ${movie.Year}`)}`;
    window.open(wikiUrl,'_blank');
  }

  

  return (
    <div className="movie-card">
      <div className="movie-year">
        <p>{movie.Year}</p>
        <img src="/imdb.png" alt="IMDb Icon" onClick={handleimdbClick}/>
        <img src="/svgviewer-output.svg" alt="IMDb Icon" onClick={handlewikiClick} class="wiki_logo"/>

      </div>

      <div className="movie-poster">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'}
          alt={movie.Title}
        />
      </div>

      <div className="movie-info">
        <span>{movie.Type}</span>
        <h3>{movie.Title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
