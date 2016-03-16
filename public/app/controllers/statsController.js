var app = angular.module('myApp');


app.controller('statsController', [ '$scope', 'StatsFactory', 'ToastFactory', function ( $scope, stats, Toast ) {


    $scope.getAllInfo = function () {
        console.log("fetching....");
        stats.getAllInfo(null, function ( err, data ) {
            if ( err ) return Toast.showError(err);


            $scope.barLabels = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];
            $scope.barSeries = [ 'Total Sales' ];

            $scope.barData = [
                [
                    data.totalSold * randomNumber(0.1, 1.9),
                    data.totalSold * randomNumber(0.1, 1.9),
                    data.totalSold * randomNumber(0.1, 1.9),
                    data.totalSold * randomNumber(0.1, 1.9),
                    data.totalSold * randomNumber(0.1, 1.9)
                ]
            ];


            $scope.doughnutLabels = [ data.salesPersons[ 0 ].name, data.salesPersons[ 1 ].name ];
            $scope.doughnutData = [ data.salesPersons[ 0 ].totalSold, data.salesPersons[ 1 ].totalSold ]


        });
    };

    $scope.getAllInfo();

} ]);

function randomNumber( max, min ) {
    return (Math.random() * (max - min) + min)
}