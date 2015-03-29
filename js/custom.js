$(document).ready(function() {

    $('#fullpage').fullpage({
        anchors: ['form', 'choices', 'results', 'booking', 'journey', 'feedback'],
        sectionsColor: ['#8FB98B', '#DE564B', '#EAE1C0', '#8FB98B', '#DE564B', '#EAE1C0'],
        slidesNavigation: true,
    });

    //  Check Radio-box
    $(".rating input:radio").attr("checked", false);
    $('.rating input').click(function() {
        $(".rating span").removeClass('checked');
        $(this).parent().addClass('checked');
    });

    $('input:radio').change(
        function() {
            var userRating = this.value;
            sweetAlert("Thank you for your feedback");
        });

    function initialize() {
        var york = new google.maps.LatLng(53.962290800000000000, -1.081899499999963100);
        var london = new google.maps.LatLng(51.5072, 0.1275);
        var duncraig = new google.maps.LatLng(57.3371, -5.6369);
        var chester = new google.maps.LatLng(53.190, 2.891);
        var sugarloaf = new google.maps.LatLng(51.8645, -3.0575);
        var brighton = new google.maps.LatLng(50.842, 0.131);

        var mapOptions = {
            zoom: 6,
            center: york
        }
        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        var first = new google.maps.Marker({
            position: york,
            map: map,
            title: 'Hello World!'
        });

        var second = new google.maps.Marker({
            position: london,
            map: map,
            title: 'Hello World!'
        });

        var third = new google.maps.Marker({
            position: duncraig,
            map: map,
            title: 'Hello World!'
        });

        // var forth = new google.maps.Marker({
        //     position: chester,
        //     map: map,
        //     title: 'Hello World!'
        // });

        var fifth = new google.maps.Marker({
            position: sugarloaf,
            map: map,
            title: 'Hello World!'
        });

        var sixth = new google.maps.Marker({
            position: brighton,
            map: map,
            title: 'Hello World!'
        });

    }

    google.maps.event.addDomListener(window, 'load', initialize)
});
