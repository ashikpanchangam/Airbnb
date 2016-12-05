import React, {Component} from 'react';
import Header from "./Header";
import HostCarousel from "./HostCarousel";
import JustForWknd from "./JustForWknd";
import ExploreWorld from "./ExploreWorld";
import BelongAnywhere from "./BelongAnywhere";
import OurCommunity from "./OurCommunity";
import Footer from '../footer/Footer';
require('./home.component.scss');

import HomeSearchBar from './Home-search-bar.js';


class Home extends Component {
    render() {
        return (
          <div>
              <Header />
            <HostCarousel />
          <JustForWknd />
        <ExploreWorld />
      <BelongAnywhere />
    <OurCommunity/>
    <Footer />
          </div>
        );
    }
}

export default Home;
