var app = angular.module('myApp');


app.controller('statsController', [ '$scope', 'StatsFactory', 'ToastFactory', function ( $scope, stats, Toast ) {


    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };

    $scope.getAllInfo = function () {
        console.log("fetching....");
        stats.getAllInfo(null, function ( err, data ) {
            if ( err ) return Toast.showError(err);

            $scope.data = data;
        });
    };

    $scope.getAllInfo();

} ]);