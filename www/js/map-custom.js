(function ($) {
    // USE STRICT
    "use strict";

        $(document).ready(function () {

            var selector_map = $('#google_map');
            var img_pin = selector_map.attr('data-pin');
            var data_map_x = selector_map.attr('data-map-x');
            var data_map_y = selector_map.attr('data-map-y');
            var scrollwhell = selector_map.attr('data-scrollwhell');
            var draggable = selector_map.attr('data-draggable');
            var map_zoom = selector_map.attr('data-zoom');

            if (img_pin === null) {
                img_pin = 'images/icons/location.png';
            }
            if (data_map_x === null || data_map_y === null) {
                data_map_x = 52.40656;
                data_map_y = -1.51217;
            }
            if (scrollwhell === null) {
                scrollwhell = 0;
            }

            if (draggable === null) {
                draggable = 0;
            }

            if (map_zoom === null) {
                map_zoom = 5;
            }

            var style = [];

            var latitude = data_map_x,
                longitude = data_map_y;

            var locations = [
                ['<div class="infobox"><h4>Hello</h4><p>Now that you visited our website, how' +
                ' <br>about checking out our office too?</p></div>'
                    , latitude, longitude, 2]
            ];

            if (selector_map !== undefined) {
                var map = new google.maps.Map(document.getElementById('google_map'), {
                    zoom: Number(map_zoom),
                    zoomControl: false,  
                    disableDoubleClickZoom: true,
                    scrollwheel: scrollwhell,
                    navigationControl: true,
                    mapTypeControl: false,
                    scaleControl: false,
                    draggable: draggable,
                    styles: style,
                    center: new google.maps.LatLng(latitude, longitude),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
            }

            var infowindow = new google.maps.InfoWindow();

            var marker, i;

            for (i = 0; i < locations.length; i++) {

                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                    map: map,
                    icon: img_pin
                });

                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        infowindow.setContent(locations[i][0]);
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }

        });

})(jQuery);

/*[ Map Navigation ]
===========================================================*/
var targetLatitude = 52.43504;
var targetLongitude = -1.51820;
var userLatitude;
var userLongitude;

var storage;

function init(){
    document.addEventListener("deviceready", onDeviceReady, false);
    storage = window.localStorage;
}

function onDeviceReady(){
    if(cordova.platformId == 'ios'){
        //window.StatusBar.overlaysWebView(false);
        window.StatusBar.styleDefault();
    }else{
        window.StatusBar.backgroundColorByHexString('#1565C0');
    }
    document.getElementsByTagName('head')[0].appendChild(node);
}

function setCss(elm,prop,val){
    var node = document.getElementById(elm).style;
    node.setProperty(prop,val);
}

function getUserLocation(){
    navigator.geolocation.getCurrentPosition(getUserLocationSuccess, locationError, {enableHighAccuracy:true}); 
 }
 
 function getUserLocationSuccess(position){
     userLatitude = position.coords.latitude;
     userLongitude = position.coords.longitude;
     showDirections();
 }

 function locationError(error){
    navigator.notification.alert("Error Code: " + error.code + "\nError Message: " + error.message);
}

function showDirections(){
    var dRenderer = new google.maps.DirectionsRenderer;
    var dService = new google.maps.DirectionsService;
    var curLatLong = new google.maps.LatLng(userLatitude,userLongitude);
    var targetLatLong = new google.maps.LatLng(targetLatitude,targetLongitude);
    var map = new google.maps.Map(document.getElementById('google_map'));
    map.setZoom(16);
    map.setCenter(curLatLong);
    dRenderer.setMap(map);
    dService.route({
        origin: curLatLong,
        destination: targetLatLong,
        travelMode: 'DRIVING'
    }, function(response,status){
        if(status == 'OK'){
            dRenderer.setDirections(response);
            document.getElementById('directions').innerHTML = '';
            dRenderer.setPanel(document.getElementById('directions'));
        }else{
            navigator.notification.alert("Directions failed due to: " +status);
        }
    });
    setCss('google_map','visibility','visible');
    setCss('directions','visibility','visible');
}

/*[ Map Navigation ]
===========================================================*/