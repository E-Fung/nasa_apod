import React, { useState, createContext, useContext, useEffect, useCallback } from 'react';
import { displayOption, Apod } from './model/Models';

export const useAppContext = (): any => useContext(AppContext);

export const AppContext = createContext({});

export const AppContextProvider: React.FC = ({ children }) => {
  const [showLiked, setShowLiked] = useState<boolean>(false);
  const [displayType, setDisplayType] = useState<displayOption>(displayOption.Recent);
  const [displayApod, setDisplayApod] = useState([] as Apod[]);
  const [allApod, setAllApod] = useState([] as Apod[]);

  const filterLiked = (): void => {
    let tempApodList: string[] = [];
    Object.keys(localStorage).forEach(function (key) {
      if (localStorage.getItem(key) === 'true') {
        tempApodList.push(key);
      }
    });
    let likedList: Apod[] = allApod.filter((apod) => tempApodList.includes(apod.date.toString()));
    setDisplayApod(likedList);
  }; //sort by date, used when like button is pressed (show liked)

  const resetList = useCallback((): void => {
    setDisplayApod(allApod);
  }, [allApod]);

  const changedisplayApod = useCallback((): void => {
    if (displayApod.length) {
      let tempList: Apod[] = displayApod;
      let startOfList: Date = tempList[0].date;
      let endOfList: Date = tempList[tempList.length - 1].date;
      switch (displayType) {
        case displayOption.Recent:
          if (startOfList < endOfList) {
            let temp = [...displayApod];
            setDisplayApod(temp.reverse());
          }
          break;
        case displayOption.Oldest:
          if (startOfList > endOfList) {
            let temp = [...displayApod];
            setDisplayApod(temp.reverse());
          }
          break;
      }
    }
  }, [displayApod, displayType]);

  useEffect((): void => {
    resetList();
  }, [allApod, resetList]);

  useEffect((): void => {
    changedisplayApod();
  }, [displayApod, displayType, changedisplayApod]);

  return (
    <AppContext.Provider
      value={{
        showLiked,
        setShowLiked,
        displayType,
        setDisplayType,
        displayApod,
        setDisplayApod,
        allApod,
        setAllApod,
        filterLiked,
        resetList,
        changedisplayApod,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
