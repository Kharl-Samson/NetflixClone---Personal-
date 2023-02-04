import React from 'react'

// From Mui
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// From React-youtube
import YouTube from 'react-youtube';

export default function VideoModal_suspenseful(props) {
    const opts = {
        playerVars: {
          autoplay: 1,
        },
    };

  return (
    <div className='modal_container' id="youtube_modal_suspenseful">
    <Box sx={{ display: 'flex' }} id="progress_bar_suspenseful">
      <CircularProgress sx={{color:"red"}} style={{height:"100px",width:"100px"}} />
    </Box>

   <div className='my_modal' id='my_modal_suspenseful'>
     <div className='close_btn' onClick={props.close_info}><CloseIcon/></div>
     {/* Testing youtube player */}
     <YouTube 
       id="youtube_player"
       videoId={props.trailerId} 
       opts={opts}
       onReady={props.onReady}
     />
     <div className='details_container'>
        <p className='title' id="modal_movie_title_suspenseful">N/A</p>
        <p className='genres' id="modal_movie_genre_suspenseful">N/A</p>
        <p className='date'><span>Release Date : </span> <span id="modal_movie_date_suspenseful">N/A</span></p>
        <div className='ovrview_container'>
          <p className='overview' id="modal_movie_overview_suspenseful">N/A</p>
        </div>
     </div>
   </div>
 </div>
  )
}
