import React from 'react';
import {Component} from 'react';
import { Link, browserHistory } from 'react-router'
import { stack as Menu } from 'react-burger-menu';
import Radium from 'radium';
import axios from 'axios'

require ('./navbar.component.scss');

import LoginModal from './login-modal.js'

let RadiumLink = Radium(Link);

var styles = {
  bmBurgerButton: {
    position: 'absolute',
    width: '24px',
    height: '20px',
    left: '10px',
    top: '25px'
  },
  bmBurgerBars: {
    background: '#ff5a5f'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

//Code for the NavBar
class Navbar extends React.Component {
  constructor(props){
    super(props);
    // this.state = {userName:'', userId:''};
    axios.get('/getSession').then(response => {
        if(response.data.userName)
          this.setState({userName: response.data.userName, userId: response.data.userId});
    });
  }
  handleLogout(e) {
    e.preventDefault();
    axios.get('/logout').then(response => {
      if(response.data.statusCode == 200)
        window.location = '/';
    });
  }
  render = () => {
    let login = null;
    let signup = null;
    if(this.state && this.state.userName)
        login = <span className="dropdown" style={{marginRight:'2em', color:'blue'}}>
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.state.userName} <span className="caret"/></a>
          <ul className="dropdown-menu" style={{marginLeft:'-4em'}}>
            <li><Link to="/profile">Profile</Link></li>
            <li role="separator" className="divider"/>
            <li><a href="/logout" onClick={this.handleLogout}>Logout</a></li>
          </ul>
          </span>;
    else {
        login = <a href="/login" className="left-border-menu">Login</a>;
        signup = <a href="/signup" className="left-border-menu">Sign Up</a>;
    }

    return (

      <header className="header">
        {/*<Menu styles={ styles }>*/}
          {/*<a id="home" className="menu-item" href="/">Home</a>*/}
          {/*<RadiumLink className="menu-item" to="/host">Become a Host</RadiumLink>*/}
          {/*<a id="contact" className="menu-item" href="/signup">Sign Up</a>*/}
          {/*<a id="login" className="menu-item" href="/auth/facebook">Login</a>*/}
        {/*</Menu>*/}
        <a href="/" className="header_logo"><img className="air-logo" src="/assets/images/airbnb.png" /></a>
        <div className="menu">
          <Link to="/host"><span className="become-a-host">Become a Host</span></Link>
          <a href="/help" className="left-border-menu">Help</a>
          {/* <a href="/auth/facebook" className="left-border-menu">Login</a> */}
          {/* <a onClick={this.handleClick}><span className="left-border-menu">Login</span></a> */}

          {/*<a href="/signup" className="left-border-menu">Sign Up</a>*/}
          {/*<a href="/login" className="left-border-menu">Login</a>*/}
          {signup}
          {login}

          {/*<LoginModal className="left-border-menu"/>*/}
        </div>

      </header>
    );
  }

};

export default Navbar;
