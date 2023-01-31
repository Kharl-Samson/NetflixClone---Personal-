import React from 'react'
import "../Styles/HomePage.css";
import play_icon from '../Assets/play_icon.png'
import info_icon from '../Assets/info_icon.svg'

// Cover Photo
import Titanic from "../Assets/Cover_Photo/Titanic.png"

// Trailer Viedo
import Titanic_video from "../Assets/Trailer_Videos/Titanic.mp4"

// Movie Title
import Titanic_Title from "../Assets/Movie_Titles/Titanic_title.png"

export default function HomePage() {

  const cover_photo_array = [Titanic, Titanic, Titanic, Titanic, Titanic]
  const trailer_video_array = [Titanic_video, Titanic_video, Titanic_video, Titanic_video, Titanic_video] 
  const movie_title_array = [Titanic_Title, Titanic_Title, Titanic_Title, Titanic_Title, Titanic_Title] 
  const movie_description = [
    "Rose tells the whole story from Titanic's departure through to its death on its first and last voyage on April 15, 1912.",
    "Rose tells the whole story from Titanic's departure through to its death on its first and last voyage on April 15, 1912.",
    "Rose tells the whole story from Titanic's departure through to its death on its first and last voyage on April 15, 1912.",
    "Rose tells the whole story from Titanic's departure through to its death on its first and last voyage on April 15, 1912.",
    "Rose tells the whole story from Titanic's departure through to its death on its first and last voyage on April 15, 1912.",
  ]
  const age_restriction_array = ["16+","16+","16+","16+","16+"]

  // Generates Random Number from 0 - 4   
  var random_Number =  Math.floor(Math.random() * 4) + 0;

  setTimeout(function () {
    document.getElementById("trailer_video").play();

    document.getElementById("trailer_video").onended = function(e) {
      document.getElementById("CoverPhoto_container").style.opacity = "100%"
      document.getElementById("CoverPhoto_container").style.transition = ".1s%"
      document.getElementById("description").style.display = "block"
    };
  }, 3000);
  setTimeout(function () {
    document.getElementById("CoverPhoto_container").style.opacity = "0%"
  }, 4000);

  setTimeout(function () {
    const mq701 = window.matchMedia("(max-width: 701px)");
    const mq351 = window.matchMedia("(max-width: 701px)");
    if (mq351.matches) {
      document.getElementById("title_img").style.width = "150px"
      document.getElementById("btn_container").style.marginTop = "20px"
    }
    else if (mq701.matches) {
      document.getElementById("title_img").style.width = "250px"
      document.getElementById("btn_container").style.marginTop = "20px"
    }
    else{
      document.getElementById("title_img").style.width = "300px"
      document.getElementById("btn_container").style.marginTop = "40px"
    }
    document.getElementById("description").style.display = "none"


  }, 8000);





  return (
    <div className='HomePage'>

        {/* For Cover Photo */}
        <div className='CoverPhoto_container' id="CoverPhoto_container">
            <img src={cover_photo_array[random_Number]} alt='Movie Banner'/>
        </div>

        {/* For Trailer Video */}
        <div className='TrailerVideo_container'>
            <video src={trailer_video_array[random_Number]} id="trailer_video" muted/>
        </div>

        {/* Movie Primary Details */}
        <div className='Primary_Details'>
            <img src={movie_title_array[random_Number]} alt='Title' className='title_img' id="title_img"/>
            <p className='description' id="description">{movie_description[random_Number]}</p>

            <div className='btn_container' id="btn_container">
              <div className='btn'>
                <img src={play_icon} alt="Play Icon"/>
                <span>Play</span>
              </div>

              <div className='btn'>
                <img src={info_icon} alt="Play Icon"/>
                <span>More Info</span>
              </div>
            </div>
        </div>

        {/* Movie play button and age restrictions */}
        <div className='age_play'>
          <div className='controls'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard"><path d="M11 4.00003C11 3.59557 10.7564 3.23093 10.3827 3.07615C10.009 2.92137 9.57889 3.00692 9.29289 3.29292L4.58579 8.00003H1C0.447715 8.00003 0 8.44774 0 9.00003V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00003ZM5.70711 9.70714L9 6.41424V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70714ZM15.2929 9.70714L17.5858 12L15.2929 14.2929L16.7071 15.7071L19 13.4142L21.2929 15.7071L22.7071 14.2929L20.4142 12L22.7071 9.70714L21.2929 8.29292L19 10.5858L16.7071 8.29292L15.2929 9.70714Z" fill="currentColor"></path></svg>
          </div>
          
          <div className='age_restriction'>
            <span>{age_restriction_array[random_Number]}</span>
          </div>
        </div>

    </div>
  )
}
