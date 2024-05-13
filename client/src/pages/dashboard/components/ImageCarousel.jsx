import { useState } from "react"
import arrowSvg from '../../../../public/svg/arrow.svg'

function ImageCarousel({carouselData}){

    const [index,setIndex] = useState(0)
    return(
        <div className="carousel">    
            <img className="c-img ps-img" src={carouselData[index].image_url} alt="" />
            <h3 className="a-text">{carouselData[index].image_name}</h3>
            <button className="arrow right-a" onClick={()=>{
                if(index == carouselData.length-1){
                    setIndex(0)
                    return
                }
                setIndex(index+1)
            }}><img src={arrowSvg} alt="" /></button>
            <button className="arrow left-a" onClick={()=>{
                if(index == 0){
                    setIndex(carouselData.length-1)
                    return
                }
                setIndex(index-1)
            }}><img src={arrowSvg} alt="" /></button>
        </div>
    )
}
export default ImageCarousel