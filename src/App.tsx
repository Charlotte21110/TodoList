import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import './App.css'


function App() {

  return (
    <Router>
      <div>
        <ul className='index_ul'>
          <li className='index_li'>
            <Link to="/" className="nav-link">首页</Link>
          </li>
          <li className='index_li'>
            <Link to="/about" className="nav-link">日程清单</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;