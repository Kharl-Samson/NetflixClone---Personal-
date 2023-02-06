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
import VideoModal_Fantasy from './VideoModals/VideoModal_Fantasy';


export default function Fantasy() {

  // My API Setting Configuration
  const API_KEY = "11a61ae7e3b2ca3ab361c0a1fa158769";
  const API_BASE_URL = "https://api.themoviedb.org/3";

  // Hook for getting genres
  const [genres, setGenres] = useState([]);
  const loadGenre = async () => {
    const res = await axios.get(`${API_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    setGenres(res.data.genres);
  };
  
  // Generates Random Number from 1 - 5   
  var random_keySciFi =  Math.floor(Math.random() * 30) + 1;
  // Hook for getting all Fantasy Now
  const [Fantasy, setFantasy] = useState([]);
  const loadFantasy = async () => {
    const res = await axios.get(`${API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&&with_genres=14&page=${random_keySciFi}`);
    setFantasy(res.data.results);
  };

  // Use effect for all hooks
  useEffect(() => {
    loadFantasy();
    loadGenre();
  }, [API_KEY, API_BASE_URL]);

  var key_mapping = -1; 
  const myList_mapping = Fantasy.map((res) => {
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
           class_key = {"Fantasy"+key_mapping}
           genres = {genres_array}
           title = {res.title}
           name = {res.name}
           date = {res.release_date}
           first_air_date = {res.first_air_date}
           overview = {res.overview}
           click_funtion = {show_info_Fantasy}
           index_id = {"Fantasy_now_container"}
           mv_id = {"movie_id_Fantasy"}
           nm_id = {"name_key_Fantasy"}
           gr_id = {"genre_key_Fantasy"}
           dk_id = {"date_key_Fantasy"}
           ov_id = {"overview_key_Fantasy"}
          />
        </SwiperSlide>
      )
  });


  function swipe_right() {
    document.getElementsByClassName("swiper-button-next")[9].click();

    document.getElementsByClassName("left_btn_Fantasy")[0].style.display = "flex"
    document.getElementsByClassName("left_btn_Fantasy")[0].style.left = "0"
    document.getElementsByClassName("image_carousel_container_Fantasy")[0].style.marginLeft = "0"
  }
  function swipe_left() {
    document.getElementsByClassName("swiper-button-prev")[9].click();
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
  const [trailerId_Fantasy, settrailerId_Fantasy] = useState("");
  var MOVIE_ID_Fantasy = ""
  function show_info_Fantasy(){
    for (var x = 0 ; x < document.getElementsByClassName("list_container").length ; x++){
      document.getElementsByClassName("list_container")[x].style.zIndex = "-1"
      document.getElementsByClassName("list_container")[x].style.position = "static"
    }
    
    document.getElementById("youtube_modal_Fantasy").style.display = "flex"
    document.getElementById("progress_bar_Fantasy").style.display = "flex"

    var title = document.getElementById("name_key_Fantasy").value
    var genre = document.getElementById("genre_key_Fantasy").value
    var date = document.getElementById("date_key_Fantasy").value
    var overview = document.getElementById("overview_key_Fantasy").value

    document.getElementById("modal_movie_title_Fantasy").textContent = title
    genre = genre.replace(/,/g, " ● ");
    document.getElementById("modal_movie_genre_Fantasy").textContent = genre
    var dateFormat =  moment(date).format('LL');
    document.getElementById("modal_movie_date_Fantasy").textContent = dateFormat
    document.getElementById("modal_movie_overview_Fantasy").textContent = overview

    MOVIE_ID_Fantasy = document.getElementById("movie_id_Fantasy").value;
    setTimeout(function () {
      document.getElementById("progress_bar_Fantasy").style.display = "none"
      document.getElementById("my_modal_Fantasy").style.display = "block"
      loadTrailer_Fantasy();
      playVideo_Fantasy()
    }, 700);
  }
  function close_info(){
    for (var x = 0 ; x < document.getElementsByClassName("list_container").length ; x++){
      document.getElementsByClassName("list_container")[x].style.zIndex = "1"
    }
    stopVideo_Fantasy()
    settrailerId_Fantasy(null);
    document.getElementById("youtube_modal_Fantasy").style.display = "none"
    document.getElementById("progress_bar_Fantasy").style.display = "block"
    document.getElementById("my_modal_Fantasy").style.display = "none"
  }

  const loadTrailer_Fantasy = async () => {
    const res = await axios.get(`${API_BASE_URL}/movie/${MOVIE_ID_Fantasy}/videos?api_key=${API_KEY}`);
    for(var i = 0 ; i < res.data.results.length ; i++){
      if (res.data.results[i].name.toUpperCase().indexOf('TRAILER') > -1)
      {
        settrailerId_Fantasy(res.data.results[i].key);
        break;
      }
      else{
        settrailerId_Fantasy(null);
      }
    }
  };

  // Youtube Video Configuration
  const [playerFantasy, setPlayerFantasy] = useState(null);
  const onReady_Fantasy = (event) => {
    setPlayerFantasy(event.target);
  };
  const stopVideo_Fantasy = () => {
    playerFantasy.stopVideo();
  };
  const playVideo_Fantasy = () => {
    playerFantasy.playVideo();
  };

  function sub_close(){
    if(event.srcElement.id === "youtube_modal_Fantasy"){
      close_info()
    }
  }

  return (
    <div className='list_container Fantasy_now_container' id="Fantasy_now_container">
        <p className='title for_margin_left'>Western TV Sci-Fi & Fantasy</p>
        <div className='image_carousel_container for_margin_left image_carousel_container_Fantasy'>
        <div className='left_btn left_btn_Fantasy' 
            onClick={swipe_left}  
            onMouseOver={() => { hover_swipe('left_btn_Fantasy','image_swipe_icon_left_Fantasy');}} 
            onMouseOut={() => { out_hover_swipe('left_btn_Fantasy','image_swipe_icon_left_Fantasy');}}
        >
            <KeyboardArrowLeftIcon id="image_swipe_icon_left_Fantasy"/>
        </div>
        <div className='right_btn right_btn_Fantasy' 
            onClick={swipe_right} 
            onMouseOver={() => { hover_swipe('right_btn_Fantasy','image_swipe_icon_right_Fantasy');}} 
            onMouseOut={() => { out_hover_swipe('right_btn_Fantasy','image_swipe_icon_right_Fantasy');}}
        >
            <KeyboardArrowRightIcon id="image_swipe_icon_right_Fantasy"/>
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
      <VideoModal_Fantasy
        close_info = {close_info}
        trailerId = {trailerId_Fantasy}
        onReady = {onReady_Fantasy}
        sub_close = {sub_close}
      />


      {/* Movie Id Key Value */}
      <input type="hidden" id="movie_id_Fantasy"/>
      <input type="hidden" id="name_key_Fantasy"/>
      <input type="hidden" id="genre_key_Fantasy"/>
      <input type="hidden" id="date_key_Fantasy"/>
      <input type="hidden" id="overview_key_Fantasy"/>

  </div>
  )
}
