var HostDataModel = require('./HostData');
import axios from 'axios';

function Finish() {
    let amenities = HostDataModel.getHostAmenities();
    let amenitiesString = "";
    let isBidding = 0;
    if(amenities.length > 0) {
        for(let i = 0; i < amenities.length; i++) {
            if(i == 0)
                amenitiesString += amenities[i];
            else
                amenitiesString += " | " + amenities[i];

        }
    }
    console.log(amenitiesString);
    let msg_payload = {
        content: {
            "category": HostDataModel.getHostCategory(),
            "address": HostDataModel.getHostAddress(),
            "city": HostDataModel.getHostCity(),
            "state": HostDataModel.getHostState(),
            "zip_code": HostDataModel.getHostZipCode(),
            "country": HostDataModel.getHostCountry(),
            "accommodates": HostDataModel.getHostAccommodates(),
            "beds": HostDataModel.getHostBeds(),
            "bathrooms": HostDataModel.getHostBathrooms(),
            "amenities": amenitiesString,
            "price": HostDataModel.getHostPrice(),
            "description": "Dummy Host",
            "is_bidding": isBidding,
            "property_name": "dummy property",
            "lat": HostDataModel.getHostLat(),
            "lng": HostDataModel.getHostLng()
        },
        images: HostDataModel.getHostImages()
    };
    console.dir(msg_payload);
    axios.post('/createHost', msg_payload)
        .then(function (response) {
            console.dir(response);
        })
        .catch(function (error) {
            console.log(error);
        });

}

exports.Finish = Finish;