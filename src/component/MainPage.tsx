import React, { useEffect } from 'react';
import { getBasicAPI, getOldAPI, getNewAPI } from '../service/service';
import { Apod } from '../model/Models';
import { Container, makeStyles, Button, Grid, AppBar, Toolbar, Typography } from '@material-ui/core';
import { useAppContext } from '../AppContext';
import { displayOption } from '../model/Models';
import { TopBar } from './TopBar';
import { isTodaysDate } from '../utility/utility';
import { LoadingIndic } from './subcomponent/LoadingIndic';
import { usePromiseTracker } from 'react-promise-tracker';
import { ApodList } from './subcomponent/ApodList';

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: '#222831',
    minHeight: '100vh',
    height: '100%',
    padding: '5px',
  },
  topBar: {
    backgroundColor: '#393E46',
    zIndex: 100,
  },
}));

export const MainPage: React.FC = () => {
  const classes = useStyles();
  const { showLiked, displayType, displayApod, setDisplayApod, allApod, setAllApod } = useAppContext();
  const { promiseInProgress } = usePromiseTracker();

  useEffect(() => {
    //initial api call, only runs once
    (async () => {
      let initialApodList: Apod[] = (await getBasicAPI()).data.reverse();
      setAllApod(initialApodList);
      setDisplayApod(initialApodList);
    })();
  }, [setAllApod, setDisplayApod]);

  const loadMore = (): void => {
    if (displayApod.length) {
      switch (displayType) {
        case displayOption.Recent:
          loadMoreOlderApod();
          break;
        case displayOption.Oldest:
          loadMoreNewerApod();
          break;
        case displayOption.Random:
          break;
      }
    }
  };

  const loadMoreOlderApod = async () => {
    let latestIndex: number = allApod.length - 1;
    let oldestDate: Date = allApod[latestIndex].date;
    let newData: Apod[] = (await getOldAPI(oldestDate)).data;
    newData.pop();
    newData.reverse();
    setAllApod((oldData: Apod[]) => [...oldData, ...newData]);
  };

  const loadMoreNewerApod = async () => {
    let earlistIndex: number = 0;
    let newestDate: Date = allApod[earlistIndex].date;
    let newData: Apod[] = (await getNewAPI(newestDate)).data;
    newData.shift();
    newData.reverse();
    setAllApod((oldData: Apod[]) => [...newData, ...oldData]);
  };

  const showLoadButton = () => {
    let latestApodLoaded: boolean = displayType === displayOption.Oldest && isTodaysDate(allApod);
    return !showLiked && !promiseInProgress && !latestApodLoaded;
  };

  if (!allApod.length) {
    return <></>;
  }

  return (
    <>
      <AppBar position="sticky" className={classes.topBar}>
        <Toolbar>
          <TopBar />
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container justifyContent="center">
          {displayApod.length === 0 ? <Typography style={{ color: 'white' }}>No Liked Stuff</Typography> : ''}
          <ApodList ApodList={displayApod} />
          {promiseInProgress && <LoadingIndic />}
          {showLoadButton() && (
            <Button onClick={loadMore} style={{ color: 'white' }}>
              Load More
            </Button>
          )}
        </Grid>
      </Container>
    </>
  );
};
