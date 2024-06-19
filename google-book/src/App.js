import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Main from './Main'
import BookOverview from './components/BookOveriw/BookOverview'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/details/:bookId" element={<BookOverview />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
