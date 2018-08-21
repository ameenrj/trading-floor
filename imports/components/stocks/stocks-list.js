import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './stocks-list.html';

class StocksListCtrl {
    constructor($scope) {
        $scope.buy = function() {
            const ticker = $scope.ticker.toUpperCase();
            if ($scope.isLegitimateStock(ticker)) {
                $scope.$emit("buy", ticker, this.findPrice(ticker), $scope.units);
            }
        };

        $scope.cost = function() {
            if ($scope.isLegitimateStock($scope.ticker) && $scope.units) {
                return $scope.findPrice($scope.ticker) * $scope.units;
            } else {
                return 0;
            }
        };

        $scope.isLegitimateStock = function(name) {
            if ($scope.$parent.stocks) {
                return $scope.$parent.stocks.findIndex(stock => stock["1. symbol"] === name) > -1;
            }
        };

        $scope.findPrice = function(ticker) {
            return $scope.$parent.stocks.filter(stock => stock["1. symbol"] === ticker)[0]["2. price"];
        };
    }
}

export default angular.module('stocksList', [
    angularMeteor
])
    .component('stocksList', {
        templateUrl: 'imports/components/stocks/stocks-list.html',
        controller: ['$scope', StocksListCtrl]
    });