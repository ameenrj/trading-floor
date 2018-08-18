import angular from 'angular';
import angularMeteor from 'angular-meteor';
import stocksList from '../imports/components/stocks/stocksList';

angular.module('trading-floor', [
    angularMeteor,
    stocksList.name
]);