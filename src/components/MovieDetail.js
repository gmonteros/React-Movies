import '../detail.css'
//import Stars from 'simple-rating-stars';
import ReactPlayer from 'react-player'
/* const SomeStars = (vote) => (

    <Stars
        stars={Math.round(vote) - 5}
        outOf={5}
        full={'#d00'}
        empty={'#E1F1FF'}
        stroke={'#fff'}
    />
); */

let getCategories = (cat) => {
    let categories = []
    cat.genres.forEach(genre => {
        categories.push(genre.name)
    })
    return categories.toString()
}

function MovieDetail({ selected, exitbutton, trailer }) {

    return (
        <div className="detail">
            <div className="movie-card">
                <div className="container">
                    <a href="#"><img src={`http://localhost:8083/posters/${selected.posterPath}`} alt="cover" width='250' className="cover" /></a>
                    {/* <div className="hero" style={{ backgroundImage: `url(${'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces' + selected.posterPath})` }}> */}
                    <div className="hero" style={{ backgroundImage: `url('http://localhost:8083/posters/${selected.posterPath}')` }}>
                        <div className="details">
                            <div className="title1">{selected.title} </div>
                            <div className="title2">Categories: {selected.genre}</div>
                            {/*  
                            <fieldset className="rating">
                                {SomeStars(selected.vote_average)}
                            </fieldset> */}
                            {/* <span className="likes">{selected.vote_count} likes</span> */}
                        </div>
                    </div>
                    <div className="description">
                        <div className="column2">
                            <p>{selected.synopsis}</p>
                        </div>
                        <div className="column3">
                            <h3>Trailer:</h3>
                            {console.log(trailer)}
                            <ReactPlayer width="100%" height="200px" url={`http://localhost:8083/videos/${selected.videoPath}`} playing />
                        </div>
                    </div>
                    <a href="#" onClick={() => exitbutton()} className="close" />
                </div>
            </div>
        </div>
    )
}

export default MovieDetail