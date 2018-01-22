$(document).ready(function(){

   let osmLayer = new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible: true
    });
    let bingLayer = new ol.layer.Tile({
        visible: true,
        preload: Infinity,
        source: new ol.source.BingMaps({
            key: 'AsJ83NnvqsJdSmURSKt3ySErannO79P9g0V-AeoA1Ojc8dc60ogLqMtb1FL2DQrG',
            imagerySet: 'Road'
        })
    });
    let vectorLayer;

    let map = new ol.Map({
        target: 'mapPlaceholder',
        layers: [
            osmLayer,
            bingLayer
        ],
        view: new ol.View({
            //Somewhere in Germany
            center: ol.proj.fromLonLat([8.66, 48.88]),
            zoom: 5
        })
    });

    let image = new ol.style.Circle({
        radius: 5,
        fill: null,
        stroke: new ol.style.Stroke({color: 'red', width: 1})
    });
    let pointStyle = new ol.style.Style({
        image: image
    });
    let vectorSource = new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: 'http://localhost:8000/json/german_airports.geojson'
    });
    let styleFunction = function(feature) {
        return pointStyle;
    };
    vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: styleFunction
    });
    map.addLayer(vectorLayer);

    
    //TODO: add code here

});