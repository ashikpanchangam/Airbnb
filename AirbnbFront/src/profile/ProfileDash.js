import React from 'react';
import {Link} from 'react-router';
require ('./profile.component.scss');


export default React.createClass({
render(){

const style = {
  color: '#bbb',
  fontSize: '13px',
  padding: '9px 24px',
  marginLeft: 'auto',
  marginRight: 'auto',
  height: '36px',
  backgroundColor: '#484848',
  item: {
    padding: '10px 14px',
    fontWeight: '300px',
  },
}

  return(
          <div style={{backgroundColor: '#484848' }}>
            <div className="profileDash" style={style}>
              <span>
                <a style={style.item} href='/profile'>Dashboard</a>
                {/*<a style={style.item} href="/inbox" >Inbox</a>*/}
                <a style={style.item} href="/listings" >Your Listings</a>
                <a style={style.item} href="/trips/current" >Your Trips</a>
                <Link style={style.item} to="/profile/edit">Edit Profile</Link>
                {/*<a style={style.item} href="/users/notifications" >Account</a>*/}
                {/*<a style={style.item} href="/invite" >Travel Credit</a>*/}
                <a style={style.item} href="/invite" >Analytics</a>
              </span>
            </div>
          </div>
  )
}
});
