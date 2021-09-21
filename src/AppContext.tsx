import React, { useState, createContext, useContext, useEffect } from 'react';
import { displayOption, Apod } from './model/Models';

export const useAppContext = (): any => useContext(AppContext);

export const AppContext = createContext({});

let renderCount = 0;
export const AppContextProvider: React.FC = ({ children }) => {
  useEffect(() => {
    renderCount++;
  });
  const [showLiked, setShowLiked] = useState<boolean>(false);
  const [displayType, setDisplayType] = useState<displayOption>(displayOption.Recent);
  const [displayList, setDisplayList] = useState([] as Apod[]);
  const [allApod, setAllApod] = useState([] as Apod[]);

  const filterLiked = (): void => {
    let tempApodList: string[] = [];
    Object.keys(localStorage).forEach(function (key) {
      if (localStorage.getItem(key) === 'true') {
        tempApodList.push(key);
      }
    });
    let likedList: Apod[] = allApod.filter((apod) => tempApodList.includes(apod.date.toString()));
    console.log(likedList);
    setDisplayList(likedList);
    changeDisplayList();
  }; //sort by date, used when like button is pressed (show liked)

  const resetList = (): void => {
    setDisplayList(allApod);
  };

  const changeDisplayList = (): void => {
    if (displayList.length) {
      let startOfList: Date = displayList[0].date;
      let endOfList: Date = displayList[displayList.length - 1].date;
      switch (displayType) {
        case displayOption.Recent:
          if (startOfList > endOfList) {
            setDisplayList((oldlist: Apod[]) => oldlist.reverse());
          }
          break;
        case displayOption.Oldest:
          if (startOfList < endOfList) {
            setDisplayList((oldlist: Apod[]) => oldlist.reverse());
          }
          break;
        case displayOption.Random:
          break;
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        showLiked,
        setShowLiked,
        displayType,
        setDisplayType,
        displayList,
        setDisplayList,
        allApod,
        setAllApod,
        filterLiked,
        resetList,
        changeDisplayList,
      }}
    >
      {console.log('AppContext Render', renderCount)}
      {children}
    </AppContext.Provider>
  );
};
