import React from 'react';
import './Home.css';

const MovieList = (props) => {
	const FavouriteComponent = props.favouriteComponent;

	return (
		<div className='box'>
			{props.movies.map((movie, index) => (
				<div key={movie.movieUUID} className='image-container'/*  d-flex justify-content-start m-3 */>
					<img src={`http://localhost:8083/posters/${movie.posterPath}`} alt='movie' onClick={() => {
						props.opendetail(movie.movieUUID) // get movie details
						/* props.showTrailer(movie.movieUUID) */ // get movie trailer youtube link
					}}></img>
					<p onClick={() => {
						props.opendetail(movie.movieUUID)
					}}>
						{movie.title} ({movie.releaseYear})</p>
					{/* 	<div
						onClick={() => props.handleFavouritesClick(movie)}
						className='overlay d-flex align-items-center justify-content-center'
					>
						<FavouriteComponent />
					</div> */}
				</div>
			))}
		</div>
	);
};

export default MovieList;
