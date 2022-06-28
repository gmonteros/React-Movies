import React from 'react';

const MovieList = (props) => {
	const FavouriteComponent = props.favouriteComponent;

	return (
		<>
			{props.movies.map((movie, index) => (
				<div key={movie.movieUUID} className='image-container d-flex justify-content-start m-3'>
					<img src={`http://localhost:8083/posters/${movie.posterPath}`} alt='movie' onClick={() => {
						props.opendetail(movie.movieUUID) // get movie details
						/* props.showTrailer(movie.movieUUID) */ // get movie trailer youtube link
					}}></img>
					<h2 onClick={() => {
						props.opendetail(movie.movieUUID)
					}}>
						{movie.title} ({movie.releaseYear})</h2>
					{/* 	<div
						onClick={() => props.handleFavouritesClick(movie)}
						className='overlay d-flex align-items-center justify-content-center'
					>
						<FavouriteComponent />
					</div> */}
				</div>
			))}
		</>
	);
};

export default MovieList;
