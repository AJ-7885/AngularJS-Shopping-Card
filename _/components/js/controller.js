/*! 
 Created on : Dec 28, 2016, 10:22:11 PM
 Author     : https://github.com/AJ-7885
 */

sfApp.controller("shoppingCardCtl", ['$scope', 'shoppingCardFactory', function ($scope, shoppingCardFactory) {

        shoppingCardFactory.getAllProducts().then(function (respond) {
            // The ID need to be UUID from the backend, But I use integer 
            //$http.get( 'test-data/getMyProfileAccountLabels.json' )
            $scope.products = respond.data;

        });

        // define the checkout varibles 
        $scope.shoppingcard = {};
        $scope.scOneTimeCharge = 0;
        $scope.scMonthlyCharge = 0;
        $scope.scSubTotalCharge = 0;
        $scope.scShippingCharge = 0;
        $scope.scTotalCharge = 0;
        $scope.scVATCharge = 0;

        // add new item to the shopping chard
        $scope.addToCard = function (_productId) {
            angular.forEach($scope.products, function (_prpduct) {
                if (_prpduct.id == _productId) {
                    $scope.shoppingcard[_productId] = _prpduct;
                    if (angular.isDefined($scope.shoppingcard[_productId].qty)) {
                        $scope.shoppingcard[_productId].qty = $scope.shoppingcard[_productId].qty + 1;
                    } else {
                        $scope.shoppingcard[_productId].qty = 1;
                    }
                }
            });
            calculation();
        };

        // Remove item from shopping card
        $scope.removeFromCard = function (_productId) {
            angular.forEach($scope.shoppingcard, function (_prpduct) {
                if (_prpduct.id == _productId) {
                    delete $scope.shoppingcard[_prpduct.id];
                }
            });
            calculation();
        };

        // swtich the product package on mobile device
        $scope.displayPackage = function (_package) {
            if ('btnPackageRight' === _package) {
                console.log(_package);
                console.log($('#btnPackagkeLeft'));
                $('.btnPackageLeft').css("background-color", "#98bfe4");
                $('.btnPackageRight').css("background-color", "#2f82c4");
                $('.btnPackageRight').css("display", "block");
                $('.package-right').css("display", "block");
                $('.package-left').css("display", "none");
                $('#arrowLeft').css("display", "none");
                $('#arrowRight').css("display", "block");
            }
            if ('btnPackageLeft' === _package) {
                console.log(_package);
                $('.btnPackageRight').css("background-color", "#98bfe4");
                $('.btnPackageLeft').css("background-color", "#2f82c4");
                $('.btnPackageLeft').css("display", "block");
                $('.package-left').css("display", "block");
                $('.package-right').css("display", "none");
                $('#arrowLeft').css("display", "block");
                $('#arrowRight').css("display", "none");
            }
        };

        // Recalculate the shopping card on qty. change 
        $scope.onChangeQty = function () {
            calculation();
        };

        // remove from selected item in shopping card 
        $scope.removeOne = function (_product) {
            if (_product.qty > 0) {
                _product.qty--;
            }
            calculation();
        };

        // add one more selected item in shopping card 
        $scope.addOne = function (_product) {
            _product.qty++;
            calculation();
        };

        //calculation function for checkout
        function calculation() {
            $scope.scOneTimeCharge = 0;
            $scope.scMonthlyCharge = 0;
            $scope.scShippingCharge = 0;
            angular.forEach($scope.shoppingcard, function (_item) {
                if ('once' === _item.type) {
                    $scope.scOneTimeCharge = (_item.price * _item.qty) + $scope.scOneTimeCharge;
                }
                if ('monthly' === _item.type) {
                    $scope.scMonthlyCharge = (_item.price * _item.qty) + $scope.scMonthlyCharge;
                }
                $scope.scShippingCharge = (_item.shipping * _item.qty) + $scope.scShippingCharge;
            });
            $scope.scSubTotalCharge = $scope.scOneTimeCharge + $scope.scMonthlyCharge;
            $scope.scTotalCharge = $scope.scSubTotalCharge + $scope.scShippingCharge;
            $scope.scVATCharge = $scope.scTotalCharge * 0.20;
        }
    }]);
