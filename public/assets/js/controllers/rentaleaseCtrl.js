/*global angular */
'use strict';

var rentaleaseApp = angular.module('rentaleaseApp', []);

rentaleaseApp.controller('rentaleaseCtrl', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {

	var refresh = function () {
		$http.get('/rentalease').then(function (response) {
			$scope.rentalease = response.data;
			$scope.item = {};
		});
	};

	refresh();

	$scope.addItem = function () {
		console.log($scope.item);
		$http.post('/rentalease', $scope.item).then(function (response) {
			refresh();
		});
	};

	$scope.deleteItem = function (id) {
		console.log(id);
		$http.delete('/rentalease/' + id).then(function (response) {
			refresh();
		});
	};

	$scope.editItem = function (id) {
		console.log(id);
		$http.get('/rentalease/' + id).then(function (response) {
			$scope.item = response.data;
		});
	};

	$scope.updateItem = function () {
		console.log($scope.item);
		$http.patch('/rentalease/' + $scope.item._id, $scope.item).then(function (response) {
			refresh();
		});
	};
	$scope.terminateLease = function (id) {
		console.log(id);
		$http.put('/rentalease/' + $scope.item._id, $scope.item).then(function (response) {
			refresh();
		});
	};

}]);