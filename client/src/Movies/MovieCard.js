import React from "react";
import { motion } from "framer-motion";

const MovieCard = (props) => {
  const { title, director, metascore, stars, id } = props.movie;
  return (
    <motion.div
      className="movie-cards"
      initial={{
        opacity: 1,
        y: 100,
        scale: 0,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 1 + id / 2,
      }}
    >
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map((star) => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
    </motion.div>
  );
};

export default MovieCard;
