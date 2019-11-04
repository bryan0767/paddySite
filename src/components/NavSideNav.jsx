import React from 'react'
import {SideNav, SideNavItem, Button} from 'react-materialize'
import { HashLink } from 'react-router-hash-link';

export default (props) => {

  let closeEmUp = () => {
    M.Sidenav._sidenavs[0]._closeBound();
  }

  return <div>
            <SideNav trigger={props.trig}
                     className="navSide"
                     options={{
                                closeOnClick: true,
                                edge:"right",
                                draggable:true
                              }}>
              <SideNavItem userView />
              <SideNavItem waves><HashLink to="/#main" onClick={closeEmUp}>Home</HashLink></SideNavItem>
              <SideNavItem waves><HashLink to="/#specials" smooth onClick={closeEmUp}>Specials</HashLink></SideNavItem>
              <SideNavItem divider />
              <SideNavItem href="menu"><HashLink to="/menu" onClick={closeEmUp}>Menu</HashLink></SideNavItem>
              <SideNavItem waves><HashLink to="/#forms" smooth onClick={closeEmUp}>Reserve</HashLink></SideNavItem>
            </SideNav>
          </div>
        }
