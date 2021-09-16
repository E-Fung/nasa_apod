import axios from 'axios';

const API_KEY = 'fDUi6C0OL8rtK393Iwutbdr2KtKyDp1C31ayfYNC';

let params = {
  api_key: API_KEY,
  // date: '2020-06-14', //format YYYY-MM-DD, must be after 1995-06-16
  concept_tags: true, //returns concept tags
  hd: true, //legacy purpose, no actual effect
  // count: 2, // <= 100 cant be used with any date parameters, returns random
  start_date: '2021-09-01', // cannot be used with date
  // end_date: //defaults to current date
  thumbs: true, //returns URL of video thumbnail if APOD is video
};

export const getBasicAPI = () => {
  let url = `https://api.nasa.gov/planetary/apod`;
  return axios.get(url, { params: params }).then((resp: any) => resp);
};
