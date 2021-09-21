import React, { useEffect, useState } from 'react';
import { getBasicAPI, getOldAPI, getNewAPI } from '../service/service';
import { Apod } from '../model/Models';
import { ApodCard } from './subcomponent/ApodCard';
import { Container, makeStyles, Button, Grid, AppBar, Toolbar, Typography } from '@material-ui/core';
import Masonry from 'react-masonry-css';
import { useAppContext } from '../AppContext';
import { displayOption } from '../model/Models';
import { TopBar } from './TopBar';

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
let renderCount = 0;
export const MainPage: React.FC = () => {
  useEffect(() => {
    renderCount++;
  });

  const classes = useStyles();
  const { showLiked, displayType, setDisplayList, setAllApod, displayList, allApod } = useAppContext();

  const loadMore = (): void => {
    //usecallback?
    if (displayList.length) {
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
    console.log('loadmore OLD');
    let lastIndex: number = allApod.length - 1;
    let oldestDate: Date = allApod[lastIndex].date;
    let newData: Apod[] = (await getOldAPI(oldestDate)).data;
    newData.pop();
    newData.reverse();

    setAllApod((oldData: Apod[]) => [...oldData, ...newData]);
    setDisplayList((oldData: Apod[]) => [...oldData, ...newData]);
  };

  const loadMoreNewerApod = async () => {
    console.log('loadmore NEW');
    let newestDate: Date = allApod[0].date;
    let newData: Apod[] = (await getNewAPI(newestDate)).data;
    setAllApod((oldData: Apod[]) => [...oldData, ...newData]);
    newData.shift();
    setDisplayList((oldData: Apod[]) => [...oldData, ...newData]);
  };

  useEffect(() => {
    //initial api call
    (async () => {
      let initialallApod: Apod[] = (await getBasicAPI()).data.reverse();
      setAllApod(initialallApod);
      setDisplayList(initialallApod);
    })();
  }, []);

  //use useMemo if pulling from local storage, if nothing in local, API
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  if (!allApod.length) {
    return <></>;
  }

  return (
    <>
      <AppBar position="sticky" className={classes.topBar}>
        {console.log('MainPage Render', renderCount)}
        <Toolbar>
          <TopBar />
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container justifyContent="center">
          {displayList.length === 0 ? <Typography style={{ color: 'white' }}>No Liked Stuff</Typography> : ''}
          <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
            {displayList.map((ent: Apod, index: number) => (
              <ApodCard key={index} Apod={ent} />
            ))}
          </Masonry>
          {!showLiked && (
            <Button onClick={loadMore} style={{ color: 'white' }}>
              Load More
            </Button>
          )}
        </Grid>
      </Container>
    </>
  );
};
