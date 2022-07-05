import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import './Home.css';
import MovieDetail from './MovieDetail';
import MovieList from './MovieList';
import SearchBox from './SearchBox';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [selected, setSelected] = useState({});
	const [trailer, setTrailer] = useState([]);

	const getMovieRequest = async (searchValue) => {
		if (!searchValue) {
			return;
		}

		//const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;
		//const url = `http://localhost:8080/api/search?title=${searchValue}`;
		const url = `http://localhost:8083/api/movies/getMoviesByTitleContaining/${searchValue}`;
		//const url = `https://api.themoviedb.org/3/${searchValue}/movie?api_key=07a61de5b731a869bc9cec8e25d2c8a8&query=`;
		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson) {
			setMovies(responseJson);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);


	// exit modal exit component
	const exitButton = () => {
		setSelected({});
	}

	const openDetail = (UUID) => {
		//const api = `https://api.themoviedb.org/3/movie/${imdbID}?api_key=07a61de5b731a869bc9cec8e25d2c8a8`
		const api = `http://localhost:8083/api/movies/getMovie/${UUID}`;
		axios(api)
			.then(res => res)
			.then(data => {
				setSelected(data.data);
			})
	}

	/* let showTrailer = (imdbID) => {
		//axios('https://api.themoviedb.org/3/movie/' + imdbID + '/videos?api_key=07a61de5b731a869bc9cec8e25d2c8a8')
		axios('http://localhost:8083/api/movies/getMovie/' + imdbID + '/videos?api_key=07a61de5b731a869bc9cec8e25d2c8a8')
			.then(res => res)
			.then(data => {
				if (data.data.results.length === 0) {
					setTrailer('https://www.youtube.com/watch?v=tvJTFMQei4g');
				} else {
					setTrailer('https://www.youtube.com/watch?v=' + data.data.results[0].key);
				}
			})
	}
 */
	return (
		<>
			<div align="center">
				<h1>Films</h1>
			</div>
			<div className='container' /*-fluid movie-app' */>
				<div className='row d-flex align-items-center mt-4 mb-4' >
					{/* <img
						src="https://cdn.atomix.vg/wp-content/uploads/2022/05/netflix-comerciales.jpg"
						alt=""
					/> */}
					<img
						src="https://t-mobile.scene7.com/is/image/Tmusprod/netflix-hero.desktop?wid=1280&hei=360&fmt=png-alpha"
						alt=""
					/>
				</div>
				<div className='row justify-content-md-center'>
					<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
				</div>
				<div className='row'>
					<MovieList
						movies={movies}
						opendetail={openDetail}
					/* showTrailer={showTrailer} */
					/>
				</div>
				<div className='row'>
					{console.log('selected', (typeof selected.title) != 'string' ? false : true)}
					{
						(typeof selected.title != 'string')
							? false
							: <MovieDetail selected={selected} /* trailer={trailer} */ exitbutton={exitButton}
							/>
					}
				</div>
			</div>
		</>
	);
};

export default App;
