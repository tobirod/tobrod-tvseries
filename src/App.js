import React from 'react'
import './App.css';

import SearchBar from './components/SearchBar'
import ContentView from './components/ContentView'
import DetailedView from './components/DetailedView'
import Footer from './components/Footer'

export default function App() {
  const [content, setContent] = React.useState({})

  function handleContent(result) {
    setContent(result)
  }

  return (
    <div className="App">
      <SearchBar contentHandler={handleContent} />
      <ContentView content={content} />
      <Footer />
    </div>
  );
}
