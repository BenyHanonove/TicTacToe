import './App.css';
import {BrowserRouter ,Route ,Routes} from "react-router-dom";
import IndexPage from "./pages/IndexPage.js";
import SearchPage from './pages/SearchPage.js';
import GamePage from './pages/GamePage.js';
import WinPage from './pages/WinPage.js';
import LosePage from './pages/LosePage.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<IndexPage/>}/>
        <Route path='/search' element={<SearchPage/>}/>
        <Route path='/game' element={<GamePage/>}/>
        <Route path='/win' element={<WinPage/>}/>
        <Route path='/lose' element={<LosePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;