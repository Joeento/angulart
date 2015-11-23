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
		this.midpoints = [];
	};
	Line.prototype.addMidpoints = function(count) {
		this.midpoints = [];
		for (var i = 1;i <= count; i++) {
			var t = i/(count + 1);
			var x = ((1 - t) * this.startPoint.x) + (t * this.endPoint.x);
			var y = ((1 - t) * this.startPoint.y) + (t * this.endPoint.y);
			this.midpoints.push(new Point(x, y));
		}
	};

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var width = canvas.width;
	var height = canvas.height;

	function draw() {
		ctx.clearRect(0, 0, width, height);
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

			for (var j = 0;j < $scope.lines[i].midpoints.length; j++) {
				ctx.rect($scope.lines[i].midpoints[j].x - 2,$scope.lines[i].midpoints[j].y - 2, 4, 4);
				ctx.fillStyle='#b3ccff';
				ctx.fill();
			}
		}

		var legPointsA = $scope.lines[0].midpoints.concat($scope.lines[0].endPoint);
		var legPointsB = $scope.lines[1].midpoints.concat($scope.lines[1].endPoint);
		for (var i = 0;i < legPointsA.length;i++) {
			ctx.beginPath();
			ctx.moveTo(legPointsA[i].x, legPointsA[i].y);
			ctx.lineTo(legPointsB[i].x, legPointsB[i].y);
			ctx.stroke();
		}
	}

	$scope.midpoint = 2;
	$scope.sliderOptions = {
	    floor: 1,
	    ceil: 100,
	    onChange: function() {
			for (var i = 0;i < $scope.lines.length;i++) {
				$scope.lines[i].addMidpoints($scope.midpoint);
			}
			draw();
	    }
	};
	

	$scope.lines = [];
	var aStartPoint = new Point(Math.floor((Math.random()*width)), Math.floor((Math.random()*height)));
	var bStartPoint = new Point(Math.floor((Math.random()*width)), Math.floor((Math.random()*height)));
	var meetingPoint = new Point(Math.floor((Math.random()*width)), Math.floor((Math.random()*height)));
	$scope.lines.push(new Line(aStartPoint, meetingPoint));
	$scope.lines.push(new Line(meetingPoint, bStartPoint));

	draw();

  });