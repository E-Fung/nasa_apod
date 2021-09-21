import axios from 'axios';
import { ApodData, rawThumbnailURL } from '../model/Models';
import { getOldMonth, getNewMonth } from '../utility/utility';

const API_KEY = 'fDUi6C0OL8rtK393Iwutbdr2KtKyDp1C31ayfYNC';

export const getThumbnailUrl = (videoUrl: string): Promise<rawThumbnailURL> => {
  let url = `https://noembed.com/embed?url=${videoUrl}`;
  return axios.get(url).then((resp: any) => resp);
};

export const getBasicAPI = (): Promise<ApodData> => {
  let curr_date: Date | string = new Date();
  curr_date = curr_date.toISOString().split('T')[0];
  let [year, month, day]: number[] = curr_date.split('-').map(Number);
  day = 1;
  let newStartDate = [year, month, day].map((element) => String(element).padStart(2, '0')).join('-');
  let params = {
    api_key: API_KEY,
    // date: '2020-06-14', //format YYYY-MM-DD, must be after 1995-06-16
    concept_tags: false, //returns concept tags, currently has no functionality
    hd: true, //legacy purpose, no actual effect
    // count: 15, // <= 100 cant be used with any date parameters, returns random
    start_date: newStartDate, // cannot be used with date
    // end_date: '2021-09-01', //defaults to current date  **INCLUSIVE**
    thumbs: true, //returns URL of video thumbnail if APOD is video
  };
  let url = `https://api.nasa.gov/planetary/apod`;
  return axios.get(url, { params: params }).then((resp: any) => resp);
};

export const getOldAPI = (oldestDate: Date): Promise<ApodData> => {
  let dateSplit = getOldMonth(oldestDate);
  console.log('newStart', dateSplit, 'oldStart', oldestDate);
  let params = {
    api_key: API_KEY,
    concept_tags: false, //returns concept tags, currently has no functionality
    hd: true, //legacy purpose, no actual effect
    start_date: dateSplit, // cannot be used with date
    end_date: oldestDate, //defaults to current date  **INCLUSIVE**
    thumbs: true, //returns URL of video thumbnail if APOD is video
  };
  let url = `https://api.nasa.gov/planetary/apod`;
  return axios.get(url, { params: params }).then((resp: any) => resp);
};

export const getNewAPI = (newestDate: Date): Promise<ApodData> => {
  let dateSplit = getNewMonth(newestDate);
  console.log('newStart', newestDate, 'oldStart', dateSplit);
  let params = {
    api_key: API_KEY,
    concept_tags: false, //returns concept tags, currently has no functionality
    hd: true, //legacy purpose, no actual effect
    start_date: newestDate, // cannot be used with date
    end_date: dateSplit, //defaults to current date  **INCLUSIVE**
    thumbs: true, //returns URL of video thumbnail if APOD is video
  };
  let url = `https://api.nasa.gov/planetary/apod`;
  return axios.get(url, { params: params }).then((resp: any) => resp);
};
