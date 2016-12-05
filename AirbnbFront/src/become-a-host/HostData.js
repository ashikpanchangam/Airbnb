let hostCategory = "Private room";
let hostAddress = "";
let hostCity = "";
let hostState = "";
let hostZipCode = "";
let hostCountry = "";
let hostAccommodates = 1;
let hostBeds = 1;
let hostBathrooms = 1;
let hostAmenities = [];
let hostPrice = 0;
let hostBiddingType = 'One Time';
let hostImages = {
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    image5: '',
};
let hostLat = 0;
let hostLng = 0;
let hostDescription;
let hostPropertyId;

function setHostCategory(c) {
    hostCategory = c;
}
function getHostCategory() {
    return hostCategory;
}
function setHostBeds(c) {
    hostBeds = c;
}
function getHostBeds() {
    return hostBeds;
}
function setHostAccommodates(c) {
    hostAccommodates = c;
}
function getHostAccommodates() {
    return hostAccommodates;
}
function setHostBathrooms(c) {
    hostBathrooms = c;
}
function getHostBathrooms() {
    return hostBathrooms;
}
function setHostAmenities(c) {
    hostAmenities = c;
}
function getHostAmenities() {
    return hostAmenities;
}
function setHostAddress(c) {
    hostAddress = c;
}
function getHostAddress() {
    return hostAddress;
}
function setHostCity(c) {
    hostCity = c;
}
function getHostCity() {
    return hostCity;
}
function setHostState(c) {
    hostState = c;
}
function getHostState() {
    return hostState;
}
function setHostZipCode(c) {
    hostZipCode = c;
}
function getHostZipCode () {
    return hostZipCode ;
}
function setHostCountry(c) {
    hostCountry = c;
}
function getHostCountry() {
    return hostCountry;
}
function setHostPrice(c) {
    hostPrice = c;
}
function getHostPrice() {
    return hostPrice;
}
function setHostBiddingType(c) {
    hostBiddingType = c;
}
function getHostBiddingType() {
    return hostBiddingType;
}
function setHostImages(c) {
    hostImages = c;
}
function getHostImages() {
    return hostImages;
}
function setHostLat(c) {
    hostLat = c;
}
function getHostLat() {
    return hostLat;
}
function setHostLng(c) {
    hostLng = c;
}
function getHostLng() {
    return hostLng;
}
module.exports = {
    setHostCategory: setHostCategory,
    getHostCategory: getHostCategory,
    setHostBeds: setHostBeds,
    getHostBeds: getHostBeds,
    setHostAccommodates: setHostAccommodates,
    getHostAccommodates: getHostAccommodates,
    setHostBathrooms: setHostBathrooms,
    getHostBathrooms: getHostBathrooms,
    setHostAmenities: setHostAmenities,
    getHostAmenities: getHostAmenities,
    setHostAddress : setHostAddress,
    getHostAddress: getHostAddress,
    setHostState: setHostState,
    getHostState: getHostState,
    setHostCity: setHostCity,
    getHostCity: getHostCity,
    setHostCountry: setHostCountry,
    getHostCountry: getHostCountry,
    setHostZipCode: setHostZipCode,
    getHostZipCode: getHostZipCode,
    setHostPrice: setHostPrice,
    getHostPrice: getHostPrice,
    setHostBiddingType: setHostBiddingType,
    getHostBiddingType: getHostBiddingType,
    getHostImages: getHostImages,
    setHostImages: setHostImages,
    getHostLat: getHostLat,
    setHostLat: setHostLat,
    getHostLng: getHostLng,
    setHostLng: setHostLng
};