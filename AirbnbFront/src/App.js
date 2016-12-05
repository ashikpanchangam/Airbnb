import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute} from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { browserHistory } from 'react-router'

import Navbar from './navbar/Navbar';
import Home from './home/Home';
import Footer from './footer/Footer';

import Profile from './profile/Profile';
import EditProfile from './profile/EditProfile';
import BecomeAHost from './become-a-host/BecomeAHost';
import BecomeAHostHome from './become-a-host/BecomeAHostHome';
import Room from './become-a-host/steps/stepOne/Room';
import PropertyImages from './become-a-host/steps/stepOne/PropertyImages';
import Bedrooms from './become-a-host/steps/stepOne/Bedrooms';
import Bathrooms from './become-a-host/steps/stepOne/Bathrooms';
import Location from './become-a-host/steps/stepOne/Location';
import Amenities from './become-a-host/steps/stepOne/Amenities';
import Spaces from './become-a-host/steps/stepOne/Spaces';
import Highlights from './become-a-host/steps/stepTwo/Highlights'
import SearchResults from './search-results/SearchResults';
import LoginModal from './navbar/login-modal'
import SignUpModal from './navbar/SignUpModal'
import Rooms from './rooms/Rooms';
import Inbox from './profile/Inbox.js';
import User from './user/User.js';
import HostAnalytics from './profile/hostAnalytics';


injectTapEventPlugin();

//Routing for Navbar
const App = React.createClass({
	render(){
		return (
		<div>
			<Navbar />
			{this.props.children}
		</div>
		)
	}
})

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home} />
			<Route path="/hostAnalytics" component={HostAnalytics} />
			<Route path="/login" component={LoginModal} />
			<Route path="/signup" component={SignUpModal} />
			<Route path="/host" component={BecomeAHost}>
				<IndexRoute component={BecomeAHostHome}/>
				<Route path="room" component={Room} />
				<Route path="bedrooms" component={Bedrooms} />
				<Route path="bathrooms" component={Bathrooms} />
				<Route path="location" component={Location} />
				<Route path="amenities" component={Amenities} />
				<Route path="spaces" component={Spaces} />
				<Route path="images" component={PropertyImages} />
			</Route>
			<Route path="/host/highlights" component={Highlights} />
			<Route path="/profile" component={Profile} />
			<Route path ="/profile/edit" component={EditProfile} />
			<Route path="/rooms(/:rid)" component={Rooms} />
			<Route path="/search-results" component={SearchResults} />
			<Route path="/inbox" component={Inbox} />
			<Route path="/user(/:id)" component={User} />
		</Route>

</Router>
), document.getElementById('root'));
