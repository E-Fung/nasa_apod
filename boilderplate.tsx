// import React, { createContext, useContext, useState } from 'react';
// import { Apod } from './src/model/Models';

// const UserContext = createContext<Apod[]>(null);
// const UserPage: React.FC = () => {
//   const context = useContext(UserContext);
//   return <div>{context}</div>;
// };

// function App() {
//   const [user, setUser] = useState([] as Apod[]);
//   return (
//     <UserContext.Provider value={user}>
//       <UserPage />
//     </UserContext.Provider>
//   );
// }

type Props = { id: number | string };

export const PokePic: React.FC<Props> = ({ id }) => {
  return <></>;
};
