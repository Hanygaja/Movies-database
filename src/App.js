import React, { useState } from 'react';
import axios from 'axios'

import Search from './components/Search'
import Results from './components/Results'
import Popup from './components/Popup'
  

function App() {
  // Create a state
  const [state, setState] = useState({
    m: "",  // Entering in the search will be in the m:
    results: [],  // Data from API are saved in the results:
    selected: {}  // Data from API as the Title is save in the selected:
  });

  // API key
    const apiurl="https://www.omdbapi.com/?apikey=a9cda433";

  // Search request ( Listen to a key )
    const search = (e) => {
      if (e.key === "Enter") {
        axios(apiurl + "&s=" + state.m).then(({ data }) => {
          let results = data.Search;
          
          setState(prevState => {
            return { ...prevState, results: results }
          })
        });
      }
    }


  // When someone press a key in the search
    const handleInput = (e) => {
      let s = e.target.value;

      setState(prevState => {
        return { ...prevState, m: s }
      });
    }

    // Popup info
    const openPopup = id => {
      axios(apiurl + "&i=" + id).then(({ data }) => {
        let result = data;

        

        setState(prevState => {
          return { ...prevState, selected: result }
        });
      });
    }

    const closePopup = () => {
      setState(prevState => {
        return { ...prevState, selected: {} }
      })
    }

    return (
      <div className="App">
        <header>
          <h1>Movie Database</h1>
        </header>
        <main>
          <Search handleInput={handleInput} search={search} />

          <Results results={state.results} openPopup={openPopup} />

          {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
        </main>
      </div>
    )
  } 

export default App;
