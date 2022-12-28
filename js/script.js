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
            center: ol.proj.fromLonLat([90.4544673,23.7953622]),
            zoom: 12
        })
    });

    // let pointStyle = new ol.style.Style({
    //     image: new ol.style.Circle({
    //         radius: 5,
    //         fill: null,
    //         stroke: new ol.style.Stroke({color: 'red', width: 1})
    //     })
    // });

    let pointStyle = new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [1, 1],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            src:  "pointer_red.png",
            scale: 0.35,
            opacity: 1
        })
    });

    let styleFunction = function(feature) {
        return pointStyle;
    };


    let vectorSource = new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: './json/land_projects.geojson'
    });
    vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: styleFunction
    });
    map.addLayer(vectorLayer);

    map.on('click', function(event) {
        map.forEachFeatureAtPixel(event.pixel, function(feature, layer) {
            if($('#description li[id="'+feature.get('id')+'"]').length === 0) {
                $('#description').append(`
                    <li id="${feature.get('id')}">
                        <h5>${feature.get('name')}</h5>
                        <p class="mb-0">${feature.get('distance_km')} km from ${feature.get('distance_from')}</p>
                        <p class="mb-0">${feature.get('low_price')} - ${feature.get('high_price')}</p>
                        <p class="mb-0">${feature.get('address')}</p>
                        <p class="mb-0">${feature.get('phone')}</p>
                        <p><a href="${feature.get('web')}">${feature.get('web')}</a></p>
                    </li>
                `);
            }
        });
    });

    map.on('click', function(event) {
        console.log(ol.proj.toLonLat(event.coordinate))
    });
});
