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

  const filterLiked = () => {
    console.log('filter like list');

    let tempApodList: string[] = [];
    Object.keys(localStorage).forEach(function (key) {
      if (localStorage.getItem(key) === 'true') {
        tempApodList.push(key);
      }
    });
    let likedList: Apod[] = allApod.filter((apod) => tempApodList.includes(apod.date.toString()));
    setDisplayList(likedList);
  }; //sort by date, used when like button is pressed (show liked)

  const resetList = () => {
    console.log('reseting list');
    setDisplayList(allApod);
  };

  useEffect(() => {
    resetList();
  }, [allApod]);

  useEffect(() => {
    changeDisplayList();
  }, [displayList, displayType]);

  const changeDisplayList = (): void => {
    //earlier date is bigger
    if (displayList.length) {
      let tempList = displayList;
      let startOfList: Date = tempList[0].date;
      let endOfList: Date = tempList[tempList.length - 1].date;
      switch (displayType) {
        case displayOption.Recent:
          if (startOfList < endOfList) {
            let temp = [...displayList];
            setDisplayList(temp.reverse());
          }
          break;
        case displayOption.Oldest:
          if (startOfList > endOfList) {
            let temp = [...displayList];
            setDisplayList(temp.reverse());
          }
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
