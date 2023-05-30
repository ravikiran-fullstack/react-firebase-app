import { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/Auth';
import { auth, db } from './config/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';

function App() {
  const [movieList, setMovieList] = useState([]);

  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [oscar, setOscar] = useState(true);

  const [updatedOscar, setUpdatedOscar] = useState(false);

  const moviesCollectionRef = collection(db, 'movies');

  const getMovieList = async () => {
    // READ THE DATA
    // SET THE MOVIE LIST
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      console.log(filteredData);
      setMovieList(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmit = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title,
        releaseDate: year,
        oscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, 'movies', id);
    try {
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (error) {
      console.log(error);
    }
  };

  const updateMovieOscar = async (id) => {
    const movieDoc = doc(db, 'movies', id);
    try {
      await updateDoc(movieDoc, { oscar: updatedOscar });
      getMovieList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h2>React with Firebase</h2>
      <Auth />

      <div>
        <input
          type="text"
          name="title"
          placeholder="Movie Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          name="title"
          placeholder="Release Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          type="checkbox"
          name="title"
          checked={oscar}
          id="oscar"
          onChange={(e) => setOscar(e.target.checked)}
        />
        <label htmlFor="oscar">Received an Oscar</label>
        <button onClick={onSubmit}>Submit</button>
      </div>

      <div>
        {movieList &&
          movieList.map((movie) => (
            <div>
              <h1 style={{ color: movie.oscar ? 'green' : 'red' }}>
                {movie.title}
              </h1>
              <p>Date: {movie.releaseDate}</p>
              <input
                type="checkbox"
                name="updatedOscar"
                value={updatedOscar}
                onChange={(e) => setUpdatedOscar(e.target.checked)}
              />
              <button onClick={() => updateMovieOscar(movie.id)}>Update</button>
              <button onClick={() => deleteMovie(movie.id)}>
                Delete Movie
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
