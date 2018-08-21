import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './shareholdings.html';

class ShareholdingsCtrl {
    constructor($scope) {
        $scope.viewModel(this);
        $scope.assets = [];
        this.balance = 0;
        const self = this;

        $scope.updateFromStorage = function() {
            const portfolio  = angular.fromJson(window.localStorage['portfolio']);
            if (portfolio) {
                $scope.assets = portfolio.assets;
                self.balance = portfolio.balance;
            }
        };

        $scope.updateFromStorage();

        $scope.$on("buyAsset", function(event, name, price, units) {
            if ((price * units) <= self.balance) {
                const asset = $scope.findAsset(name);
                if (asset) {
                    asset.units += units;
                } else {
                    $scope.assets.push({name: name, price: price, units: units});
                }
                self.balance -= price * units;
            }
            $scope.save();
        });

        $scope.sellAsset = function() {
            const asset = $scope.findAsset($scope.name);
            if (asset && asset.units >= $scope.units) {
                asset.units -= $scope.units;
                self.balance += $scope.findPrice($scope.name) * $scope.units;
                if (asset.units === 0) {
                    $scope.assets.splice($scope.findAssetIndex($scope.name), 1);
                }
            }
            $scope.save();
        };

        $scope.totalAssetValue = function() {
            let sum = 0;
            for (const index in $scope.assets) {
                if ($scope.assets.hasOwnProperty(index)) {
                    sum += $scope.assets[index].price * $scope.assets[index].units;
                }
            }
            return sum;
        };

        $scope.findAsset = function(name) {
            return $scope.assets[$scope.assets.findIndex(asset => asset.name === name)];
        };

        $scope.findAssetIndex = function(name) {
            return $scope.assets.findIndex(asset => asset.name === name);
        };

        $scope.findPrice = function(ticker) {
            return $scope.findAsset(ticker).price;
        };

        $scope.save = function() {
            window.localStorage['portfolio'] = JSON.stringify({assets: $scope.assets, balance: self.balance});
        };

    }

    depositFunds(amount) {
        this.balance += amount;
        this.depositAmount = "";
    }

    withdrawFunds(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            this.withdrawAmount = "";
        }
    }
}

export default angular.module('shareholdings', [
    angularMeteor
])
    .component('shareholdings', {
        templateUrl: 'imports/components/shareholdings/shareholdings.html',
        controller: ['$scope', ShareholdingsCtrl]
    });