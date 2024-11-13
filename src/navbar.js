import * as React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/home'
import About from './pages/about'
import Contact from './pages/contact'
import PostForm from './pages/PostForm';
import MarketPlace from './pages/MarketPlace';
import { ToastContainer } from 'react-toastify';

function NavBar() {

    return(
        <div>
            <Router>
                <div>
                    <nav className="flex space-x-4 bg-purple-800 p-4">
                        <div className="container mx-auto flex justify-between items-center">
                            <ul className="flex space-x-4 ml-auto">
                                <li><Link to="/" className="text-white p-4 font-bold hover:bg-purple-300 hover:text-blue-500">Home</Link></li>
                                <li><Link to="/about" className="text-white p-4 font-bold hover:bg-purple-300 hover:text-blue-500">About</Link></li>
                                <li><Link to="/contact" className="text-white p-4 font-bold hover:bg-purple-300 hover:text-blue-500">Contact</Link></li>
                                <li><Link to="/MarketPlace" className="text-white p-4 font-bold hover:bg-purple-300 hover:text-blue-500">Shop</Link></li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path='/adminForm' element={<PostForm />} />
                    <Route path='/shop' element={<MarketPlace />} />
                </Routes>
            </Router>
            <ToastContainer />
        </div>
    )
}

export default NavBar