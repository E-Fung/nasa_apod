import React, { useEffect, useState } from 'react';
import { getBasicAPI } from '../service/service';
import { Apod } from '../model/Models';
import { ApodCard } from './subcomponent/ApodCard';
import { Container } from '@material-ui/core';
import Masonry from 'react-masonry-css';

export const MainPage: React.FC = () => {
  const [apodList, setApodList] = useState([] as Apod[]);

  useEffect(() => {
    (async () => {
      let pp = await getBasicAPI();
      setApodList(pp.data);
    })();
  });

  if (!apodList) {
    return <></>;
  }

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <Container maxWidth="lg" style={{ backgroundColor: 'black', minHeight: '100vh', height: '100%', padding: '5px' }}>
      <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
        {apodList.map((ent, index) => (
          <ApodCard key={index} Apod={ent} />
        ))}
      </Masonry>
    </Container>
  );
};
