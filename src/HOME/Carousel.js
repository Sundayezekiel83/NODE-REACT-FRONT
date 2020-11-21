

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel, onChange, onClickItem, onSwipeStart, onClickThumb} from 'react-responsive-carousel';
import img from '../Asset/nigtech.jpg'
import img1 from '../Asset/DESIGN.jpg'
import img2 from '../Asset/cream.jpg'
 import {Link} from 'react-router-dom'
class DemoCarousel extends Component {
    render() {
        return (
            
          <div>
                    <Carousel autoPlay showThumbs={true} onChange={onChange}
                    
                    onClickItem={onClickItem} onClickThumb={onClickThumb} onSwipeStart={onSwipeStart} >
               
                
                               <div>
                    <img src={img1} />
                    <Link to='/shop'>  <p className=" legend h2 text-info">SHOP NOW</p> </Link> 
                </div>
               
                <div>
                    <img src={img2} />
                    <Link to='/shop'>  <p className=" legend h2 text-info">SHOP NOW</p> </Link> 
                </div>

               
            </Carousel>
            </div>
        );
    }
  }

  export default DemoCarousel;