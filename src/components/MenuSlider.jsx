import React from 'react'
import {Slider, Slide, Caption} from 'react-materialize'

export default (props) => {
    return <Slider options={{indicators:false}} className="menuSlider"> {
          props.data.map(x => {
            return <Slide key={x.image} image={<img src={x.image}/>}>
                    <Caption style={{ top:"6em" }}>
                      <h3>Hungry? </h3>
                    </Caption>
                   </Slide>
                })
              }
            </Slider>
        }
