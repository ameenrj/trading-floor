import angular from 'angular';
import angularMeteor from 'angular-meteor';
import market from '../imports/components/market/market';

angular.module('trading-floor', [
    angularMeteor,
    market.name
]);