import React from 'react'
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './App.css'

import Main from './components/Main/Main'
import BookOverview from './components/BookOverview/BookOverview'
import Login from './components/Login/Login'
import Favorites from './components/Favorites/Favorites'
import { FavoritesProvider } from './contexts/FavoritesContext'

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <NavLink to="/" className="navbar-brand" end>Главная</NavLink>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">Войти</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/favorites" className="nav-link">Избранное</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/details/:bookId" element={<BookOverview />} />
            <Route path="/login" element={<Login />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </Router>
    </FavoritesProvider>
  )
}

export default App
