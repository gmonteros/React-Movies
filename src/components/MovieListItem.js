import React, { useState, useEffect } from 'react';
import './Home.css';

const MovieListItem = (props) => {

	const [moviePoster, setMoviePoster] = useState([]);
	const getMovieRequest = async (movieTitle) => {
		if (!movieTitle) {
			return;
		}

		//const url = `http://localhost:8083/api/movies/getMoviesByTitle/${searchValue}`;

		const url = `https://api.themoviedb.org/3/search/movie?api_key=07a61de5b731a869bc9cec8e25d2c8a8&query=${movieTitle}`;
		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson) {
			if (responseJson.results && responseJson.results.length > 0) {
				setMoviePoster(responseJson.results[0].poster_path);
			}
		}
	};

	useEffect(() => {
		getMovieRequest(props.movie.title);
	}, [props.movie.title]);

	return (
		<div className='image-container'/*  d-flex justify-content-start m-3 */>
			<img src={'https://image.tmdb.org/t/p/original/' +moviePoster} width='150' alt='movie' onClick={() => {
				props.opendetail(props.movie.movieUUID) // get movie details
				/* props.showTrailer(movie.movieUUID) */ // get movie trailer youtube link
			}}></img>
			<p onClick={() => {
				props.opendetail(props.movie.movieUUID)
			}}>
				{props.movie.title} ({props.movie.releaseYear})</p>
			{/* 	<div
						onClick={() => props.handleFavouritesClick(movie)}
						className='overlay d-flex align-items-center justify-content-center'
					>
						<FavouriteComponent />
					</div> */}
		</div>
	);
};

export default MovieListItem;
