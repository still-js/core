'use strict';
$(function () {
	initWordMapBubble();
});


function initWordMapBubble(){

    var bubble_map = new Datamap( {
        scope: "world", 
        element: document.getElementById("world-map-bubble"), 
        responsive: !0, 
        geographyConfig: {
            popupOnHover: !1, 
            highlightOnHover: !1, 
            borderColor: "transparent", 
            borderWidth: 1, 
            highlightBorderWidth: 3, 
            highlightFillColor: "rgba(216,216,222,0.5)", 
            highlightBorderColor: "transparent", 
            borderWidth: 1
        }, 
        fills: {
            defaultFill: "#E9EAEB",
            blue: "#00A2FF", 
            green: "#08ea6c", 
            orange: "#FF9800", 
            cyan: "#07eaec"
        },
         bubblesConfig: {
            popupTemplate: function (geo, data) {
                 return '<div class="datamap-hoverinfo">' + data.hosname + ' Hospital in ' + data.country
            }, 
            borderWidth: 1, 
            highlightBorderWidth: 3, 
            highlightFillColor: "rgba(0,123,255,0.5)", 
            highlightBorderColor: "transparent", 
            fillOpacity: .75
        }, 
    });
    
    bubble_map.bubbles([
    {
        centered: "USA", 
        fillKey: "green", 
        radius: 5, 
        hosname: "HCG", 
        country: "United States"
    }, 
    {
        centered: "SAU", 
        fillKey: "orange", 
        radius: 5, 
        hosname: "Sanidhya", 
        country: "Saudia Arabia"
    }, 
    {
        centered: "RUS", 
        fillKey: "blue", 
        radius: 5, 
        hosname: "Red Heart", 
        country: "Russia"
    }, 
    {
        centered: "CAN", 
        fillKey: "orange", 
        radius: 5, 
        hosname: "Apolo", 
        country: "Canada"
    }, 
    {
        centered: "IND", 
        fillKey: "cyan", 
        radius: 5, 
        hosname: "Sanjivani", 
        country: "India"
    }, 
    {
        centered: "AUS", 
        fillKey: "green", 
        radius: 5, 
        hosname: "Sigma", 
        country: "Australia"
    },
    {
        centered: "FRA", 
        fillKey: "blue", 
        radius: 5, 
        hosname: "Royal", 
        country: "France"
    }, 
    {
        centered: "BRA", 
        fillKey: "orange", 
        radius: 5, 
        hosname: "Joy", 
        country: "Brazil"
    }
    ]),
    window.addEventListener("resize", function (e) {
        bubble_map.resize()
    });
}

