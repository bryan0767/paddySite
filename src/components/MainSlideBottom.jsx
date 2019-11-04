import React from "react"
import { Button } from "react-materialize"
import { HashLink } from 'react-router-hash-link';

export default (props) => {
  return <div className="bottomRow">
          {
            props.data.bottomMenu.map((a, b) => {
              return <HashLink to={`/${a.hash}`} smooth>
                      <Button key={a.title} className="MainCarouselButtons"
                              style={{ margin: b == 1 ? "0 15px" : "0"}}>
                        {a.title}
                      </Button>
                    </HashLink>
            })
          }
        </div>
      }
