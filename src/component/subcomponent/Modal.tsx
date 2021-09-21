import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import ReactImageFallback from 'react-image-fallback';
import { makeStyles, Grid, Typography, IconButton } from '@material-ui/core';
import { Apod } from './../../model/Models';
import { HighlightOff } from '@material-ui/icons';
import { LikeButton } from './LikeButton';

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
  closeButton: {
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

type Props = { Apod: Apod; modalOpen: boolean; pic: string; onCloseModal: () => void; liked: boolean; toggleLike: () => void };

export const Modal: React.FC<Props> = ({ modalOpen, Apod, pic, onCloseModal, liked, toggleLike }) => {
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

  if (!modalOpen) {
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
        <IconButton onClick={onCloseModal} className={classes.closeButton}>
          <HighlightOff />
        </IconButton>
        <Grid container className={classes.overlayContent} justifyContent="center" alignContent="center">
          <Grid item style={{ height: '100%', width: '50%' }}>
            <Grid container style={{ width: '100%', height: '100%' }} justifyContent="center" alignContent="center">
              {console.log(Apod)}
              <ReactImageFallback
                src={pic}
                className={classes.modal}
                alt={Apod.title}
                fallbackImage="https://apod.nasa.gov/apod/image/1710/MirachNGC404KentWood.jpg"
                initialImage="loader.gif"
              />
            </Grid>
          </Grid>
          <Grid item style={{ height: '100%', width: '50%' }}>
            <Grid container style={{ height: '100%', width: '100%', padding: '10px' }} alignContent="center">
              <Typography variant="h3" className={classes.words}>
                {Apod.title}
              </Typography>
              <Typography variant="body1" className={classes.words}>
                {Apod.explanation}
              </Typography>
              <Typography variant="caption" className={classes.words}>
                {Apod.date}
              </Typography>
              <LikeButton date={Apod.date} liked={liked} toggleLike={toggleLike}>
                Like
              </LikeButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>,
    document.getElementById('portal')!
  );
};
