import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Netflix_Logo from "../Assets/Netflix_Logo.png"
import Default_Avatar from "../Assets/Default_Avatar.png"
import search_icon from "../Assets/search_icon.png"
import close_icon from "../Assets/close_icon.png"

// From Mui
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

//Call jquery library
import $ from 'jquery'; 
import SearchItems from './SearchItems';

export default function Navbar() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Navigation bar effect when user is scrolling
  var lastScrollTop = 0;
  $(window).scroll(function(event){    
      var st = $(this).scrollTop();
      if (st > lastScrollTop){
        document.getElementById("navbar").style.backgroundColor = "#080808"
      }
      else if($(window).scrollTop() === 0) {  
        document.getElementById("navbar").style.backgroundColor = "transparent"
      }
      lastScrollTop = st;
  }); 

  //Click Search Icon
  function click_search_icon(){
      document.getElementById("Search_container").style.backgroundColor = "rgba(0, 0, 0, 0.616)"
      document.getElementById("Search_container").style.border = "1px solid #ffff"

      document.getElementById("search_input").style.width = "190px"
      document.getElementById("close_icon").style.width = "40px"
      setTimeout(function () {
        document.getElementById("close_search").style.display = "block"
      }, 400);
  } 
  function close_search(){
    document.getElementById("search_input").value = null

    
    // document.getElementById("Search_container").style.backgroundColor = "transparent"
    // document.getElementById("Search_container").style.border = "1px solid transparent"

    // document.getElementById("search_input").style.width = "0px"
    // document.getElementById("close_icon").style.width = "0px"
    // document.getElementById("close_search").style.display = "none"

  }


  // My API Setting Configuration
  const API_KEY = "11a61ae7e3b2ca3ab361c0a1fa158769";
  const API_BASE_URL = "https://api.themoviedb.org/3";

  // const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = async (event) => {
    if(document.getElementById("search_input").value.length !== 0){
      document.getElementById("Search_collection").style.display = "block"
      setTimeout(function () {
        document.getElementById("Search_collection").style.backgroundColor = "#141414"
        document.getElementById("Search_collection").style.opacity = "100%"
      }, 400);

      const response = await fetch(`${API_BASE_URL}/search/multi?api_key=${API_KEY}&query=${document.getElementById("search_input").value}`);
      const data = await response.json();
      setResults(data.results);
    }
    else{
      document.getElementById("Search_collection").style.backgroundColor = "transparent"
      document.getElementById("Search_collection").style.opacity = "0"
      setTimeout(function () {
        document.getElementById("Search_collection").style.display = "none"
      }, 400);

      const response = await fetch(`${API_BASE_URL}/search/multi?api_key=${API_KEY}&query=A`);
      const data = await response.json();
      setResults([]);
    }
  };

  
  function uniqurArray(array){
    var a = array.concat();
    for(var i=0; i<a.length; i++) {
        for(var j=i+1; j<a.length; j++) {
            if(a[i].title === a[j].title){
                a.splice(j--, 1);
            }
        }
    }
    return a;
  }

  var ctr_related_title = 0
  const related_Titles = uniqurArray(results).map((result) => {
    ctr_related_title++
    if(ctr_related_title < 5){
      return (
        <span id="related_searches_list" key={result.id}>
          {result.title}&nbsp;|&nbsp;
        </span>
      )
    }
  });


  // Hook for getting genres
  // const [genres, setGenres] = useState([]);
  // const loadGenre = async () => {
  //   const res = await axios.get(`${API_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  //   setGenres(res.data.genres);
  // };
  // // Use effect for all hooks
  // useEffect(() => {
  //   loadGenre();
  // }, [API_KEY, API_BASE_URL]);

  var key_mapping = -1;
  const EachItems = results.map((res) => {
    key_mapping++
    var genres_array = [] 
    // genres.map((response) => {
    //     for(var x = 0 ; x < res.genre_ids.length ; x++){
    //       response.id === res.genre_ids[x] ? genres_array.push(response.name) : ""
    //     }
    // });
      return (
        <div className='eachSwiper_Search' key={res.id}>
          <SearchItems
            image = {res.backdrop_path}
            movie_id = {res.id}
            class_count = {key_mapping}
            class_key = {"Popular"+key_mapping}
            genres = {["Drama", "Comedy"]}
            title = {res.title}
            name = {res.name}
            date = {res.release_date}
            first_air_date = {res.first_air_date}
            overview = {res.overview}
            // click_funtion = {show_info_Popular}
            mv_id = {"movie_id_Popular"}
            nm_id = {"name_key_Popular"}
            gr_id = {"genre_key_Popular"}
            dk_id = {"date_key_Popular"}
            ov_id = {"overview_key_Popular"}
          />
        </div>
      )
  });


  return (
    <>
    <nav id="navbar">
      <div className='left'>
        <img src={Netflix_Logo} alt="Netflix Logo" className='logo' loading="lazy"/>

        <div className='nav_links'>
          <a className='links active' href='#HomePage'>Home</a>
          <a className='links' href='#tvShows_now_container'>TV Shows</a>
          <a className='links' href='#Movies_now_container'>Movies</a>
          <a className='links' href='#Popular_now_container'>New & Popular</a>
          <a className='links' href='#list_container'>My List</a>

          {/* For small devices links */}
          <div className='browse_container'  onClick={handleClick}>
            <p>Browse</p>
            <ArrowDropDownIcon/>
          </div>

          {/* Menu Container on small devices */}
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <div></div>
            <MenuItem onClick={handleClose}>
              <a className='mui_links mui_links_active' href='#HomePage'>Home</a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a className='mui_links' href='#tvShows_now_container'>TV Shows</a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a className='mui_links' href='#Movies_now_container'>Movies</a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a className='mui_links' href='#Popular_now_container'>New & Popular</a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a className='mui_links' href='#list_container'>My List</a>
            </MenuItem>
            
          </Menu>

        </div>
      </div>

      <div className='right'>
        <div className='Search_container' id="Search_container">
          <div className='search_icon' onClick={click_search_icon}>
            <img src={search_icon} alt="Search"/>
          </div>
          <input type="text" 
            id="search_input" 
            placeholder='Titles, people, genres'
            onChange={handleChange}
            />
          <div className='search_icon' id="close_icon">
            <img src={close_icon} alt="Close" id="close_search" onClick={close_search}/>
          </div>
        </div>
        
        <img src={Default_Avatar} alt="Avatar" className='avatar' loading="lazy"/>
      </div>
    </nav>

    {/* Search Container Collection*/}
    <div className='Search_collection' id="Search_collection">
      <div className='container'>
        <p className='related_title'>Explore titles related to: &nbsp;
          {related_Titles}
        </p>

        <div className='item_container'>
            {EachItems}
        </div>
      </div>
        
    </div>
    </>
  )
}
