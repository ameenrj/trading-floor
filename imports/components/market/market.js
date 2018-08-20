import angular from 'angular';
import angularMeteor from 'angular-meteor';
import shareholdings from '../shareholdings/shareholdings';
import stocksList from '../stocks/stocks-list';
import template from './market.html';

class MarketCtrl {
    constructor($scope) {
        this.setStocks($scope);

        $scope.$on("buy", function(event, name, price, units) {
            $scope.$broadcast("buyAsset", name, price, units);
        });
    }

    setStocks($scope) {
        Meteor.call('stocks.get', (error, result) => {
            $scope.stocks = result;
            $scope.$apply();
        });
    }
}

export default angular.module('market', [
    angularMeteor,
    shareholdings.name,
    stocksList.name
])
    .component('market', {
        templateUrl: 'imports/components/market/market.html',
        controller: ['$scope', MarketCtrl]
    });