import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Styles/List.css";
import Carousel from 'carousel-react-rcdev'

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Item from './Item';


export default function MyList() {
  let api_key = "11a61ae7e3b2ca3ab361c0a1fa158769"

  // Hook for getting genres
  const [genres, setGenres] = useState([]);
  const loadGenre = async () => {
    const res = await axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key="+api_key);
    setGenres(res.data.genres);
  
  };
  
  // Hook for getting all Trending Now
  const [trending, setTrending] = useState([]);
  const loadTrending = async () => {
    const res = await axios.get("https://api.themoviedb.org/3/trending/all/day?api_key="+api_key);
    setTrending(res.data.results);
  };

  // Use effect for all
  useEffect(() => {
    loadTrending();
    loadGenre();
  }, []);

  var key_mapping = -1; 

  const myList_mapping = trending.map((res) => {
    key_mapping++

    var genres_array = [] 
    genres.map((response) => {
        for(var x = 0 ; x < res.genre_ids.length ; x++){
          if(response.id === res.genre_ids[x]){
            genres_array.push(response.name)
          }
        }
    });

      return (
        <Item
         key = {key_mapping}
         image = {res.backdrop_path}
         movie_id = {res.id}
         class_key = {key_mapping}
         genres = {genres_array}
        />
       )
  });

  function swipe_right() {
    document.getElementById("next").click();

    document.getElementsByClassName("left_btn")[0].style.display = "flex"
    document.getElementsByClassName("left_btn")[0].style.left = "0"
    document.getElementsByClassName("image_carousel_container")[0].style.marginLeft = "0"
  }
  function swipe_left() {
    document.getElementById("prev").click();

    const mq = window.matchMedia("(max-width: 551px)");
    if (mq.matches) {
      document.getElementsByClassName("left_btn")[0].style.left = "20px"
      document.getElementsByClassName("image_carousel_container")[0].style.marginLeft = "20px"
    }
    else{
      document.getElementsByClassName("left_btn")[0].style.left = "60px"
      document.getElementsByClassName("image_carousel_container")[0].style.marginLeft = "60px"
    }
  }

  function hover_swipe(classkey,img_icon){
    document.getElementsByClassName(classkey)[0].style.opacity = "100%"
    document.getElementById(img_icon).style.fontSize = "60px"
  }
  function out_hover_swipe(classkey,img_icon){
    document.getElementsByClassName(classkey)[0].style.opacity = "0%"
    document.getElementById(img_icon).style.fontSize = "40px"
  }

  return (
    <div className='list_container'>
        <p className='title for_margin_left'>Trending Now</p>

        <div className='image_carousel_container for_margin_left'>
            <div className='left_btn' 
                onClick={swipe_left}  
                onMouseOver={() => { hover_swipe('left_btn','image_swipe_icon_left');}} 
                onMouseOut={() => { out_hover_swipe('left_btn','image_swipe_icon_left');}}
            >
                <KeyboardArrowLeftIcon id="image_swipe_icon_left"/>
            </div>
            <div className='right_btn' 
                onClick={swipe_right} 
                onMouseOver={() => { hover_swipe('right_btn','image_swipe_icon_right');}} 
                onMouseOut={() => { out_hover_swipe('right_btn','image_swipe_icon_right');}}
            >
                <KeyboardArrowRightIcon id="image_swipe_icon_right"/>
            </div>
            <Carousel>
                {myList_mapping}
            </Carousel> 
        </div>

    </div>
  )
}
