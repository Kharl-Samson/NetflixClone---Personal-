import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Styles/List.css";

// import Carousel from 'carousel-react-rcdev'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Item from './Item';

// From Moment
import moment from 'moment';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// modules styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import {Navigation} from "swiper";
import VideoModal_Trending from './VideoModals/VideoModal_Trending';


export default function TrendingNow() {

  // My API Setting Configuration
  const API_KEY = "11a61ae7e3b2ca3ab361c0a1fa158769";
  const API_BASE_URL = "https://api.themoviedb.org/3";

  // Hook for getting genres
  const [genres, setGenres] = useState([]);
  const loadGenre = async () => {
    const res = await axios.get(`${API_BASE_URL}/genre/${document.getElementById("mediaType_key_Trending").value}/list?api_key=${API_KEY}`);
    setGenres(res.data.genres);
  };
  
  // Generates Random Number from 1 - 20   
  var random_keyTrend =  Math.floor(Math.random() * 5) + 1;
  // Hook for getting all Trending Now
  const [trending, setTrending] = useState([]);
  const loadTrending = async () => {
    const res = await axios.get(`${API_BASE_URL}/trending/all/day?api_key=${API_KEY}&language=en-US&page=${random_keyTrend}`);
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
           class_count = {key_mapping}
           class_key = {"trends"+key_mapping}
           genres = {genres_array}
           title = {res.title}
           name = {res.name}
           date = {res.release_date}
           first_air_date = {res.first_air_date}
           overview = {res.overview}
           media_Type = {res.media_type}
           click_funtion = {show_info_trending}
           index_id = {"Trending_now_container"}
           mv_id = {"movie_id_Trending"}
           nm_id = {"name_key_Trending"}
           gr_id = {"genre_key_Trending"}
           dk_id = {"date_key_Trending"}
           ov_id = {"overview_key_Trending"}
           mt_id = {"mediaType_key_Trending"}
          />
        </SwiperSlide>
      )
  });


  function swipe_right() {
    document.getElementsByClassName("swiper-button-next")[1].click();

    document.getElementsByClassName("left_btn_trending")[0].style.display = "flex"
    document.getElementsByClassName("left_btn_trending")[0].style.left = "0"
    document.getElementsByClassName("image_carousel_container_trending")[0].style.marginLeft = "0"
  }
  function swipe_left() {
    document.getElementsByClassName("swiper-button-prev")[1].click();
  }

  function hover_swipe(classkey,img_icon){
    document.getElementsByClassName(classkey)[0].style.opacity = "100%"
    document.getElementById(img_icon).style.fontSize = "60px"
  }
  function out_hover_swipe(classkey,img_icon){
    document.getElementsByClassName(classkey)[0].style.opacity = "0%"
    document.getElementById(img_icon).style.fontSize = "40px"
  }

  // Youtube player functions 
  const [trailerId_trending, settrailerId_trending] = useState("");
  var MOVIE_ID_TRENDING = ""
  function show_info_trending(){
    for (var x = 0 ; x < document.getElementsByClassName("list_container").length ; x++){
      document.getElementsByClassName("list_container")[x].style.zIndex = "-1"
      document.getElementsByClassName("list_container")[x].style.position = "static"
    }
    
    document.getElementById("youtube_modal_trending").style.display = "flex"
    document.getElementById("progress_bar_trending").style.display = "flex"

    var title = document.getElementById("name_key_Trending").value
    var genre = document.getElementById("genre_key_Trending").value
    var date = document.getElementById("date_key_Trending").value
    var overview = document.getElementById("overview_key_Trending").value

    document.getElementById("modal_movie_title_trending").textContent = title
    genre = genre.replace(/,/g, " ● ");
    document.getElementById("modal_movie_genre_trending").textContent = genre
    var dateFormat =  moment(date).format('LL');
    document.getElementById("modal_movie_date_trending").textContent = dateFormat
    document.getElementById("modal_movie_overview_trending").textContent = overview

    MOVIE_ID_TRENDING = document.getElementById("movie_id_Trending").value;
    setTimeout(function () {
      document.getElementById("progress_bar_trending").style.display = "none"
      document.getElementById("my_modal_trending").style.display = "block"
      loadTrailer_Trending();
      playVideo_Trending()
    }, 700);
  }
  function close_info(){
    for (var x = 0 ; x < document.getElementsByClassName("list_container").length ; x++){
      document.getElementsByClassName("list_container")[x].style.zIndex = "1"
    }
    stopVideo_Trending()
    settrailerId_trending(null);
    document.getElementById("youtube_modal_trending").style.display = "none"
    document.getElementById("progress_bar_trending").style.display = "block"
    document.getElementById("my_modal_trending").style.display = "none"
    document.getElementById("mediaType_key_Trending").value = null
  }

  const loadTrailer_Trending = async () => {
    const res = await axios.get(`${API_BASE_URL}/${document.getElementById("mediaType_key_Trending").value}/${MOVIE_ID_TRENDING}/videos?api_key=${API_KEY}`);
    for(var i = 0 ; i < res.data.results.length ; i++){
      if (res.data.results[i].name.toUpperCase().indexOf('OFFICIAL TRAILER') > -1)
      {
        settrailerId_trending(res.data.results[i].key);
        break;
      }
      else{
        settrailerId_trending(null);
      }
    }
  };

  // Youtube Video Configuration
  const [playerTrending, setPlayerTrending] = useState(null);
  const onReady_Trending = (event) => {
    setPlayerTrending(event.target);
  };
  const stopVideo_Trending = () => {
    playerTrending.stopVideo();
  };
  const playVideo_Trending = () => {
    playerTrending.playVideo();
  };

  function sub_close(){
    if(event.srcElement.id === "youtube_modal_trending"){
      close_info()
    }
  }
  
  return (
    <div className='list_container Trending_now_container' id="Trending_now_container">
        <p className='title for_margin_left'>Trending Now</p>
        <div className='image_carousel_container for_margin_left image_carousel_container_trending'>
        <div className='left_btn left_btn_trending' 
            onClick={swipe_left}  
            onMouseOver={() => { hover_swipe('left_btn_trending','image_swipe_icon_left_trending');}} 
            onMouseOut={() => { out_hover_swipe('left_btn_trending','image_swipe_icon_left_trending');}}
        >
            <KeyboardArrowLeftIcon id="image_swipe_icon_left_trending"/>
        </div>
        <div className='right_btn right_btn_trending' 
            onClick={swipe_right} 
            onMouseOver={() => { hover_swipe('right_btn_trending','image_swipe_icon_right_trending');}} 
            onMouseOut={() => { out_hover_swipe('right_btn_trending','image_swipe_icon_right_trending');}}
        >
            <KeyboardArrowRightIcon id="image_swipe_icon_right_trending"/>
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

      {/* Modal for clicking each_item */}
      <VideoModal_Trending
          close_info = {close_info}
          trailerId = {trailerId_trending}
          onReady = {onReady_Trending}
          sub_close = {sub_close}
      />

      {/* Movie Id Key Value */}
      <input type="hidden" id="movie_id_Trending"/>
      <input type="hidden" id="name_key_Trending"/>
      <input type="hidden" id="genre_key_Trending"/>
      <input type="hidden" id="date_key_Trending"/>
      <input type="hidden" id="overview_key_Trending"/>
      <input type="hidden" id="mediaType_key_Trending"/>

  </div>
  )
}
