import { useEffect, useState, useCallback, useMemo, Suspense, lazy } from "react";
import { Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

import { Loading } from '../Loading';
import { Error } from '../Error';
import { Main } from '../Main';
import { Success } from '../Success';

const ReviewForm = lazy(() => import('../ReviewForm'))

function App() {
  const [appState, setAppState] = useState({
    films: [],
    currentFilmId: undefined,
    isLoading: false,
    isFetchError: false,
    isFormVisible: false,
    reviewData: null,
    isSuccess: false
  });

  const updateAppState = useCallback((updatedData) => {
    setAppState((state) => ({
      ...state,
      ...updatedData
    }))
  }, []);

  const showReviewForm = useCallback(() => {
    updateAppState({ isFormVisible: true });
  }, [updateAppState])

  const goBack = useCallback(() => {
    updateAppState({
      isFormVisible: false,
      reviewData: null,
      isSuccess: false
    });
  }, [updateAppState])

  const handleMenuItemClick = useCallback((title) => () => {
    const selectedFilm = appState.films.find(film => film.title === title);
    updateAppState({
      currentFilmId: selectedFilm.episode_id,
      isFormVisible: false
    })
  }, [appState.films, updateAppState]);

  const currentFilm = useMemo(() => appState.films
    .find(film => film.episode_id === appState.currentFilmId),
    [appState.films, appState.currentFilmId]);

  const handleSubmitReview = useCallback((reviewData) => {
    new Promise((resolve) => {
      updateAppState({
        isLoading: true
      });
      setTimeout(resolve, 1000)
    }).then(() => {
      updateAppState({
        reviewData,
        isSuccess: true,
        isLoading: false
      })
    })
  }, [updateAppState]);

  useEffect(() => {
    updateAppState({ isLoading: true });
    axios.get('https://swapi.dev/api/films/')
      .then(response => {
        const films = response?.data?.results?.map(
          ({
            title,
            opening_crawl,
            episode_id
          }) => ({
            title,
            opening_crawl,
            episode_id
          }))
          .sort((a, b) => a.episode_id - b.episode_id);

        updateAppState({
          films,
          currentFilmId: films[0].episode_id
        });
      })
      .catch(() => {
        updateAppState({
          isFetchError: true
        })
      })
      .finally(() => {
        updateAppState({
          isLoading: false
        })
      })
  }, [updateAppState]);

  if (appState.isFetchError) {
    return <Error />
  }

  if (appState.isLoading) {
    return <Loading />
  }

  if (appState.isSuccess) {
    return <Success
      reviewData={appState.reviewData}
      currentFilmTitle={currentFilm?.title}
      goBack={goBack}
    />
  }

  return (
    <div className="App">
      <Main
        films={appState.films}
        currentFilm={currentFilm}
        handleMenuItemClick={handleMenuItemClick}
      />
      <Row>
        <Col xs={{ span: 9, offset: 3 }}>
          <Button
            variant="primary"
            onClick={showReviewForm}
          >
            Write a review
            </Button>
        </Col>
      </Row>
      <Suspense fallback={<Loading />}>
        {appState.isFormVisible && <ReviewForm
          currentFilmId={appState.currentFilmId}
          handleSubmitReview={handleSubmitReview}
        />}
      </Suspense>
    </div>
  );
}

export default App;
