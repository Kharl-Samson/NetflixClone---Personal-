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
import VideoModal_ActionMovies from './VideoModals/VideoModal_ActionMovies';


export default function ActionMovies() {

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
  var random_keyActMovies =  Math.floor(Math.random() * 30) + 10;
  // Hook for getting all ActionMovies Now
  const [ActionMovies, setActionMovies] = useState([]);
  const loadActionMovies = async () => {
    const res = await axios.get(`${API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&&with_genres=28&page=${random_keyActMovies}`);
    setActionMovies(res.data.results);
  };

  // Use effect for all hooks
  useEffect(() => {
    loadActionMovies();
    loadGenre();
  }, [API_KEY, API_BASE_URL]);

  var key_mapping = -1; 
  const myList_mapping = ActionMovies.map((res) => {
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
           class_key = {"ActionMovies"+key_mapping}
           genres = {genres_array}
           title = {res.title}
           name = {res.name}
           date = {res.release_date}
           first_air_date = {res.first_air_date}
           overview = {res.overview}
           click_funtion = {show_info_ActionMovies}
           index_id = {"ActionMovies_now_container"}
           mv_id = {"movie_id_ActionMovies"}
           nm_id = {"name_key_ActionMovies"}
           gr_id = {"genre_key_ActionMovies"}
           dk_id = {"date_key_ActionMovies"}
           ov_id = {"overview_key_ActionMovies"}
          />
        </SwiperSlide>
      )
  });


  function swipe_right() {
    document.getElementsByClassName("swiper-button-next")[8].click();

    document.getElementsByClassName("left_btn_ActionMovies")[0].style.display = "flex"
    document.getElementsByClassName("left_btn_ActionMovies")[0].style.left = "0"
    document.getElementsByClassName("image_carousel_container_ActionMovies")[0].style.marginLeft = "0"
  }
  function swipe_left() {
    document.getElementsByClassName("swiper-button-prev")[8].click();
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
  const [trailerId_ActionMovies, settrailerId_ActionMovies] = useState("");
  var MOVIE_ID_ActionMovies = ""
  function show_info_ActionMovies(){
    for (var x = 0 ; x < document.getElementsByClassName("list_container").length ; x++){
      document.getElementsByClassName("list_container")[x].style.zIndex = "-1"
      document.getElementsByClassName("list_container")[x].style.position = "static"
    }
    
    document.getElementById("youtube_modal_ActionMovies").style.display = "flex"
    document.getElementById("progress_bar_ActionMovies").style.display = "flex"

    var title = document.getElementById("name_key_ActionMovies").value
    var genre = document.getElementById("genre_key_ActionMovies").value
    var date = document.getElementById("date_key_ActionMovies").value
    var overview = document.getElementById("overview_key_ActionMovies").value

    document.getElementById("modal_movie_title_ActionMovies").textContent = title
    genre = genre.replace(/,/g, " ● ");
    document.getElementById("modal_movie_genre_ActionMovies").textContent = genre
    var dateFormat =  moment(date).format('LL');
    document.getElementById("modal_movie_date_ActionMovies").textContent = dateFormat
    document.getElementById("modal_movie_overview_ActionMovies").textContent = overview

    MOVIE_ID_ActionMovies = document.getElementById("movie_id_ActionMovies").value;
    setTimeout(function () {
      document.getElementById("progress_bar_ActionMovies").style.display = "none"
      document.getElementById("my_modal_ActionMovies").style.display = "block"
      loadTrailer_ActionMovies();
      playVideo_ActionMovies()
    }, 700);
  }
  function close_info(){
    for (var x = 0 ; x < document.getElementsByClassName("list_container").length ; x++){
      document.getElementsByClassName("list_container")[x].style.zIndex = "1"
    }
    stopVideo_ActionMovies()
    settrailerId_ActionMovies(null);
    document.getElementById("youtube_modal_ActionMovies").style.display = "none"
    document.getElementById("progress_bar_ActionMovies").style.display = "block"
    document.getElementById("my_modal_ActionMovies").style.display = "none"
  }

  const loadTrailer_ActionMovies = async () => {
    const res = await axios.get(`${API_BASE_URL}/movie/${MOVIE_ID_ActionMovies}/videos?api_key=${API_KEY}`);
    for(var i = 0 ; i < res.data.results.length ; i++){
      if (res.data.results[i].name.toUpperCase().indexOf('TRAILER') > -1)
      {
        settrailerId_ActionMovies(res.data.results[i].key);
        break;
      }
      else{
        settrailerId_ActionMovies(null);
      }
    }
  };

  // Youtube Video Configuration
  const [playerActionMovies, setPlayerActionMovies] = useState(null);
  const onReady_ActionMovies = (event) => {
    setPlayerActionMovies(event.target);
  };
  const stopVideo_ActionMovies = () => {
    playerActionMovies.stopVideo();
  };
  const playVideo_ActionMovies = () => {
    playerActionMovies.playVideo();
  };

  // Close all modals 
  window.onclick = function(event) {
    if (event.target === document.getElementById("youtube_modal_ActionMovies")) {
      close_info()
    }   
  }

  return (
    <div className='list_container ActionMovies_now_container' id="ActionMovies_now_container">
        <p className='title for_margin_left'>Action Movies</p>
        <div className='image_carousel_container for_margin_left image_carousel_container_ActionMovies'>
        <div className='left_btn left_btn_ActionMovies' 
            onClick={swipe_left}  
            onMouseOver={() => { hover_swipe('left_btn_ActionMovies','image_swipe_icon_left_ActionMovies');}} 
            onMouseOut={() => { out_hover_swipe('left_btn_ActionMovies','image_swipe_icon_left_ActionMovies');}}
        >
            <KeyboardArrowLeftIcon id="image_swipe_icon_left_ActionMovies"/>
        </div>
        <div className='right_btn right_btn_ActionMovies' 
            onClick={swipe_right} 
            onMouseOver={() => { hover_swipe('right_btn_ActionMovies','image_swipe_icon_right_ActionMovies');}} 
            onMouseOut={() => { out_hover_swipe('right_btn_ActionMovies','image_swipe_icon_right_ActionMovies');}}
        >
            <KeyboardArrowRightIcon id="image_swipe_icon_right_ActionMovies"/>
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
      <VideoModal_ActionMovies
        close_info = {close_info}
        trailerId = {trailerId_ActionMovies}
        onReady = {onReady_ActionMovies}
      />


      {/* Movie Id Key Value */}
      <input type="hidden" id="movie_id_ActionMovies"/>
      <input type="hidden" id="name_key_ActionMovies"/>
      <input type="hidden" id="genre_key_ActionMovies"/>
      <input type="hidden" id="date_key_ActionMovies"/>
      <input type="hidden" id="overview_key_ActionMovies"/>

  </div>
  )
}
