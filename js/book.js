var book;

function DealPicker(d, ga, url) {
    'use strict';

    var fullpage = {
            anchors: ['splash', 'deals', 'places', 'daypicker', 'book']
        },
        filters = d.forms.filter.elements;

    function initFilter() {
        var day = new Date();
        var control = d.getElementById('depart');
        control.setAttribute('min', day.toISOString().split('T')[0]);
        day.setDate(day.getDate() + 1);
        control.value = day.toISOString().split('T')[0];
        day.setDate(day.getDate() + 3);
        control.setAttribute('max', day.toISOString().split('T')[0]);
    }

    function initMap() {
        var init = new google.maps.LatLng(52, -3);
        var york = new google.maps.LatLng(53.9623, -1.0819);
        var london = new google.maps.LatLng(51.5072, -0.1275);
        var duncraig = new google.maps.LatLng(57.3371, -5.6369);
        var chester = new google.maps.LatLng(53.190, -2.891);
        var sugarloaf = new google.maps.LatLng(51.8645, -3.0575);
        var brighton = new google.maps.LatLng(50.842, -0.131);

        var mapOptions = {
            zoom: 7,
            center: init,
            zoomControl: false,
            scaleControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true
        };

        var map = new google.maps.Map(d.getElementById('map-canvas'), mapOptions);

        var first = new google.maps.Marker({
            position: york,
            map: map,
            title: 'From York'
        });

        var second = new google.maps.Marker({
            position: london,
            map: map,
            title: 'London £49'
        });

        var third = new google.maps.Marker({
            position: duncraig,
            map: map,
            title: 'Duncraig £45'
        });

        var forth = new google.maps.Marker({
            position: chester,
            map: map,
            title: 'Chester £39'
        });

        var fifth = new google.maps.Marker({
            position: sugarloaf,
            map: map,
            title: 'Sugar Loaf £35'
        });

        var sixth = new google.maps.Marker({
            position: brighton,
            map: map,
            title: 'Brighton £69'
        });
    }

    initFilter();
    initMap();


    ga('send', 'event', 'Book', 'loaded', '', 0);
    return {
        stop: stop,
        fbShare: fbShare
    };
}

book = new DealPicker(document, ga, 'http://www.spontraineous.co.uk/');
