import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import MovieDetail from './components/MovieDetail';
import axios from 'axios';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [selected, setSelected] = useState({});
	const [trailer, setTrailer] = useState([]);

	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

		//const url = `https://api.themoviedb.org/3/${searchValue}/movie?api_key=07a61de5b731a869bc9cec8e25d2c8a8&query=`;
		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	// exit modal exit component
	const exitButton = () => {
		setSelected({});
	}

	const openDetail = (imdbID) => {
		const api = `https://api.themoviedb.org/3/movie/${imdbID}?api_key=07a61de5b731a869bc9cec8e25d2c8a8`
		axios(api)
			.then(res => res)
			.then(data => {
				setSelected(data.data);
			})
	}

	let showTrailer = (imdbID) => {
		axios('https://api.themoviedb.org/3/movie/' + imdbID + '/videos?api_key=07a61de5b731a869bc9cec8e25d2c8a8')
			.then(res => res)
			.then(data => {
				if (data.data.results.length === 0) {
					setTrailer('https://www.youtube.com/watch?v=tvJTFMQei4g');
				} else {
					setTrailer('https://www.youtube.com/watch?v=' + data.data.results[0].key);
				}
			})
	}

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<MovieList
					movies={movies}
					handleFavouritesClick={addFavouriteMovie}
					favouriteComponent={AddFavourites}
					opendetail={openDetail}
					showTrailer={showTrailer}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>
			<div className='row'>
				<MovieList
					movies={favourites}
					handleFavouritesClick={removeFavouriteMovie}
					favouriteComponent={RemoveFavourites}
				/>
			</div>
			<div className='row'>
				{console.log('selected', (typeof selected.original_title) != 'string' ? false : true)}
				{
					(typeof selected.original_title != 'string')
						? false
						: <MovieDetail selected={selected} trailer={trailer} exitbutton={exitButton}
						/>
				}
			</div>
		</div>
	);
};

export default App;
