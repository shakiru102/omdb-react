import { useEffect, useState } from 'react';
import './App.scss';
import Logo from './assets/MyTestApp.png'
import axios from 'axios'
import _ from 'lodash'

function App() {

  const [data, setdata] =  useState([])
  const [search, setsearch] = useState('')

  useEffect(async() => {
      const movies = await axios.get(`https://www.omdbapi.com?i=tt3896198&apikey=7645a5c3&s=${search != '' ? search : 'movies'}`)
      let groupData = _.groupBy(movies.data.Search, 'Type')
      setdata(Object.entries(groupData))
      
  },[search])

  return (
    <div className="App">
      <div className='app-bar'>
          <img src={Logo} alt="logo" />
        </div>
      <div className='container'>
        <div className='title'>
           Watch something incredible.
        </div>
      </div>
       <div className='body-content'>
         <label htmlFor='search' >Search</label>
         <input onChange={e => setsearch(e.target.value) }  id='search' />
         
         {
           data.length && data.map((movie, index) => (
             <div key={index} className="movie-container">
               <div className='movie-title'>{ movie[0] }</div>
                 <div className='layout'>
                    { movie[1].map((item, index) => (
                    <div key={index} className='img-container'>
                    <img src={item.Poster} />
                    <div className='movie-name'>{ item.Title }</div>
                  </div>
                  )) }
                 </div>
             </div>
           ))
         }
       </div>
    </div>
  );
}

export default App;
