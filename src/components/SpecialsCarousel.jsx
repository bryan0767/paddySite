import React from 'react'
import { Carousel } from "react-materialize"

export default (props) => {
  return <Carousel
           options = {{
             indicators:true
           }}
           className="specialsCarousel">
           {
             props.data.map(x => {
               return <div key = {x.subMenuA}
                           className="mainCover centerFlex"
                           style={{
                             width:"80%",
                             height:"100%",
                             backgroundImage:`url(${x.image})`}}>
                           <div className="blackBox">
                              <label style={{ fontSize:"20px", color:"white" }}>{x.title}</label>
                              <div>{x.subMenuA}</div>
                              <div>{x.subMenuB}</div>
                          </div>
                       </div>
                   })
               }
        </Carousel>
}
