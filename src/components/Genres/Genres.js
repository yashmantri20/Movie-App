import { Chip } from '@material-ui/core';
import axios from 'axios';
import { useEffect } from 'react';

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres([]); // unmounting
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: '6px 0' }}>
      {selectedGenres?.map((genre) => (
        <Chip
          style={{ margin: 6, fontWeight: '700' }}
          label={genre.name}
          key={genre.id}
          color='secondary'
          clickable
          size='large'
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {genres && genres?.map((genre) => (
        <Chip
          style={{ margin: 6, fontWeight: '700' }}
          label={genre.name}
          key={genre.id}
          clickable
          size='large'
          onClick={() => handleAdd(genre)}
        />
      ))}
    </div>
  );
};

export default Genres;
