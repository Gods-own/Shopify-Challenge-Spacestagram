# SHOPIFY CHALLENGE - Frontend Development Winter Internship 2022

This is a solution to the [Shopify Challenge for the role of Frontend development intern](https://docs.google.com/document/d/1QlC6htA5SXEl3YruAOkJWj2-0W3w-n0UOzGuJ1EcktQ/edit#heading=h.31w9woubunro).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [Features](#features)
  - [Built with](#built-with)
- [Author](#author)

## Overview

This is a fully responsive website where users can pull Astronomy Picture of the Day (APOD) images. This is a challenge by Shopify for the application of the role of Frontend Developer Intern - Winter 2022.

### The challenge

Build a webpage that can pull images, and allow the user to “like” and “unlike” their favourite images.

Build a simple to use interface that makes it easy to:

- Fetch data from one of NASA’s APIs and display the resulting images
- Display descriptive data for each image (for example: title, date, description, etc.)
- Like an image
- Unlike an image

### Links

- Solution URL: [My Solution](https://github.com/Gods-own/Shopify-Challenge-Spacestagram/tree/Spacestagram)
- Live Site URL: [Spacestagram](https://shopify-challenge-spacestagram.vercel.app/)

## Features

1. User would be able to:
    - Pull astronomy images
    - Read description of images
    - Like images
    - Delete images
    - Delete all images at once with the clear all button
    - View all images by clicking the all navigation link
    - View all their liked images by clicking the liked navigation link
    - View all their unliked images by clicking the unliked navigation link
2. User has the option of pulling either high resolution images or low resolution images.
3. The application utilizes IndexedDB to save the users images so that the
   user can leave the site and revisit and still see all pulled images.

**Note: The Api key would get temporary blocked if the user requests for 500 images within 15 minutes. If this happens,the user would have to wait for 50 minutes to be able to pull images again**

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Javascript
- [Dexie.js](https://dexie.org/) - JS library for easy use of IndexedDB

## Author

- Portfolio - [Idumeka Oritogun](https://gods-own.github.io/Portfolio/)

