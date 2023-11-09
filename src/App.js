import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import WatchHistory from './pages/WatchHistory';
import { Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header/>
      
      <Routes> 
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={ <Home/>}/>
        <Route path='/watch-history' element={<WatchHistory/>}/>
      </Routes>

      <Footer/>
     
      
    </div>
  );
}

export default App;
