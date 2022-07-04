import './App.css';
import Home from './components/Home';
/* import Contact from './components/Contact'
import Watchlist from './components/Watchlist' */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>

      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/contact' element={<Contact />} />
          <Route path='/watchlist' element={<Watchlist />} /> */}
        </Routes>
        <Footer />
      </Router>


    </>
  );
};

export default App;
