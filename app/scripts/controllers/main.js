'use strict';

angular.module('CollaborativeMap')
  .controller('MainCtrl', ['$scope', '$routeParams', 'SynchronizeMap', 'Utils',
    function($scope, $routeParams, SynchronizeMap, Utils) {

      function initLeafletDraw() {
        // Initialise the FeatureGroup to store editable layers
        var drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);

        // Initialise the draw control and pass it the FeatureGroup of editable layers
        var drawControl = new L.Control.Draw({
          edit: {
            featureGroup: drawnItems
          },
          draw: {
            circle: false
          }
        });
        map.addControl(drawControl);

        map.on('draw:created', function(e) {
          drawnItems.addLayer(e.layer);
        });

        return drawnItems;
      }



      //TODO: random map id generator
      $scope.mapId = $routeParams.mapid;

      //patch L.stamp to get unique layer ids
      Utils.patchLStamp();

      //expose map for debugging purposes
      //var map = window._map = L.mapbox.map('map', 'dnns.h8dkb1bh');
      var map = window._map = L.mapbox.map('map').setView([51.95, 7.62], 13);

      // add an OpenStreetMap tile layer
      L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
      }).addTo(map);

      var drawnItems = initLeafletDraw();


      SynchronizeMap.enableMovementSynchronization(map, $scope.mapId);
      SynchronizeMap.enableDrawSynchronization(map, $scope.mapId, drawnItems);



    }
  ]);
