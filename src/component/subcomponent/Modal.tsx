import React, { useEffect, useCallback } from 'react';
import { makeStyles, Grid, Typography, IconButton } from '@material-ui/core';
import ReactDom from 'react-dom';
import { Apod } from './../../model/Models';
import { HighlightOff } from '@material-ui/icons';
import { LikeButton } from './LikeButton';

type Props = { Apod: Apod; isOpen: boolean; pic: string; onCloseModal: () => void };

const useStyles = makeStyles(() => ({
  modal: {
    zIndex: 1000,
    maxHeight: '90%',
    maxWidth: '90%',
    '(&:not):hover': {},
  },
  overlay: {
    zIndex: 1000,
    left: '0px',
    top: '0px',
    position: 'fixed',
    width: '100%',
    height: '100%',
    minHeight: '100vh',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  img_wrapper: {
    overflow: 'hidden',
  },
  words: {
    padding: '15px',
    color: 'white',
  },
  xButton: {
    zIndex: 10000,
    transform: 'scale(1.2)',
    position: 'absolute',
    left: '0px',
    top: '0px',
    color: 'white',
  },
  overlayGrid: {
    width: '80%',
    height: '90%',
    position: 'relative',
    backgroundColor: '#1f2226',
    padding: '30px',
  },
  overlayContent: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
  },
}));

export const Modal: React.FC<Props> = ({ isOpen, Apod, pic, onCloseModal }) => {
  const classes = useStyles();

  useEffect(() => {
    //closes modal on 'esc'
    const close = (e: any) => {
      if (e.keyCode === 27) {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  if (!isOpen) {
    return <></>;
  }

  return ReactDom.createPortal(
    <Grid container justifyContent="center" alignContent="center" className={classes.overlay} onClick={onCloseModal}>
      <Grid
        item
        className={classes.overlayGrid}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <IconButton onClick={onCloseModal} className={classes.xButton}>
          <HighlightOff />{' '}
        </IconButton>
        <Grid container className={classes.overlayContent} justifyContent="center" alignContent="center">
          <Grid item style={{ height: '100%', width: '50%' }}>
            <Grid container style={{ width: '100%', height: '100%' }} justifyContent="center" alignContent="center">
              <img src={pic} className={`${classes.modal} `} alt="awdwa"></img>
            </Grid>
          </Grid>
          <Grid item style={{ height: '100%', width: '50%' }}>
            <Grid container style={{ height: '100%', width: '100%', padding: '30px' }} alignContent="center">
              <Typography variant="h3" className={classes.words}>
                {Apod.title}
              </Typography>
              <Typography variant="body1" className={classes.words}>
                {Apod.explanation}
              </Typography>
              <Typography variant="caption" className={classes.words}>
                {Apod.date}
              </Typography>
            </Grid>
            <LikeButton date={Apod.date} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>,
    document.getElementById('portal')!
  );
};
