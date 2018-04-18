$(document).ready(function(){

   let osmLayer = new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible: true
    });

    let vectorLayer;

    let map = new ol.Map({
        target: 'mapPlaceholder',
        layers: [
            osmLayer
        ],
        view: new ol.View({
            //Somewhere in Germany
            center: ol.proj.fromLonLat([8.66, 48.88]),
            zoom: 5
        })
    });

    let pointStyle = new ol.style.Style({
        image: new ol.style.Circle({
            radius: 5,
            fill: null,
            stroke: new ol.style.Stroke({color: 'red', width: 1})
        })
    });
    let styleFunction = function(feature) {
        return pointStyle;
    };

    //TODO: add code here

});
