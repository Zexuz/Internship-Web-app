var app = angular.module('myApp');


app.controller('statsController', [ '$scope', 'StatsFactory', 'ToastFactory', function ( $scope, stats, Toast ) {


    $scope.getAllInfo = function () {
        console.log("fetching....");
        stats.getAllInfo(null, function ( err, data ) {
            if ( err ) return Toast.showError(err);

            $scope.data = data;
        });
    };

    $scope.getAllInfo();

} ]);