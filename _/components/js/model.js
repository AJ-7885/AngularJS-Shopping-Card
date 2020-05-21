
/*! 
 Created on : Dec 28, 2016, 11:40:50 PM
 Author     : https://github.com/AJ-7885
 */
sfApp.factory('shoppingCardFactory', ['$http', function ($http) {
        var sdo = {
            getAllProducts: function () {
                var promise = $http({
                    url: '_/js/store.json',
                    method: "GET"
                });
                promise.success(function (data, status, headers, conf) {
                    return data;
                });
                return promise;
            }
        }
        return sdo;
    }]);

