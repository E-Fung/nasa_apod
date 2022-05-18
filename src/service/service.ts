import axios from 'axios';
import { ApodData, rawThumbnailURL } from '../model/Models';
import { getOldMonth, getNewMonth } from '../utility/utility';
import { trackPromise } from 'react-promise-tracker';

const API_KEY: string = 'fDUi6C0OL8rtK393Iwutbdr2KtKyDp1C31ayfYNC';

export const getThumbnailUrl = (videoUrl: string): Promise<rawThumbnailURL> => {
  let url: string = `https://noembed.com/embed?url=${videoUrl}`;
  return trackPromise(axios.get(url).then((resp: any) => resp));
};

export const getSpecificApod = (startDate: Date, endDate: Date): Promise<ApodData> => {
  let params = {
    api_key: API_KEY,
    concept_tags: false, //returns concept tags, currently has no functionality
    hd: true, //legacy purpose, no actual effect
    start_date: startDate, // cannot be used with date
    end_date: endDate,
    thumbs: true, //returns URL of video thumbnail if APOD is video
  };
  let url: string = `https://api.nasa.gov/planetary/apod`;
  return trackPromise(axios.get(url, { params: params }).then((resp: any) => resp));
};

export const getBasicAPI = (): Promise<ApodData> => {
  //returns promise of all APOD from the start of current month to present day
  let curr_date: Date | string = new Date();
  curr_date = curr_date.toISOString().split('T')[0];
  let [year, month, day]: number[] = curr_date.split('-').map(Number);
  day = 1;
  let newStartDate = [year, month, day].map((element) => String(element).padStart(2, '0')).join('-');
  let params = {
    api_key: API_KEY,
    concept_tags: false, //returns concept tags, currently has no functionality
    hd: true, //legacy purpose, no actual effect
    start_date: newStartDate, // cannot be used with date
    thumbs: true, //returns URL of video thumbnail if APOD is video
  };
  let url: string = `https://api.nasa.gov/planetary/apod`;
  return trackPromise(axios.get(url, { params: params }).then((resp: any) => resp));
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
  let url: string = `https://api.nasa.gov/planetary/apod`;
  return trackPromise(axios.get(url, { params: params }).then((resp: any) => resp));
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
  return trackPromise(axios.get(url, { params: params }).then((resp: any) => resp));
};
