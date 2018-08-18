import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './stocksList.html';

class StocksListCtrl {
    constructor() {
        this.stocks = [{
            name: 'GOOGL',
            price: 1215.85
        }, {
            name: 'AAPL',
            price: 217.58
        }, {
            name: 'MSFT',
            price: 107.58
        }];
    }
}

export default angular.module('stocksList', [
    angularMeteor
])
    .component('stocksList', {
        templateUrl: 'imports/components/stocks/stocksList.html',
        controller: StocksListCtrl
    });