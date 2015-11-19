'use strict';

angular.module('angulartApp')
  .controller('StringArtCtrl', function ($scope, $http) {
	var Point = function (x, y) {
		this.x = x;
		this.y = y;
	};

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	var width = canvas.width;
	var height = canvas.height;



	function draw() {
		for (var i = 0;i < $scope.points.length;i++) {
			ctx.beginPath();
			ctx.arc($scope.points[i].x, $scope.points[i].y, 5, 0, 3 * Math.PI, false);
			ctx.fillStyle = '#ccddff';
			ctx.fill();
			ctx.lineWidth = 1;
			ctx.strokeStyle = '#666666';
			ctx.stroke();
			if (i > 0) {
				ctx.beginPath();
				ctx.moveTo($scope.points[i-1].x, $scope.points[i-1].y);
				ctx.lineTo($scope.points[i].x, $scope.points[i].y);
				ctx.stroke();
			}
		}
	}
	$scope.midpoint = 5
	$scope.sliderOptions = {
	    floor: 1,
	    ceil: 20
	};
	$scope.points = [];
	for (var i = 0;i < 3; i++) {
		$scope.points.push(new Point(Math.floor((Math.random()*width)), Math.floor((Math.random()*height))));
	}
	draw();

  });