import React, { useState, useCallback, useEffect } from 'react';
import { Apod, MediaType, rawThumbnailURL } from '../../model/Models';
import { Grid, Typography, Fade, makeStyles, Grow } from '@material-ui/core';
import { LikeButton } from './LikeButton';
import { Modal } from './Modal';
import { getThumbnailUrl } from './../../service/service';
import { useAppContext } from './../../AppContext';
import ReactImageFallback from 'react-image-fallback';
type Props = { Apod: Apod };

const useStyles = makeStyles(() => ({
  pin: {
    margin: '15px',
    position: 'relative',
    minWidth: '100%',
    width: '100%',
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
  const classes = useStyles();
  const { showLiked, filterLiked } = useAppContext();
  const [hover, setHover] = useState(false as boolean);
  const [modalOpen, setModalOpen] = useState(false as boolean);
  const [imageUrl, setImageUrl] = useState('' as string);
  const [liked, setLiked] = useState(false as boolean);

  useEffect(() => {
    let likeState: string = localStorage.getItem(Apod.date.toString())!;
    setLiked(likeState === 'true' ? true : false);
  }, [Apod.date]);

  useEffect(() => {
    (async () => {
      if (Apod.media_type === MediaType.Image) {
        setImageUrl(Apod.hdurl);
      } else {
        await getThumbnail(Apod);
      }
    })();
  }, [liked, Apod]);

  useEffect(() => {
    if (showLiked) {
      filterLiked();
    }
  }, [liked]);

  const toggleLike = (): void => {
    let toggled: boolean = !liked;
    localStorage.setItem(Apod.date.toString(), toggled.toString());
    setLiked(toggled);
  };

  const getThumbnail = async (pod: Apod) => {
    let rawThumbnailData: rawThumbnailURL = await getThumbnailUrl(pod.url);
    await setImageUrl(rawThumbnailData.data.thumbnail_url);
  };

  const handlePicClick = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setHover(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <Grow in={true}>
      <Grid onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={classes.pin}>
        <ReactImageFallback
          src={imageUrl}
          onClick={handlePicClick}
          fallbackImage="https://apod.nasa.gov/apod/image/1710/MirachNGC404KentWood.jpg"
          initialImage="loader.gif"
          alt={Apod.explanation}
          className={classes.img}
        />
        <Modal liked={liked} toggleLike={toggleLike} modalOpen={modalOpen} Apod={Apod} pic={imageUrl} onCloseModal={handleCloseModal}></Modal>
        <LikeButton date={Apod.date} liked={liked} toggleLike={toggleLike} />
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
