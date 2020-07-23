import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const editMovie = () => {
    push(`/update-movie/${movie.id}`);
  };

  const deleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then((res) => {
        console.log("DELETE SUCCESS", res);
      })
      .catch((err) => {
        console.log("DELETE ERROR:", err);
      });
    push(`/`);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div className="button-group">
        <div className="button" onClick={saveMovie}>
          Save
        </div>
        <div className="button" onClick={editMovie}>
          Edit
        </div>
        <div className="button" onClick={deleteMovie}>
          Delete
        </div>
      </div>
    </div>
  );
}

export default Movie;
