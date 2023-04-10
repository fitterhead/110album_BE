
Top 110 albums of all time
===

## Table of Contents

[TOC]

## Introduction

* Top 110 albums is a website that illustrates 100 highest rated music albums of all time, voted by music lovers using  rateyourmusic.com around the world. 
* Users can see the list of 110 albums, ranked from the highest to lowest scores. When clicked or hovered, users can see detailed informations of each album, such as name, the artist created, release date, genre and so on.
* Users can check the discography of the creator of the album, and albe to see other albums of the same artist featuring on the list.
* Registered users can create their own playlist and be able to save their album in here. 
* Registered users can read,edit information of their own account. Registered users can delete their account from the system. 
*  Registered users can purchase albums through Paypal or credit card.

## Appendix and FAQ

:::info
**Database source:** https://www.kaggle.com/datasets/michaelbryantds/top-5000-albums-of-all-time-rateyourmusiccom?select=rym_top_5000_all_time.csv
**Checkout Library:** https://www.npmjs.com/package/@paypal/react-paypal-js
:::

User stories
---
### Authentication

1. As a user, I can register a new account with an unique username, unique email and password.
2. As a user, I can sign in with my email and password.
3. As a user, my password will be encrypted and protected from being seen. 
4. When logged in, user's account will be logged in persistently until user decides to logout
5. After logged in, user can access their own account page, and see their created playlists.  
 
### Users
1. As a logged in user, I can see my personal information in my account page. I can delete my account. 
2. As a logged in user, I can save an album I like in a playlist, or delete album I saved inside a playlist.
3. As a logged in user, I can create one or multiple personal playlists.
4. As a logged in user, I can add an album to a cart.
6. As a logged in user, I can purchase album I added in my cart with paypal or credit card.




### Lists

1. As a public user, on the homepage, I can see the ranking of 110 albums, sorts from highest to lowest rank scores.
2. As a public user, I can see the name, the artist name, the genre and the release date of each album.
3. As a public user, after clicking the album cover or the album name, I will be redirected to the album's detailed page.
4. As a public user, after clicking the the artist name on the album on the homepage, I will be redirected to the album's artist page.

### Albums

1. As a public user, on the album page, I can see the enlarged album cover, I can read the introduction of the album, I can see the album's genre and a carousel of albums with similar genres.
2. As a logged in user, on the album page, I can see the button to add the specific album into my created playlist.
3. As an admin, I can add, edit, delete album on the database. 

### Artists

1. As a public user, on the artist page, I can see the enlarged portrait of the artist, I can read the biography of the artist, I can see the artist's music genre and a carousel of albums showing their discography.
2. As an admin, I can add, edit, delete artist on the database.

### Search

1. As a public user, on the search page, I can search for an album by typing on the search box. I can narrow my search field by clicking a dropdown that render a list of specific fields.

API endpoints
---
### Authentication API

```console
/**
 * @route POST /auth/login
 * @description login with email and pass
 * @body {username,email,password}
 * @access public
 */
```

### Users API

```console
/**
 * @route GET api/user/
 * @description get list of all users on the data
 * @access login required
 */
```
```console
/**
 * @route GET api/user/myInfo
 * @description get your own account data
 * @access login required
 */
```
```console
/**
 * @route GET api/user/myInfo
 * @description get your own account data
 * @access login required
 */
```
```console
/**
 * @route POST api/user
 * @description create new user
 * @access login required
  * @req_body  {
  "username": "phi",
  "email": "morita@gmail.com",
  "password": "123456"
}
 */
```
```console
/**
 * @route PUT api/user/:id
 * @description update user informations
 * @access login required
* @req_body  {
  "username": "phi",
  "email": "morita@gmail.com",
  "password": "123456"
}
 */
```
```console
/**
 * @route DELETE api/user/:id
 * @description delete user
 * @access login required
 * @req_body  {
  "username": "phi",
  "email": "morita@gmail.com",
  "password": "123456"
}
 */
```
### Playlist API

```console
/**
 * @route GET api/playlist
 * @description get list of Playlists,find playlist has userRef = userId
 * @access loginRequired
 * @example http://localhost:8000/playlist/
 */
```
```console
/**
 * @route GET api/playlist/:id
 * @description get single playlist
 * @access loginRequired
 * @example http://localhost:8000/playlist/63b38e1743c84446d10e8f20
 */
```
```console
/**
 * @route POST api/Playlist
 * @description create new Playlist
 * @body {
    isDeleted: false
    playlistName: "my playlist",
    userRef: "akjdhaskjdhsajdh"
  },
 * @access loginRequired
 */
```
```console
/**
 * @route PUT api/addAlbumToPlaylist
 * @description add album to playlist
 * @access loginRequired
* @example http://localhost:8000/playlist/addAlbumToPlaylist
* @body {
    isDeleted: false
    playlistName: "my playlist",
    userRef: "akjdhaskjdhsajdh"
  },
 */
```
```console
/**
 * @route PUT api/Playlist
 * @description delete album from playlist
 * @access loginRequired
 * @example http://localhost:8000/playlist/deleteAlbumFromPlaylist
 */
```
```console
/**
 * @route DELETE api/deletePlaylist
 * @description create new Playlist
 * @access loginRequired
 * @example http://localhost:8000/playlist/deletePlaylist/63b38e1743c84446d10e8f20
 */
```

### Albums API
```console
/**
 * @route GET api/album
 * @description get list of albums
 * @access public
 * @API http://localhost:8000/album?limit=2&page=2
 */
```
```console
/**
 * @route GET api/album
 * @description get list of albums
 * @access public
 * @API http://localhost:8000/album/63a3df92aba421e4cd7301bb
 */
```
```console
/**
 * @route POST api/album
 * @description create new album
 * @access loginRequired
 *  @body   {
    "ranking": 102 (higher than 101),
    "album": "Brief enquiry",
    "artistName": "the 1975",
    "releaseDate": "Jan 2023"
    "genre": "Rock",
  },
 */
```
```console
/**
 * @route PUT api/album
 * @description update infor of an album
 * @access loginRequired
*  @body   {
    "ranking": 102 (higher than 101),
    "album": "Brief enquiry",
    "artistName": "the 1975",
    "releaseDate": "Jan 2023"
    "genre": "Rock",
  },
 */
```
```console
/**
 * @route DELETE api/album
 * @description delete an album
 * @access loginRequired
*  @body   {
    "ranking": 102 (higher than 101),
    "album": "Brief enquiry",
    "artistName": "the 1975",
    "releaseDate": "Jan 2023"
    "genre": "Rock",  
  },
 */
```
```console
/**
 * @route GET api/album/similarGenre
 * @description get albums with similar genres
 * @access public
 */
```
```console
/**
 * @route GET api/album/albumOfArtist/:id
 * @description get albums with similar artist
 * @access public
 */
```
### Artists API

```console
/**
 * @route GET api/artist
 * @description get list of artists
 * @access public
 */
```
```console
/**
 * @route GET api/artist
 * @description get list of artists
 * @access public
 */
```
```console
/**
 * @route POST api/artist
 * @description create new artist
 * @access loginRequired
 * @body {
    artistName: "The 1975",
    genre: "Rock",
    biography: "good artist",
  },
 */
```
```console
/**
 * @route PUT api/artist
 * @description update info of Artist
 * @access loginRequired
 * @body {
    artistName: "The 1975",
    genre: "Rock",
    biography: "good artist",
  },
 */
```
```console
/**
 * @route DELETE api/artist
 * @description delete artist
 * @access loginRequired
 * @body {
    artistName: "The 1975",
    genre: "Rock",
    biography: "good artist",
  },
 */
```

Entity Relationship Diagram
---
![](https://i.imgur.com/dUV2qJk.png)




