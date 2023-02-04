import React from 'react'
import Netflix_Logo from "../Assets/Netflix_Logo.png"
import Default_Avatar from "../Assets/Default_Avatar.png"

// From Mui
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

//Call jquery library
import $ from 'jquery'; 

export default function Navbar() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Navigation bar effect when user is scrolling
  var lastScrollTop = 0;
  $(window).scroll(function(event){    
      var st = $(this).scrollTop();
      if (st > lastScrollTop){
        document.getElementById("navbar").style.backgroundColor = "#080808"
      }
      else if($(window).scrollTop() === 0) {  
        document.getElementById("navbar").style.backgroundColor = "transparent"
      }
      lastScrollTop = st;
  }); 

  return (
    <nav id="navbar">
      <div className='left'>
        <img src={Netflix_Logo} alt="Netflix Logo" className='logo' loading="lazy"/>

        <div className='nav_links'>
          <a className='links active' href='#HomePage'>Home</a>
          <a className='links' href='#tvShows_now_container'>TV Shows</a>
          <a className='links' href='#Movies_now_container'>Movies</a>
          <a className='links' href='#Popular_now_container'>New & Popular</a>
          <a className='links' href='#list_container'>My List</a>

          {/* For small devices links */}
          <div className='browse_container'  onClick={handleClick}>
            <p>Browse</p>
            <ArrowDropDownIcon/>
          </div>

          {/* Menu Container on small devices */}
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <div></div>
            <MenuItem onClick={handleClose}>
              <a className='mui_links mui_links_active' href='#HomePage'>Home</a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a className='mui_links' href='#tvShows_now_container'>TV Shows</a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a className='mui_links' href='#Movies_now_container'>Movies</a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a className='mui_links' href='#Popular_now_container'>New & Popular</a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a className='mui_links' href='#list_container'>My List</a>
            </MenuItem>
            
          </Menu>

        </div>
      </div>

      <div className='right'>
        <img src={Default_Avatar} alt="Avatar" className='avatar' loading="lazy"/>
      </div>
    </nav>
  )
}
