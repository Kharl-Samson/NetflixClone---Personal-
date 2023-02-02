import React from 'react';

export default function Item(props) {
  function hover_this_item(){
    document.getElementById("each_image"+props.class_key).style.height = "250px"
  }

  function out_hover_this_item(){
    document.getElementById("each_image"+props.class_key).style.height = "150px"
  }


  return (
    <div className="each_image" id={"each_image"+props.class_key} onMouseOver={hover_this_item} onMouseOut={out_hover_this_item}>
      <img src={"https://image.tmdb.org/t/p/original/"+props.image} alt="Movie Cover" className='movie_cover'/>
    </div>

  )
}
