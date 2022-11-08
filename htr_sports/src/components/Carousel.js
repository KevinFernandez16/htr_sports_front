import React, {useState} from 'react'
import "./Carousel.css";
import { images } from '../Helpers/CarouselData';

function Carousel() {

    const [currImg, setCurrImg] = useState(0);
   
  return (
    <div className='carousel'>
        <div className='carouselInner' 
        style={{backgroundImage: `url(${images[currImg].img})` }}
        >  
            <div className='left' 
              onClick={() => {
                currImg > 0 && setCurrImg(currImg-1)
                }}
              >   
            <img
                src={'images/angle-left.png'}
                style={{ width: '25px', height: '25px', display: 'block' }}
            />
            </div>
            <div className='centerr'>   
                <h1 className='title'>{images[currImg].title}</h1>
                <pre className='description'>{images[currImg].description}</pre>
            </div>
            <div className='right' 
                onClick={() => {
                  currImg < images.length -1 && setCurrImg(currImg+1)
                }}
            >   
            <img  
                src={'images/angle-right.png'}
                style={{ width: '30px', height: '30px', display: 'block' }}
            />
            </div>
        </div>    
    </div>
  );
}

export default Carousel