import React from 'react'
import Netflix_Logo from "../Assets/Netflix_Logo.png"
import Default_Avatar from "../Assets/Default_Avatar.png"

export default function Navbar() {
  return (
    <nav>
      <div className='left'>
        <img src={Netflix_Logo} alt="Netflix Logo" className='logo'/>

        <div className='nav_links'>
          <p className='links active'>Home</p>
          <p className='links'>TV Shows</p>
          <p className='links'>Movies</p>
          <p className='links'>New & Popular</p>
          <p className='links'>My List</p>
        </div>
      </div>

      <div className='right'>
        <img src={Default_Avatar} alt="Avatar" className='avatar'/>
      </div>
    </nav>
  )
}
