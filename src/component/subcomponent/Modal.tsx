import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import zIndex from '@material-ui/core/styles/zIndex';

type Props = { isOpen: boolean; date: Date; pic: string };

const useStyles = makeStyles(() => ({
  modal: {
    zIndex: 1000,
  },
}));

export const Modal: React.FC<Props> = ({ isOpen, date, pic }) => {
  const classes = useStyles();

  if (!isOpen) {
    return <></>;
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignContent="center"
      style={{ position: 'fixed', width: '50%', height: '50%', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
    >
      <img src={pic} className={classes.modal} alt="awdwa"></img>
    </Grid>
  );
};
