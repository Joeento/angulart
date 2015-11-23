'use strict';

angular.module('angulartApp')
  .controller('StringArtCtrl', function ($scope, $http) {
	var Point = function (x, y) {
		this.x = x;
		this.y = y;
	};
	var Line = function (startPoint, endPoint) {
		this.startPoint = startPoint;
		this.endPoint = endPoint;
	};

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	var width = canvas.width;
	var height = canvas.height;



	function draw() {
		for (var i = 0;i < $scope.lines.length;i++) {
			ctx.beginPath();
			ctx.arc($scope.lines[i].startPoint.x, $scope.lines[i].startPoint.y, 5, 0, 3 * Math.PI, false);
			ctx.fillStyle = '#ccddff';
			ctx.fill();
			ctx.lineWidth = 1;
			ctx.strokeStyle = '#666666';
			ctx.stroke();

			ctx.beginPath();
			ctx.arc($scope.lines[i].endPoint.x, $scope.lines[i].endPoint.y, 5, 0, 3 * Math.PI, false);
			ctx.fillStyle = '#ccddff';
			ctx.fill();
			ctx.lineWidth = 1;
			ctx.strokeStyle = '#666666';
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo($scope.lines[i].startPoint.x, $scope.lines[i].startPoint.y);
			ctx.lineTo($scope.lines[i].endPoint.x, $scope.lines[i].endPoint.y);
			ctx.stroke();
		}
	}
	$scope.midpoint = 5;
	$scope.sliderOptions = {
	    floor: 1,
	    ceil: 20,
	};

	$scope.lines = [];
	var aStartPoint = new Point(Math.floor((Math.random()*width)), Math.floor((Math.random()*height)));
	var bStartPoint = new Point(Math.floor((Math.random()*width)), Math.floor((Math.random()*height)));
	var meetingPoint = new Point(Math.floor((Math.random()*width)), Math.floor((Math.random()*height)));
	$scope.lines.push(new Line(aStartPoint, meetingPoint));
	$scope.lines.push(new Line(bStartPoint, meetingPoint));

	draw();

  });