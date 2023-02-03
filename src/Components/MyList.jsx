import React, { useState, useEffect } from 'react';
import VideoModal from './VideoModal';
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
           date = {res.release_date}
           first_air_date = {res.first_air_date}
           overview = {res.overview}
           click_funtion = {show_info}
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

  // Youtube player functions 
  const [trailerId, setTrailerId] = useState("");
  var MOVIE_ID = ""
  function show_info(){
    document.getElementById("youtube_modal").style.display = "flex"
    document.getElementById("progress_bar").style.display = "flex"

    var title = document.getElementById("name_key").value
    var genre = document.getElementById("genre_key").value
    var date = document.getElementById("date_key").value
    var overview = document.getElementById("overview_key").value

    document.getElementById("modal_movie_title").textContent = title
    genre = genre.replace(/,/g, " ● ");
    document.getElementById("modal_movie_genre").textContent = genre
    var dateFormat =  moment(date).format('LL');
    document.getElementById("modal_movie_date").textContent = dateFormat
    document.getElementById("modal_movie_overview").textContent = overview

    MOVIE_ID = document.getElementById("movie_id").value;
    setTimeout(function () {
      document.getElementById("progress_bar").style.display = "none"
      document.getElementById("my_modal").style.display = "block"
      loadTrailer();
      playVideo()
    }, 700);
  }
  function close_info(){
    stopVideo()
    setTrailerId(null);
    document.getElementById("youtube_modal").style.display = "none"
    document.getElementById("progress_bar").style.display = "block"
    document.getElementById("my_modal").style.display = "none"
  }

  const loadTrailer = async () => {
    const res = await axios.get(`${API_BASE_URL}/movie/${MOVIE_ID}/videos?api_key=${API_KEY}`);
    for(var i = 0 ; i < res.data.results.length ; i++){
      if (res.data.results[i].name.toUpperCase().indexOf('OFFICIAL TRAILER') > -1)
      {
        setTrailerId(res.data.results[i].key);
        break;
      }
      else{
        setTrailerId(null);
      }
    }
  };

  // Youtube Video Configuration
  const [player, setPlayer] = useState(null);
  const onReady = (event) => {
    setPlayer(event.target);
  };
  const stopVideo = () => {
    player.stopVideo();
  };
  const playVideo = () => {
    player.playVideo();
  };

  // Close all modals 
  window.onclick = function(event) {
    if (event.target === document.getElementById("youtube_modal")) {
      close_info()
    }   
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

    {/* Modal for clicking each_item */}
    <VideoModal
      close_info = {close_info}
      trailerId = {trailerId}
      onReady = {onReady}
    />

    {/* Movie Id Key Value */}
    <input type="hidden" id="movie_id"/>
    <input type="hidden" id="name_key"/>
    <input type="hidden" id="genre_key"/>
    <input type="hidden" id="date_key"/>
    <input type="hidden" id="overview_key"/>
    
    </div>
  )
}
