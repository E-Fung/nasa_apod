import React from 'react';
import Masonry from 'react-masonry-css';
import { Apod } from './../../model/Models';
import { ApodCard } from './ApodCard';
import { makeStyles } from '@material-ui/core';

type Props = { ApodList: Apod[] };

const useStyles = makeStyles(() => ({
  my_masonry_grid: {
    display: 'flex',
    width: 'auto',
  },
  my_masonry_grid_column: {
    margin: '10px',
  },
}));

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export const ApodList: React.FC<Props> = ({ ApodList }) => {
  const classes = useStyles();
  return (
    <Masonry breakpointCols={breakpointColumnsObj} className={classes.my_masonry_grid} columnClassName={classes.my_masonry_grid_column}>
      {ApodList.map((Apod: Apod, index: number) => (
        <ApodCard key={index} Apod={Apod} />
      ))}
    </Masonry>
  );
};
