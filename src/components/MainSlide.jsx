import React from 'react'
import MainSlideTop from './MainSlideTop'
import MainSlideBottom from './MainSlideBottom'
import { Slider, Slide, Caption} from "react-materialize"

export default (props) => {
    return <Slider fullscreen options={{indicators:true, interval:10000}}> {
                  props.data.map(x => {
                    return <Slide key = {x.image}
                                  image = { <img src={x.image}/> }>
                                <Caption style={{top:"32vh"}}>
                                  <MainSlideTop data = {x}/>
                                </Caption>
                                <MainSlideBottom data = {x}/>
                            </Slide>
                        })
                    }
           </Slider>
}
