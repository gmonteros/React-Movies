import React, { useState, useEffect } from 'react';
import './Home.css';
import MovieListItem from './MovieListItem';

const MovieList = (props) => {
	return (
		<div className='box'>
			{props.movies.map((movie, index) => (
				<MovieListItem key={movie.movieUUID} movie={movie}
					opendetail={props.openDetail}
				/>
			))}
		</div>
	);
};

export default MovieList;
