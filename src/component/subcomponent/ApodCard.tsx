import React, { useState } from 'react';
import { Apod, MediaType } from '../../model/Models';
import { Grid, Typography, Fade, makeStyles } from '@material-ui/core';
import { LikeButton } from './LikeButton';
import { Modal } from './Modal';
type Props = { Apod: Apod };

const useStyles = makeStyles(() => ({
  pin: {
    display: 'inline-block',
    background: '#FEFEFE',
    border: '2px solid #FAFAFA',
    // box-shadow: "0 1px 2px rgba(34, 25, 25, 0.4)",
    margin: ' 0 2px 15px',
    // -webkit-column-break-inside: "avoid",
    // -moz-column-break-inside: "avoid",
    // column-break-inside: "avoid",
    // padding: "15px",
    // paddingBottom: "5px",
    // background: "-webkit-linear-gradient(45deg, #FFF, #F9F9F9)",
    // opacity: "1",

    // -webkit-transition: all .2s ease,
    // -moz-transition: all .2s ease,
    // -o-transition: all .2s ease,
    // transition: all .2s ease,
  },
}));

export const ApodCard: React.FC<Props> = ({ Apod }) => {
  const [hover, setHover] = useState(false as boolean);
  const [isOpen, setIsOpen] = useState(false as boolean);

  const getPic = (pod: Apod): string => {
    if (pod.media_type === MediaType.Image) {
      return pod.hdurl;
    } else {
      return pod.thumbnail_url;
    }
  };

  const handlePicClick = () => {
    setIsOpen(true);
  };

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <Grid style={{ margin: '5px', position: 'relative' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="pin">
      <img alt={Apod.explanation} onClick={handlePicClick} src={getPic(Apod)} style={{ width: '100%', margin: '0', padding: '0' }}></img>
      {/* <Grid style={{ position: 'absolute', color: 'white', top: '0px' }}>{Apod.date}</Grid>
      <Grid style={{ position: 'absolute', color: 'grey', bottom: '0px' }}>{Apod.date}</Grid> */}
      {/* <LikeButton date={Apod.date} /> */}
      <Modal isOpen={isOpen} date={Apod.date} pic={getPic(Apod)}>
        {' '}
      </Modal>
      {<LikeButton date={Apod.date} />}
      {hover && (
        <Fade in={true}>
          <Typography
            style={{
              position: 'absolute',
              color: 'white',
              top: '0px',
              right: '0px',
              margin: '7px',
              padding: '3px',
              backgroundColor: 'rgb(0,0,0,0.5)',
              borderRadius: '50px',
            }}
          >
            {Apod.title}
          </Typography>
        </Fade>
      )}
      {hover && (
        <Fade in={true}>
          <Typography
            style={{
              position: 'absolute',
              color: 'white',
              bottom: '0px',
              left: '0px',
              margin: '7px',
              padding: '3px',
              backgroundColor: 'rgb(0,0,0,0.5)',
              borderRadius: '50px',
            }}
          >
            {Apod.date}
          </Typography>
        </Fade>
      )}
    </Grid>
  );
};
