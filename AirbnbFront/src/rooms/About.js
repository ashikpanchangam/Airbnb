import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import MessageModal from './message-modal.js'

require('./rooms.component.scss');


import axios from 'axios';

const style = {
  boldFont: {
    fontWeight: '500'
  }
}


class About extends Component {
  constructor(props) {
    super(props)
    this.handleDateChange = this.handleDateChange.bind(this);
    this.guestsChange = this.guestsChange.bind(this);
    this.handleBooking = this.handleBooking.bind(this);
    this.state={
      listing: {
        city: null,
        state: null,
        country: null,
        id: null,
        name: null,
        picture_url: null,
        price: null,
        thumbnail_url: null,
        user: {
          id: null,
        },
        hosts: [{
          picture_url: null,
        }],
        user_id: null,
        xl_picture_url: null,
        address: null,
        bathrooms: null,
        bedrooms: null,
        beds: null,
        cancellation_policy: null,
        country_code: null,
        has_availability: null,
        person_capacity: null,
        picture_count: null,
        picture_urls: [],
        property_type: null,
        reviews_count: null,
        room_type:null,
        access: null,
        amenities: [],
        cancel_policy: null,
        check_in_time: null,
        check_in_time_end: null,
        check_in_time_ends_at: null,
        check_in_time_start: null,
        check_out_time: null,
        cleaning_fee_native: null,
        currency_symbol_right: null,
        summary: null,
        house_rules: null,
      },
        totalTripPrice: null,
        noOfGuests: 1
    }
    axios.get(`/listingInfo/${this.props.rid}`).then(hostInfo =>{
      this.setState({
        listing: {
          city: hostInfo.data.property_detail.city,
          state: hostInfo.data.property_detail.state,
          country: hostInfo.data.property_detail.country,
          id: hostInfo.data.property_detail.property_id,
          name: hostInfo.data.property_detail.property_name,
          picture_url: hostInfo.data.property_detail.picture_url,
          price: hostInfo.data.property_detail.price,
          thumbnail_url: hostInfo.data.property_detail.thumbnail_url,
          user: {
            id: hostInfo.data.property_detail.property_host_id,
          },
          hosts: hostInfo.data.property_detail.hosts,
          user_id: hostInfo.data.property_detail.property_host_id,
          xl_picture_url: hostInfo.data.property_detail.xl_picture_url,
          address: hostInfo.data.property_detail.address,
          bathrooms: hostInfo.data.property_detail.bathrooms,
          bedrooms: hostInfo.data.property_detail.bedrooms,
          beds: hostInfo.data.property_detail.beds,
          cancellation_policy: hostInfo.data.property_detail.cancellation_policy,
          country_code: hostInfo.data.property_detail.country_code,
          has_availability: hostInfo.data.property_detail.has_availability,
          person_capacity: hostInfo.data.property_detail.accommodates,
          picture_count: hostInfo.data.property_detail.picture_count,
          picture_urls: hostInfo.data.property_detail.picture_urls,
          property_type: hostInfo.data.property_detail.category,
          reviews_count: hostInfo.data.property_detail.reviews_count,
          room_type:hostInfo.data.property_detail.category,
          access: hostInfo.data.property_detail.access,
          amenities: hostInfo.data.property_detail.amenities,
          cancel_policy: hostInfo.data.property_detail.cancel_policy,
          check_in_time: hostInfo.data.property_detail.check_in_time,
          check_in_time_end: hostInfo.data.property_detail.check_in_time_end,
          check_in_time_ends_at: hostInfo.data.property_detail.check_in_time_ends_at,
          check_in_time_start: hostInfo.data.property_detail.check_in_time_start,
          check_out_time: hostInfo.data.property_detail.check_out_time,
          cleaning_fee_native: hostInfo.data.property_detail.cleaning_fee_native,
          currency_symbol_right: hostInfo.data.property_detail.currency_symbol_right,
          summary: hostInfo.data.property_detail.description,
          house_rules: hostInfo.data.property_detail.house_rules,
          isBidding: hostInfo.data.property_detail.is_bidding
        }
      })
    });
  }

  handleDateChange() {
    if(this.inputCheckIn.value == "" || this.inputCheckOut.value == "")
      return;

    var noOfDays = parseInt((new Date(this.inputCheckOut.value) - new Date(this.inputCheckIn.value)) / (24 * 3600 * 1000));
    var totalPrice = this.state.listing.price * noOfDays;
    this.setState({totalTripPrice: totalPrice});
  }

  handleBooking() {
    var userId;
    axios.get('/getSession').then(response =>{
        userId = response.data.userId;
        var data = {
            guests: this.state.noOfGuests,
            total: this.state.totalTripPrice,
            check_in: this.inputCheckIn.value,
            check_out: this.inputCheckOut.value,
            user_id: userId,
            host_id: this.state.listing.user.id,
            property_id: this.state.listing.id
        };
        console.log(data);
        axios.post('/createTrip', data).then(response => {
            if(response.data.statusCode == 200)
              alert("Successfully Booked");
        });
    });

  }

  guestsChange(e){
      this.setState({noOfGuests: e.target.value}, function () {
          console.log(this.state.noOfGuests);
      });
  }

  render() {

      var tPrice = '';
      if(this.state.totalTripPrice != null && this.state.totalTripPrice > 0)
        var tPrice = "Total Price for the trip: $" + this.state.totalTripPrice;

      let BidOrBook = null;
      if(this.state.listing.isBidding == 1) {
        BidOrBook = <div><div style={{textAlign:'center'}}>
                    <div><span>Enter Bid Amount: </span></div>
                    <div><input type="text" className="form-control" /></div></div>
                    <div style={{marginTop:'1em', textAlign:'center'}}>
                      <button className="btn btn-default btn-block">Bid</button>
                    </div></div>;
      }
      else {
          BidOrBook = <div><div style={{marginTop:'1em', textAlign:'center'}}>
            <button className="btn btn-default btn-block" onClick={this.handleBooking}>Book</button>
          </div></div>;
      }

        return (
          <div>
            <div style={{backgroundColor:"#f5f5f5", paddingBottom:"25px"}}>
              <div className="row" style={{padding:"0 15px", letterSpacing:'1px'}} >
                <div className="col-md-5 col-md-offset-1" >
                <div className="cnt-sm-left-md" style={{fontSize:"16px", fontWeight:"500", paddingTop: '35px', Color:'#484848'}}>About this listing</div>
                <div style={{fontSize: '13px', color:'#4d4d4d', paddingTop: '15px'}}>{this.state.listing.summary}</div>
                <MessageModal rid={this.props.rid} />
              <div style={{marginTop: '15px', marginBottom: "15px", border: "0", borderTop: '1px solid #dce0e0'}}></div>
              <div className="col-sm-4" style={{fontSize: '13px',  color: "#767676", padding:'0px'}} >The Space</div>
              <div className="col-sm-4" style={{fontSize: '13px', color:'#4d4d4d', padding:'0px'}}>
                <div>Accommodates: <span style={style.boldFont}>{this.state.listing.person_capacity}</span></div>
                <div>Bathrooms: <span style={style.boldFont}>{this.state.listing.bathrooms}</span></div>
                <div>Beds: <span style={style.boldFont}>{this.state.listing.beds}</span></div>
              </div>
              <div className="col-sm-4" style={{fontSize: '13px', color:'#4d4d4d', padding:'0px'}}>
              <div>Check In: <span style={style.boldFont}>After 12PM</span></div>
              <div>Check Out:<span style={style.boldFont}>11AM</span></div>
              <div>Property type: <span style={style.boldFont}>{this.state.listing.property_type}</span></div>
              <div>Room type: <span style={style.boldFont}>{this.state.listing.room_type}</span></div>
              </div>
                </div>
                <div className="col-md-4 col-md-offset-1" style={{marginTop: '1em'}}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="inputCheckIn">Check In</label>
                        <input type="date" ref={(input) => { this.inputCheckIn = input; }} className="form-control" id="inputCheckIn" onChange={this.handleDateChange} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="inputCheckOut">Check Out</label>
                        <input type="date" ref={(input) => { this.inputCheckOut = input; }} className="form-control" id="inputCheckOut" onChange={this.handleDateChange} />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="Guests">Guests</label>
                    <select selected={this.state.noOfGuests} className="form-control" onChange={this.guestsChange}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                    </select>
                  </div>
                  <div className="row">
                    Price per Night: {(this.state.listing.price != null)? '$'+this.state.listing.price : ''}
                    <br/>
                    {tPrice}
                  </div>
                    {BidOrBook}
                </div>

              </div>
            </div>
          </div>
        );
    }
}

export default About;
