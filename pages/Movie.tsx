import { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

import { discoverMovie } from "../api/tmdb/movies";
import { image } from "../api/Urls";
// import { GenreFilter, Wrap, SortBy } from '../components';

import SortBy from "../components/Filters/SortBy";
import GenreFilter from "../components/Filters/GenreFilter";
import Wrap from "../components/CarouselSlices/Wrap";

import { useDispatch, useSelector } from "../redux/store";
import { MovieResult } from "../types/tmdb";

import { MOVIE_GENRES } from "../config";

import {
  addMovies,
  incrementPage,
  resetMovies,
  setTotalPages as setTotalPagesStore,
  toggleMovieGenreId,
} from "../redux/reducers/movie.reducer";
import { detailLink } from "../utils";
import getGenreName from "../utils/getGenreName";

const options = { root: null, rootMargin: "20px", threshold: 1.0 };

function Movie() {
  const [trigger, setTrigger] = useState<any>(null);

  const dispatch = useDispatch();

  // actions

  const reset = () => dispatch(resetMovies());

  const incrementCurrentPage = () => dispatch(incrementPage());

  const setTotalPages = (pages: number) => dispatch(setTotalPagesStore(pages));

  const setData = (movies: { page: number; results: MovieResult[] }) =>
    dispatch(addMovies(movies));

  // selectors

  const page = useSelector((state) => state.movie.page);

  const filters = useSelector((state) => state.movie.filters);

  const data = useSelector((state) => state.movie.results);

  const totalPages = useSelector((state) => state.movie.totalPages);

  // observer

  const handleObserver: IntersectionObserverCallback = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) incrementCurrentPage();
  };

  const observer = useRef(new IntersectionObserver(handleObserver, options));

  useEffect(() => {
    const currentObserver = observer.current;

    if (trigger) currentObserver.observe(trigger);

    return () => {
      if (trigger) currentObserver.unobserve(trigger);
    };
  }, [trigger]);

  // data fetching logic

  useEffect(() => {
    if (Object.prototype.hasOwnProperty.call(data, page)) return;
    (async () => {
      const res = await discoverMovie(filters, page);
      setData({ page, results: res.data.results! });
      setTotalPages(res.data.total_pages!);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, data, page]);

  const loadMore = () => incrementCurrentPage();

  const addOrRemoveGenreIdFromFilter = (id: number) => {
    reset();
    dispatch(toggleMovieGenreId(id));
  };

  return (
    <Container>
      <Filters>
        <SortBy type="movie" />
        <GenreFilter type="movie" />
      </Filters>
      <GenreBar>
        {filters.genres.map((id) => (
          // eslint-disable-next-line react/jsx-key
          <GenreBubble
            style={{
              border: "1px solid silver",
              padding: "5px",
              borderRadius: "10px",
              margin: "2px",
              fontWeight: "500",
              backgroundColor: "#0E2F44",
            }}
          >
            <span>{MOVIE_GENRES.find((genre) => id === genre.id)!.name}</span>
            <FaTimes onClick={() => addOrRemoveGenreIdFromFilter(id)} />
          </GenreBubble>
        ))}
      </GenreBar>
      <CardContainer>
        {Object.values(data).map((results) =>
          results.map((movie) => (
            <Card
              key={movie.id}
              href={detailLink("movie", movie.id!, movie.title!)}
            >
              <Wrap
                src={image(200, movie.poster_path!)}
                showCard
                alt={movie.title!}
                title={movie.title!}
                backdrop={movie.backdrop_path!}
                description={movie.overview!}
                genres={
                  movie.genre_ids?.map((id) => getGenreName(id, "movie")) || []
                }
              />
            </Card>
          ))
        )}
      </CardContainer>
      {totalPages > page && (
        <Trigger ref={setTrigger} onClick={loadMore}>
          <p style={{ textAlign: "center" }}>
            <b>Loading...</b>
          </p>
        </Trigger>
      )}
      {page > 1 && page >= totalPages && (
        <Info>Yay! You have scrolled it all.</Info>
      )}
    </Container>
  );
}

export default Movie;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  @media (min-width: 724px) {
    padding-top: 60px;
  }
  @media (max-width: 724px) {
    padding-left: 10px;
  }
`;

const Filters = styled.div`
  display: flex;
  justify-content: center;
`;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: 724px) {
    justify-content: space-between;
    padding: 0;
  }
`;

const GenreBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const GenreBubble = styled.span`
  span {
    margin-right: 5px;
    vertical-align: center;
  }
  svg {
    color: rgba(255, 255, 255, 0.4);
    cursor: pointer;
  }
`;

const slideIn = keyframes`
from{transform:translateX(100%);}
to{transform:translateX(0);}
`;

const Card = styled(Link)`
  animation: ${slideIn} 500ms ease linear;
  position: relative;
  margin: 10px;
  width: 150px;
  @media (max-width: 724px) {
    width: 120px;
    margin: 15px 0;
  }

  @media (max-width: 360px) {
    width: 160px;
    margin: 15px 0;
  }
  @media (orientation: landscape) and (min-width: 600px) and (max-width: 896px) {
    width: 150px;
    margin: 15px 0;
  }
  @media (orientation: landscape) and (min-width: 320px) and (max-width: 480px) {
    width: 100px;
    margin: 15px 0;
  }
`;

const Trigger = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  color: white;
  display: flex;
  flex-direction: column;
  font-weight: 400;
  justify-content: center;
  margin-bottom: 15px;
  padding: 7px 11px;
  text-align: center;
  width: 100%;
  img {
    width: 100px;
  }

  @media (max-width: 724px) {
    font-size: 15px;
  }
`;

const Info = styled.div`
  color: white;
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: 1.2px;
  padding: 30px;
  text-align: center;
  width: 100%;
`;
