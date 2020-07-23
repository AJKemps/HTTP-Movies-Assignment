import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UdpateForm = () => {
  const [movie, setMovie] = useState(initialMovie);
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log("API GET RESPONSE:", res.data);
        setMovie(res.data);
      })
      .catch((err) => {
        console.log("API GET ERROR:", err);
      });
  }, [id]);

  const handleChanges = (event) => {
    setMovie({
      ...movie,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        console.log("API PUT RESPONSE:", res.data);
        push(`/movies/${id}`);
      })
      .catch((err) => {
        console.log("API PUT ERROR:", err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Update Form</h1>
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
        <button type="submit">Update Movie</button>
      </form>
    </div>
  );
};

export default UdpateForm;
