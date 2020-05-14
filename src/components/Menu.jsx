import React from 'react'

import Nav from "./Nav"
import MenuSlider from "./MenuSlider"
import MenuItems from "./MenuItems"
import Footer from './Footer'
import Admin from './Admin'

import { Row, Col, Button, Preloader } from 'react-materialize'

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      main:[],
      menu:[],
      nav:[],
      footer:[],
      showAdmin:false,
      _isMounted:false,
      _footerMounted:false,
      prices: 0
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchAll()
    let secret = "";

    document.addEventListener("scroll", () => {
      $.each($(".lazy"), (y,x) => {

        let rect = x.getBoundingClientRect();
        let rectTop = rect.top;
        let rectBottom = rect.bottom;

        if(rectTop < 750 && rectBottom > 100 ) {
          x.classList.add('active');
        } else {
          x.classList.remove('active');
        }
      })
    })

    document.addEventListener('keydown', (e) => {
      secret += e.key
      if(e.code.toLowerCase() == 'escape') {
        secret = "";
      } else if(secret == 'admin') {
        this.admin();
        secret = "";
      }
    })
  }

  fetchAll = () => {
    fetch("/api/get_all")
        .then(blob => blob.json())
        .then(res => {
          let arrs = Object.keys(this.state).filter(x => Array.isArray( this.state[x] ))
          for(let x = 0;x<arrs.length;x++) {

            let fetched = res.filter(y => y['type'] == arrs[x]);
            let data = fetched[0].data;

            switch( arrs[x] ) {
              case "main" :
              let mainData = data.filter(x => x.page == 2)

              mainData.map(a => {
                for(let z = 0;z < fetched[0].images.length;z++) {
                  if(a['image_id'] == fetched[0].images[z]['_id']) {
                      a['image'] = fetched[0].images[z]['src']
                  }
                }
                return a
              })

              this.setState({
                [arrs[x]]: mainData
              })
              break;
              case "nav" :
              this.setState({
                [arrs[x]]: data.sort((a,b) => a.order < b.order ? 1 : -1)
              }, () => {
                setTimeout(() => {
                  this.setState({
                    _isMounted: true,
                    _footerMounted:true
                  })
                }, 2500)
              })
              break;
              case "menu" :
              this.setState({
                [arrs[x]]: data,
                prices:fetched['show_prices']
              })
              break;
              default:
              this.setState({
                [arrs[x]]: data
              })
              break;
            }
          }
        })
  }


  componentWillUnmount() {
      this._isMounted = false;
  }

  admin = () => {
    this.setState({
      showAdmin:true
    })
  }

  closeModal = () => {
    this.setState({
      showAdmin:false
    })
  }

  render() {
    return (
      <div>
        {this.state._isMounted ? (
        <div style={{ overflow:"auto" }}>
          <Nav data={this.state.nav}/>
          <MenuSlider data={this.state.main} />
          <MenuItems data={this.state.menu} mounted={this.state._isMounted} prices={this.state.prices}/>
          <Footer data={this.state.footer} mounted={this.state._footerMounted}/>
          <Admin mounted={this.state.showAdmin} close={this.closeModal}/>
        </div>
      ) : (<div className="react_preloader"><img style={{ "height":"15vh" }} src="https://thumbs.gfycat.com/DimForthrightCanvasback-max-1mb.gif"/></div>)}
      </div>
    )
  }
}
