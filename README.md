# Shopify Winter 2021 Internship Challenge

## Table of Contents
- [Tools](https://github.com/E-Fung/shopify_2021#tools)
- [Features_Showcase](https://github.com/E-Fung/shopify_2021#features_showcase)
- [Reflections](https://github.com/E-Fung/shopify_2021#reflections)

#### List of Extra Features
- Sort by date
- Save Likes
- API loading animation
- Like animation
- Modal upon card-click
- Masonry layout for cleaner design

## Tools

- React
- Typescript
- Material UI, Material UI Icons
- Axios, for API requests
- React Image Fallback
- React Promise Tracker
- Create Portal

## Features_Showcase

### Saved Liked
Likes are saved in localStorage and retrieved upon reloads

![gif of saved liked functionality](https://github.com/E-Fung/shopify_2021/blob/main/functionality%20gifs/save_liked_functionality.gif)

### Modal
A modal is opened upon click on of APOD image, modal is create via ReactDom.createPortal

![gif of modal functionality](https://github.com/E-Fung/shopify_2021/blob/main/functionality%20gifs/modal_functionality.gif)

### Load More

![gif of load_more functionality](https://github.com/E-Fung/shopify_2021/blob/main/functionality%20gifs/load_more_functionality.gif)

### On Card Hover

![gif of card_hover functionality](https://github.com/E-Fung/shopify_2021/blob/main/functionality%20gifs/hover_card_functionality.gif)

### No APOD(s) Liked 

![gif of no liked functionality](https://github.com/E-Fung/shopify_2021/blob/main/functionality%20gifs/no_liked_functionality.gif)

### Sort by Date
By default, shows the latest Apod first

![gif of sort functionality](https://github.com/E-Fung/shopify_2021/blob/main/functionality%20gifs/sort_functionality.gif)

## Reflections
If given more time, I would like to create a better masonry layout logic where each APOD card is within its vicinity in terms of date. (at the moment, APODs with large heights can make the order and spacing look unnatural) 

I also know that my logic is not optimal, too many rerenders are occuring and state management could use improvement. I would also add the choose date functionality, the loading functionality is already implemented, I just did not have enough time to add the date-picking. 
