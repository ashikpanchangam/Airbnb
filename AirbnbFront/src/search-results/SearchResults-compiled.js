'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _Navbar = require('../navbar/Navbar.js');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _rheostat = require('rheostat');

var _rheostat2 = _interopRequireDefault(_rheostat);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactSlick = require('react-slick');

var _reactSlick2 = _interopRequireDefault(_reactSlick);

var _reactRouter = require('react-router');

var _DateRangePickerGmapPage = require('../date-range-picker/DateRangePickerGmapPage.jsx');

var _DateRangePickerGmapPage2 = _interopRequireDefault(_DateRangePickerGmapPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('./searchResults.scss');
require('./date-picker-results.scss');

var sliderMin = 0;

var ProgressBar = function (_React$Component) {
  _inherits(ProgressBar, _React$Component);

  function ProgressBar(props) {
    _classCallCheck(this, ProgressBar);

    return _possibleConstructorReturn(this, (ProgressBar.__proto__ || Object.getPrototypeOf(ProgressBar)).call(this, props));
  }

  _createClass(ProgressBar, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { className: 'rheostat-progress' });
    }
  }]);

  return ProgressBar;
}(_react2.default.Component);

var PrevArrow = function (_React$Component2) {
  _inherits(PrevArrow, _React$Component2);

  function PrevArrow(props) {
    _classCallCheck(this, PrevArrow);

    return _possibleConstructorReturn(this, (PrevArrow.__proto__ || Object.getPrototypeOf(PrevArrow)).call(this, props));
  }

  _createClass(PrevArrow, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        _extends({}, this.props, { className: 'prev-arrow' }),
        _react2.default.createElement('i', { style: { color: 'white', fontSize: '40px' }, className: 'fa fa-chevron-left', 'aria-hidden': 'true' })
      );
    }
  }]);

  return PrevArrow;
}(_react2.default.Component);

var NextArrow = function (_React$Component3) {
  _inherits(NextArrow, _React$Component3);

  function NextArrow(props) {
    _classCallCheck(this, NextArrow);

    return _possibleConstructorReturn(this, (NextArrow.__proto__ || Object.getPrototypeOf(NextArrow)).call(this, props));
  }

  _createClass(NextArrow, [{
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'div',
        _extends({}, this.props, { className: 'next-arrow' }),
        _react2.default.createElement('i', { style: { color: 'white', fontSize: '40px' }, className: 'fa fa-chevron-right', 'aria-hidden': 'true' })
      );
    }
  }]);

  return NextArrow;
}(_react2.default.Component);

var SearchResults = function (_React$Component4) {
  _inherits(SearchResults, _React$Component4);

  function SearchResults(props) {
    _classCallCheck(this, SearchResults);

    var _this4 = _possibleConstructorReturn(this, (SearchResults.__proto__ || Object.getPrototypeOf(SearchResults)).call(this, props));

    _this4.render = function () {

      var settings = {
        nextArrow: _react2.default.createElement(NextArrow, null),
        prevArrow: _react2.default.createElement(PrevArrow, null),
        arrows: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 0.0001
      };

      var arrOfSliders = [];

      if (_this4.state.picture_urls.length != 0) {
        for (var i = 0; i < _this4.state.picture_urls.length; i++) {
          var slider = _react2.default.createElement(
            'div',
            { className: 'slider-container' },
            _react2.default.createElement(
              _reactSlick2.default,
              _extends({ className: 'slider' }, settings),
              _react2.default.createElement(
                'div',
                { className: 'img-container' },
                _react2.default.createElement('img', { className: 'slider-img', src: _this4.state.picture_urls[i][0] })
              ),
              _react2.default.createElement(
                'div',
                { className: 'img-container' },
                _react2.default.createElement('img', { className: 'slider-img', src: _this4.state.picture_urls[i][1] })
              ),
              _react2.default.createElement(
                'div',
                { className: 'img-container' },
                _react2.default.createElement('img', { className: 'slider-img', src: _this4.state.picture_urls[i][2] })
              ),
              _react2.default.createElement(
                'div',
                { className: 'img-container' },
                _react2.default.createElement('img', { className: 'slider-img', src: _this4.state.picture_urls[i][3] })
              ),
              _react2.default.createElement(
                'div',
                { className: 'img-container' },
                _react2.default.createElement('img', { className: 'slider-img', src: _this4.state.picture_urls[i][4] })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'price-inside-img' },
              '$',
              _this4.state.price_array[i]
            ),
            _react2.default.createElement(
              'div',
              { className: 'panel-card-section' },
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/rooms/' },
                _react2.default.createElement(
                  'p',
                  { className: 'img-title' },
                  _this4.state.propertyNames[i]
                )
              ),
              _react2.default.createElement(
                'p',
                { className: 'room-type-card-section' },
                _this4.state.room_type_array[i],
                ' ',
                _this4.state.star_rating[i]
              )
            )
          );
          arrOfSliders.push(slider);
        }
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'main',
          { className: 'container-search' },
          _react2.default.createElement(
            'div',
            { className: 'cards-container col-xs-12' },
            _react2.default.createElement(
              'div',
              { className: 'date-panel' },
              _react2.default.createElement(
                'span',
                { className: 'dates-panel-label' },
                'Dates'
              ),
              _react2.default.createElement(
                'div',
                { className: 'date-picker-container' },
                _react2.default.createElement(_DateRangePickerGmapPage2.default, { values: _this4.props.values, roomTypeSelected: _this4.props.roomTypeSelected, location: _this4.state.location, renderMap: _this4.renderMap.bind(_this4), className: 'date-picker' })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'room-panel' },
              _react2.default.createElement(
                'span',
                { className: 'room-types-header hidden-xs' },
                'Room Types'
              ),
              _react2.default.createElement(
                'div',
                { className: 'checkboxes' },
                _react2.default.createElement(
                  'div',
                  { className: 'room-type-container' },
                  _react2.default.createElement('img', { className: 'room-type-icon', src: '/assets/icons/house.png' }),
                  _react2.default.createElement(
                    'div',
                    { className: 'room-type-checkbox-section' },
                    _react2.default.createElement(
                      'label',
                      null,
                      'Entire Home'
                    ),
                    _react2.default.createElement('input', { className: 'checkbox', id: 'entireHome', type: 'checkbox', name: 'Entire home/apt', value: _this4.state.entireHome, onChange: _this4.handleRoomTypes })
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'room-type-container' },
                  _react2.default.createElement('img', { className: 'room-type-icon', src: '/assets/icons/door.png' }),
                  _react2.default.createElement(
                    'div',
                    { className: 'room-type-checkbox-section' },
                    _react2.default.createElement(
                      'label',
                      null,
                      'Private Room'
                    ),
                    _react2.default.createElement('input', { className: 'checkbox', id: 'privateRoom', type: 'checkbox', name: 'Private room', value: _this4.state.privateRoom, onChange: _this4.handleRoomTypes })
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'room-type-container' },
                  _react2.default.createElement('img', { className: 'room-type-icon', src: '/assets/icons/couch.png' }),
                  _react2.default.createElement(
                    'div',
                    { className: 'room-type-checkbox-section' },
                    _react2.default.createElement(
                      'label',
                      null,
                      'Shared Room'
                    ),
                    _react2.default.createElement('input', { className: 'checkbox', id: 'sharedRoom', type: 'checkbox', name: 'Shared room', value: _this4.state.sharedRoom, onChange: _this4.handleRoomTypes })
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'rheostat-container' },
              _react2.default.createElement(
                'span',
                { className: 'rheostat-header' },
                'Price Range'
              ),
              _react2.default.createElement(_rheostat2.default, { progressBar: ProgressBar, min: _this4.state.sliderMin, max: _this4.state.sliderMax, onValuesUpdated: _this4.updateValue, values: _this4.state.values, className: 'rheostat' }),
              _react2.default.createElement(
                'ul',
                { className: 'tempVals' },
                _this4.state.values.map(function (value, i) {
                  return _react2.default.createElement(
                    'li',
                    { className: 'val', key: i },
                    '$',
                    _this4.props.formatValue ? _this4.props.formatValue(value) : value
                  );
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'arrayOfSliders' },
              arrOfSliders.map(function (slider, i) {
                return _react2.default.createElement(
                  'div',
                  { key: i },
                  slider
                );
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'GMap-canvas hidden-xs', ref: 'mapCanvas' },
            '  '
          )
        )
      );
    };

    _this4.updateValue = function (sliderState) {

      var renderMap = _lodash2.default.debounce(_this4.renderMap, 300);

      _this4.setState({
        values: sliderState.values
      }, renderMap(_this4.state.roomTypeSelected, _this4.state.values));
    };

    _this4.handleRoomTypes = function (e) {

      if (e.target.value === 'false') {
        _this4.setState(_defineProperty({}, e.target.id, true), function () {
          var arr = [_this4.state.entireHome, _this4.state.privateRoom, _this4.state.sharedRoom];
          return _this4.renderMap(_this4.convertToNames(arr));
        });
      } else if (e.target.value === 'true') {

        _this4.setState(_defineProperty({}, e.target.id, false), function () {
          var arr = [_this4.state.entireHome, _this4.state.privateRoom, _this4.state.sharedRoom];
          return _this4.renderMap(_this4.convertToNames(arr));
        });
      }
    };

    _this4.convertToNames = function (arr) {
      var names = ['Entire home/apt', 'Private room', 'Shared room'];

      for (var i = 0; i < arr.length; i++) {

        if (arr[i] === false) {
          names.splice(i, 1);
          arr.splice(i, 1);
          i--;
        }
      }

      _this4.setState({ roomTypeSelected: names });
      return names;
    };

    _this4.createMap = function () {
      var mapOptions = {
        center: _this4.mapCenter()
      };
      return new google.maps.Map(_this4.refs.mapCanvas, mapOptions);
    };

    _this4.mapCenter = function () {

      return new google.maps.LatLng(_this4.state.iCenter.lat, _this4.state.iCenter.lng);
    };

    _this4.createMarker = function (lat, lng, price, name, pic, id, room_type, infowindow) {

      var position = new google.maps.LatLng(lat, lng);

      var contentString = '<div class=\'img-container-gmap\'>\n       <img class=\'slider-img-gmap\' src=\'' + pic + '\'/></div>\n       <div class=\'price-inside-img-gmap\'>$' + price + '</div>\n       <div class=\'panel-card-section-gmap \'>\n         <p class=\'img-title-gmap\'>' + name + '</p>\n         <p class=\'room-type-card-section-gmap\'>' + room_type + '</p>\n       </div>';

      var marker = new Marker({
        position: position,
        map: _this4.map,
        infowindow: infowindow,
        icon: {
          path: SQUARE_PIN,
          fillOpacity: 0,
          strokeWeight: 0
        },
        map_icon_label: '<span class=price>$' + price + '</span>'
      });

      google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(contentString);
        infowindow.open(_this4.map, marker);
      });

      google.maps.event.addListener(_this4.map, "click", function () {
        infowindow.close();
      });

      return marker;
    };

    _this4.renderMap = function (arr) {
      var priceRange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [null, null];


      _axios2.default.post('/search', {
        searchVal: _this4.state.location,
        startDate: _this4.state.startDate,
        endDate: _this4.state.endDate,
        numGuests: _this4.state.numGuests,
        room_types: arr,
        price_min: _this4.state.sliderMin,
        price_max: _this4.state.sliderMax
      }).then(function (response) {

        var x = response.data;

        console.log(x.results_json.search_results[0]);

        var listingsArray = response.data.results_json.search_results;
        _this4.map = _this4.createMap();
        _this4.latlngbounds = new google.maps.LatLngBounds();

        var pics_array = [];
        var propertyNames = [];
        var star_rating = [];
        var price_array = [];
        var room_type_array = [];
        _this4.setState({ id_array: x.property_ids });

        var infowindow = new google.maps.InfoWindow();

        for (var i = 0; i < listingsArray.length; i++) {

          var lat = listingsArray[i].listing.lat;
          var lng = listingsArray[i].listing.lng;

          _this4.marker = _this4.createMarker(lat, lng, listingsArray[i].pricing_quote.rate.amount, listingsArray[i].listing.name, listingsArray[i].listing.picture_url, listingsArray[i].listing.id, listingsArray[i].listing.room_type, infowindow);

          var myLatLng = new google.maps.LatLng(lat, lng);
          _this4.latlngbounds.extend(myLatLng);

          pics_array.push(listingsArray[i].listing.picture_urls);
          propertyNames.push(listingsArray[i].listing.name);
          star_rating.push(listingsArray[i].listing.star_rating);
          price_array.push(listingsArray[i].pricing_quote.rate.amount);
          room_type_array.push(listingsArray[i].listing.room_type);

          _this4.setState({ picture_urls: pics_array,
            propertyNames: propertyNames,
            star_rating: star_rating,
            price_array: price_array,
            room_type_array: room_type_array
          });
        }

        if (x.max_price_total === null && x.min_price_total === null) {
          var min = Math.min.apply(Math, price_array);
          var max = Math.max.apply(Math, price_array);
          _this4.setState({
            sliderMin: min,
            sliderMax: max,
            values: [min, max]
          });
        }

        _this4.map.fitBounds(_this4.latlngbounds);

        _this4.setState({
          iCenter: {
            lat: x.center_lat,
            lng: x.center_lng
          }
        });
      });
    };

    _this4.state = {
      iCenter: {
        lng: -90.1056957,
        lat: 29.9717272
      },
      checker: false,
      icon: {
        path: 'M 0,0 20,0 20,16 14,16 10,24 6,16 0,16 z',
        fillColor: '#FF5A5F',
        fillOpacity: 1,
        scale: 1.5,
        strokeColor: 'RGBA(100,100,100,0.5)',
        strokeWeight: 1
      },
      entireHome: false,
      privateRoom: false,
      sharedRoom: false,
      location: null,
      data: null,
      startDate: null,
      endDate: null,
      numGuests: 1,
      values: [0, 100],
      sliderMin: 0,
      sliderMax: 100,
      roomTypeSelected: null,
      picture_urls: [],
      propertyNames: [],
      star_rating: [],
      price_array: [],
      room_type_array: [],
      id_array: []
    };

    _axios2.default.get('/getData').then(function (response) {

      var x = response.data;

      _this4.setState({
        iCenter: {
          lat: x.center_lat,
          lng: x.center_lng
        },
        location: x.canonical_location_en
      });

      _this4.setState({
        data: x,
        location: x.location,
        startDate: x.startDate,
        endDate: x.endDate,
        numGuests: x.numGuests,
        sliderMax: x.max_price_total,
        sliderMin: x.min_price_total,
        values: [x.min_price_total, x.max_price_total]
      }, function () {
        _this4.renderMap(x);
      });
    });
    return _this4;
  }

  _createClass(SearchResults, null, [{
    key: 'propTypes',
    value: function propTypes() {
      initialCenter: _react2.default.PropTypes.objectOf(_react2.default.PropTypes.number).isRequired;
    }
  }]);

  return SearchResults;
}(_react2.default.Component);

exports.default = SearchResults;

//# sourceMappingURL=SearchResults-compiled.js.map