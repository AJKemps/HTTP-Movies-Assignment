import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const AddMovie = () => {
  const [movie, setMovie] = useState(initialMovie);
  const { id } = useParams();
  const { push } = useHistory();

  const handleChanges = (event) => {
    setMovie({
      ...movie,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies`, movie)
      .then((res) => {
        console.log("API PUT RESPONSE:", res.data);
        push(`/`);
      })
      .catch((err) => {
        console.log("API PUT ERROR:", err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <h1>Add Movie</h1>
          <div className="inputGroup">
            <label>Title</label>
            <input
              type="text"
              onChange={handleChanges}
              name="title"
              value={movie.title}
            />
          </div>
          <div className="inputGroup">
            <label>Director</label>
            <input
              type="text"
              onChange={handleChanges}
              name="director"
              value={movie.director}
            />
          </div>
          <div className="inputGroup">
            <label>Metascore</label>
            <input
              type="text"
              onChange={handleChanges}
              name="metascore"
              value={movie.metascore}
            />
          </div>
          <button type="submit">Add Movie</button>
        </div>
      </form>
    </div>
  );
};

export default AddMovie;
