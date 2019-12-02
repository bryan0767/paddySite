import React from 'react'
import NavSideNav from './NavSideNav'
import {Button, Icon, Input} from 'react-materialize'
import { HashLink } from 'react-router-hash-link';

export default class Nav extends React.Component {

  render() {
    return (
      <nav className="mainNav">
       <div className="nav-wrapper">
           <HashLink to ="/#main" smooth>
             <div className="brand-logo center mainLogo">Paddy Macs</div>
           </HashLink>
         <ul id="nav-mobile">
           { this.props.data.map(x => {
             return x.position == "left" ? (
               <div data-key={x.id} key={x.icon} className="hide-on-small-only navInputs">{x.icon}</div>
             ) : ( x.hash ? (
                 <a href={x.hash} className="hide-on-small-only icons"><li key={x.icon} className={x.icon}></li></a>
               ) : ( <NavSideNav trig={<li key={x.icon} className={`${x.icon} burger`}></li> } />)
             )
           })}
         </ul>
       </div>
     </nav>
    );
  }
}
