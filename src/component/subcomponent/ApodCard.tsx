import React, { useState, useCallback, useEffect } from 'react';
import { Apod, MediaType, rawThumbnailURL } from '../../model/Models';
import { Grid, Typography, Fade, makeStyles, Grow } from '@material-ui/core';
import { LikeButton } from './LikeButton';
import { Modal } from './Modal';
import { getThumbnailUrl } from './../../service/service';
type Props = { Apod: Apod };

const useStyles = makeStyles(() => ({
  pin: {
    margin: '15px',
    position: 'relative',
    minWidth: '100%',
    width: '100%',
    cursor: 'pointer',
  },
  date: {
    position: 'absolute',
    color: 'white',
    bottom: '0px',
    left: '0px',
    margin: '7px',
    padding: '3px',
    backgroundColor: 'rgb(0,0,0,0.5)',
    borderRadius: '50px',
  },
  title: {
    position: 'absolute',
    color: 'white',
    top: '0px',
    right: '0px',
    margin: '7px',
    padding: '3px',
    backgroundColor: 'rgb(0,0,0,0.5)',
    borderRadius: '50px',
  },
  video: {
    width: '100%',
    height: '100%',
    margin: '0',
    padding: '0',
  },
  img: {
    width: '100%',
    margin: '0',
    padding: '0',
  },
}));

export const ApodCard: React.FC<Props> = ({ Apod }) => {
  const [hover, setHover] = useState(false as boolean);
  const [isOpen, setIsOpen] = useState(false as boolean);
  const [imageUrl, setImageUrl] = useState('' as string);
  const classes = useStyles();

  useEffect(() => {
    if (Apod.media_type === MediaType.Image) {
      setImageUrl(Apod.hdurl);
    } else {
      handleGetThumbnail(Apod);
    }
  });

  const handleGetThumbnail = async (pod: Apod) => {
    let rawThumbnailData: rawThumbnailURL = await getThumbnailUrl(pod.url);
    setImageUrl(rawThumbnailData.data.thumbnail_url);
  };

  const handlePicClick = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setHover(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <Grow in={true}>
      <Grid onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={classes.pin}>
        <img alt={Apod.explanation} onClick={handlePicClick} src={imageUrl} className={classes.img}></img>
        <Modal isOpen={isOpen} Apod={Apod} pic={imageUrl} onCloseModal={handleCloseModal}></Modal>
        <LikeButton date={Apod.date} />
        {hover && (
          <Fade in={true}>
            <>
              <Typography className={classes.title}>{Apod.title}</Typography>
              <Typography className={classes.date}>{Apod.date}</Typography>
            </>
          </Fade>
        )}
      </Grid>
    </Grow>
  );
};
