import React, { useEffect } from 'react';
import { getBasicAPI, getOldAPI, getNewAPI } from '../service/service';
import { Apod } from '../model/Models';
import { ApodCard } from './subcomponent/ApodCard';
import { Container, makeStyles, Button, Grid, AppBar, Toolbar, Typography } from '@material-ui/core';
import Masonry from 'react-masonry-css';
import { useAppContext } from '../AppContext';
import { displayOption } from '../model/Models';
import { TopBar } from './TopBar';
import { isTodaysDate } from '../utility/utility';

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

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

let renderCount = 0;
export const MainPage: React.FC = () => {
  const classes = useStyles();
  const { showLiked, displayType, displayList, setDisplayList, allApod, setAllApod } = useAppContext();

  useEffect(() => {
    renderCount++;
  });
  console.log('MainPage Render', renderCount);

  useEffect(() => {
    //initial api call, only runs once
    (async () => {
      let initialAllApod: Apod[] = (await getBasicAPI()).data.reverse();
      setAllApod(initialAllApod);
      setDisplayList(initialAllApod);
      console.log('this only runs once');
    })();
  }, []);

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
    console.log('loadmore OLD', allApod);
    let lastIndex: number = allApod.length - 1;
    let oldestDate: Date = allApod[lastIndex].date;
    let newData: Apod[] = (await getOldAPI(oldestDate)).data;

    console.log([...newData]);
    let temp = [...allApod];
    console.log(temp);

    newData.pop();
    newData.reverse();
    setAllApod((oldData: Apod[]) => [...oldData, ...newData]);
  };

  const loadMoreNewerApod = async () => {
    console.log('loadmore NEW', allApod);
    let newestDate: Date = allApod[0].date;
    let newData: Apod[] = (await getNewAPI(newestDate)).data;

    console.log([...newData]);
    let temp = [...allApod];
    console.log(temp);

    newData.shift();
    newData.reverse();

    setAllApod((oldData: Apod[]) => [...newData, ...oldData]);
  };

  //use useMemo if pulling from local storage, if nothing in local, API

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
          {displayList.length === 0 ? <Typography style={{ color: 'white' }}>No Liked Stuff</Typography> : ''}
          <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
            {displayList.map((ent: Apod, index: number) => (
              <ApodCard key={index} Apod={ent} />
            ))}
          </Masonry>
          {!showLiked && !(displayType === displayOption.Oldest && isTodaysDate(allApod)) && (
            <Button onClick={loadMore} style={{ color: 'white' }}>
              Load More
            </Button>
          )}
        </Grid>
      </Container>
    </>
  );
};
