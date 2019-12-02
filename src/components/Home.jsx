import React from 'react'
import Main from './Main.jsx'
import Specials from './Specials.jsx'
import Events from './Events.jsx'
import Form from './Form.jsx'
import Nav from './Nav'
import Footer from './Footer.jsx'
import Admin from './Admin.jsx'
import { Preloader } from 'react-materialize'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      main: [],
      specials:[],
      events:[],
      forms:[],
      footer:[],
      nav:[],
      _mainMounted: false,
      _specialsMounted:false,
      _eventsMounted:false,
      _formsMounted:false,
      _footerMounted:false,
      showAdmin: false
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchAll();
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
        console.log(e.target.value, 'here in the listener?')
        this.admin();
        secret = "";
      }
    })
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

  fetchAll = () => {
    fetch("/api/get_all")
        .then(blob => blob.json())
        .then(res => {
          let arrs = Object.keys(this.state).filter(x => Array.isArray( this.state[x] ))
          for(let x = 0;x<arrs.length;x++) {
            let data = res.filter(y => y['type'] == arrs[x])[0].data;
            switch( arrs[x] ) {
              case "main" :
              this.setState({
                [arrs[x]]: data.filter(x => x.page == 1)
              })
              break;
              case "specials":
              this.setState({
                [arrs[x]]: data.slides
              })
              break;
              case "nav" :
              this.setState({
                [arrs[x]]: data.sort((a,b) => a.order < b.order ? 1 : -1)
              }, () => {
                setTimeout(() => {
                  this.setState({
                    _specialsMounted:true,
                    _mainMounted: true,
                    _eventsMounted:true,
                    _formsMounted:true,
                    _footerMounted:true
                  })
                }, 2500)
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

  render() {
    return (
      <div>
      { this.state._mainMounted ? (
        <div>
          <Nav data = {this.state.nav}/>
          <Main page="1" data={this.state.main} mounted={this.state._mainMounted}/>
          <Specials data={this.state.specials} mounted={this.state._specialsMounted}/>
          <Events data={this.state.events} mounted={this.state._eventsMounted}/>
          <Form data={this.state.forms} mounted={this.state._formsMounted}/>
          <Footer data={this.state.footer} mounted={this.state._footerMounted} />
          <Admin mounted={this.state.showAdmin} close={this.closeModal}/>
        </div>) : (<div className="react_preloader"><img style={{ "height":"15vh" }}src="https://thumbs.gfycat.com/DimForthrightCanvasback-max-1mb.gif"/></div>)
      }
    </div>
    )
  }
}
