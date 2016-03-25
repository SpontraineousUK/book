var book,
    deals = [];

function Router(d, sec) {
    'use strict';

    var fullpage = {
            anchors: ['splash', 'deals', 'places', 'detail', 'newsletter']
        };

    function close(section) {
        d.getElementById(section).className = sec + ' closed';
    }
    function open(section) {
        var page = d.getElementById(section);
        if (page)
            page.className = sec;
        return page;
    }
    function page(section) {
        if (!open(section))
            return null;
        fullpage.anchors.forEach(close);
        return open(section);
    }
    function go(section) {
        if (page(section))
            window.location = '#' + section;
    }
    function processHash() {
        var hash = location.hash || '#';
        if (!page(hash.slice(1)))
            page('splash');
    }

    window.addEventListener('hashchange', processHash);

    return {
        go : go,
        open : open
    };
}

function DealPicker(d, ga, r, destinations) {
    'use strict';

    var filter = {};

    function loadDestinations() {
        var destinationsDB = new Firebase('https://spontraineous.firebaseio.com/places');
        destinationsDB.once('value', function(snapshot) {
          if (snapshot.val() === null) {
            alert("Can't find any destinations. Please try later.");
          } else {
            destinations = [];
            snapshot.forEach(function(destination) {
                destinations.push(destination.val());
                console.log(destination.val());
            });
            initPlaces(destinations);
          }
        });
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

        r.open('deals');
    }

    function initPlaces(destinations) {
        console.log('initPlaces with ' + destinations);
        console.log(destinations);
        var template = d.getElementById('place-template').firstChild.textContent;
        var context = {
            destinations: destinations,
        };
        d.getElementById('places-gallery').innerHTML = Mark.up(template, context);
        r.open('places');
    }

    function initFilter() {
        var day = new Date(),
            control = d.getElementById('day'),
            format = {
                weekday: 'long', day: 'numeric', month: 'short'
            },
            js;
        for (var i = 7; i--; ) {
            day.setDate(day.getDate() + 1);
            js = d.createElement('option');
            js.value = day.getDay();
            js.innerHTML = day.toLocaleString('en-GB', format);
            control.appendChild(js);
        }
    }

    function findTrips() {
        var from = d.getElementById('from').value;
        //var day = d.getElementById('day').value;
        //var adult = d.getElementById('adult').value;
        //var child = d.getElementById('child').value;
        var prefer = d.getElementById('prefer').value;
        console.log('Search for trips from ' + from);
        ga('send', 'event', 'Preference', 'from', from);
        //ga('send', 'event', 'Preference', 'day', day);
        //ga('send', 'event', 'Preference', 'adult', adult);
        //ga('send', 'event', 'Preference', 'child', child);
        ga('send', 'event', 'Preference', 'prefer', prefer);
        // ToDo: specific search when we've more than one 'from' origin available
        r.go('places');
        return false;
    }
    function details(dealID) {
        // to do
        console.log(dealID);
        console.log(destinations[dealID]);
    }

    function checkout(dealID) {
        // to do
        console.log(dealID);
        console.log(destinations[dealID]);
        r.go('newsletter');
    }

//    initFilter();
//    initMap();
    loadDestinations();

    ga('send', 'event', 'Book', 'loaded', '', 0);
    return {
        findTrips : findTrips,
        checkout : checkout,
        details : details
    };
}

book = new DealPicker(document, ga, new Router(document, 'section'), deals);
