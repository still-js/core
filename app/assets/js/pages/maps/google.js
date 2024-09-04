'use strict';
$(function () {
    //Basic Map
    var basicMap = new GMaps({
        el: '#gmap_basic_example',
        lat: 23.0128440,
        lng: 72.5289980
    });

    //Markers
    var markers = new GMaps({
        div: '#gmap_markers',
        lat: 23.0196181,
        lng: 72.5287620
    });
    markers.addMarker({
        lat: 23.0196181,
        lng: 72.5287620,
        title: 'Lima',
        details: {
            database_id: 42,
            author: 'HPNeo'
        },
        click: function (e) {
            if (console.log)
                console.log(e);
            alert('You clicked in this marker');
        }
    });
    markers.addMarker({
        lat: 23.2599330,
        lng: 77.4126150,
        title: 'Marker with InfoWindow',
        infoWindow: {
            content: '<p>HTML Content</p>'
        }
    }), markers.setZoom(7);

    //Rectangle Event Map
    var rectangle;
    var map;
    var infoWindow;

    map = new google.maps.Map(document.getElementById('gmap_rectangle_map'), {
        center: { lat: 44.5452, lng: -78.5389 },
        zoom: 9
    });

    var bounds = {
        north: 44.599,
        south: 44.490,
        east: -78.443,
        west: -78.649
    };

    // Define the rectangle and set its editable property to true.
    rectangle = new google.maps.Rectangle({
        bounds: bounds,
        editable: true,
        draggable: true
    });

    rectangle.setMap(map);

    // Add an event listener on the rectangle.
    rectangle.addListener('bounds_changed', showNewRect);

    // Define an info window on the map.
    infoWindow = new google.maps.InfoWindow();
    // Show the new coordinates for the rectangle in an info window.

    /** @this {google.maps.Rectangle} */
    function showNewRect(event) {
        var ne = rectangle.getBounds().getNorthEast();
        var sw = rectangle.getBounds().getSouthWest();

        var contentString = '<b>Rectangle moved.</b><br>' +
            'New north-east corner: ' + ne.lat() + ', ' + ne.lng() + '<br>' +
            'New south-west corner: ' + sw.lat() + ', ' + sw.lng();

        // Set the info window's content and position.
        infoWindow.setContent(contentString);
        infoWindow.setPosition(ne);

        infoWindow.open(map);
    }

    //Static maps with markers
    var myLatLng = { lat: -25.363, lng: 131.044 };

    var map = new google.maps.Map(document.getElementById('gmap_static_map_with_markers'), {
        zoom: 4,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
    });



    //Trafic Layer Map
    var map = new google.maps.Map(document.getElementById('gmap_trafic_layer'), {
        zoom: 13,
        center: { lat: 34.04924594193164, lng: -118.24104309082031 }
    });

    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);


    //Panorama
    var panorama = GMaps.createPanorama({
        el: '#gmap_panorama',
        lat: 48.868943,
        lng: 2.335687
    });
});