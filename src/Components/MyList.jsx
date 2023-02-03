import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import "../Styles/List.css";

// import Carousel from 'carousel-react-rcdev'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Item from './Item';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// modules styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import {Navigation} from "swiper";

export default function MyList() {

  // My API Setting Configuration
  const API_KEY = "11a61ae7e3b2ca3ab361c0a1fa158769";
  const API_BASE_URL = "https://api.themoviedb.org/3";

  // Hook for getting genres
  const [genres, setGenres] = useState([]);
  const loadGenre = async () => {
    const res = await axios.get(`${API_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    setGenres(res.data.genres);
  };
  
  // Hook for getting all Trending Now
  const [trending, setTrending] = useState([]);
  const loadTrending = async () => {
    const res = await axios.get(`${API_BASE_URL}/trending/all/day?api_key=${API_KEY}`);
    setTrending(res.data.results);
  };

  // Use effect for all hooks
  useEffect(() => {
    loadTrending();
    loadGenre();
  }, [API_KEY, API_BASE_URL]);

  var key_mapping = -1; 
  const myList_mapping = trending.map((res) => {
      key_mapping++
      var genres_array = [] 
      genres.map((response) => {
          for(var x = 0 ; x < res.genre_ids.length ; x++){
            response.id === res.genre_ids[x] ? genres_array.push(response.name) : ""
          }
      });
      return (
        <SwiperSlide key = {res.id} className="eachSwiper">
          <Item
           image = {res.backdrop_path}
           movie_id = {res.id}
           class_key = {key_mapping}
           genres = {genres_array}
           title = {res.title}
           name = {res.name}
          />
        </SwiperSlide>
      )
  });

  function swipe_right() {
    document.getElementsByClassName("swiper-button-next")[0].click();

    document.getElementsByClassName("left_btn")[0].style.display = "flex"
    document.getElementsByClassName("left_btn")[0].style.left = "0"
    document.getElementsByClassName("image_carousel_container")[0].style.marginLeft = "0"
  }
  function swipe_left() {
    document.getElementsByClassName("swiper-button-prev")[0].click();
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

            {/* Carousel Using React Swiper */}
            <Swiper
              mousewheel={true}
              slidesPerView={7}
              grabCursor={false}
              loop={true}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
                {myList_mapping}
            </Swiper>

        </div>

    </div>
  )
}
