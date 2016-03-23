var app = angular.module('myApp');


app.controller('statsController', [ '$scope', 'StatsFactory', 'ToastFactory', 'UserFactory', function ( $scope, stats, Toast, user ) {


    $scope.getAllInfo = function () {
        console.log("fetching....");
        stats.getAllInfo(user.getUserInfo().id, function ( err, data ) {
            if ( err ) return Toast.showError(err);


            $scope.numberOfItemsSold = getNumberOfItemsSold(data);
            $scope.numberOfCompleteSales = data.length;


            $scope.barLabels = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];
            $scope.barSeries = [ 'Total Sales' ];

            $scope.barData = [
                [
                    getTotalSumForDay(data) * randomNumber(0.1, 1.9),
                    getTotalSumForDay(data) * randomNumber(0.1, 1.9),
                    getTotalSumForDay(data) * randomNumber(0.1, 1.9),
                    getTotalSumForDay(data) * randomNumber(0.1, 1.9),
                    getTotalSumForDay(data) * randomNumber(0.1, 1.9)
                ]
            ];


            $scope.doughnutLabels = [ data[ 0 ].owner, data[ 1 ].owner ];
            $scope.doughnutData = [ data[ 0 ]._items.length, data[ 1 ]._items.length ];


            $scope.doughnutLabels1 = [ data[ 0 ].owner, data[ 1 ].owner ];
            $scope.doughnutData1 = [getItemsTotalPriceForSale(data[ 0 ]),getItemsTotalPriceForSale(data[ 1 ])];


        });
    };

    $scope.getAllInfo();

} ]);

function getTotalSumForDay( data ) {
    var totalSumForDay = 0;

    for ( var i = 0; i < data.length; i++ ) {
        var sale = data[ i ];
        totalSumForDay = getItemsTotalPriceForSale(sale);
    }

    return totalSumForDay;

}

function getItemsTotalPriceForSale( sale ) {

    var totalSum = 0;
    var items = sale._items;

    for ( var j = 0; j < items.length; j++ ) {
        var item = items[ j ];
        totalSum += Number(item.totalPrice);
    }

    return totalSum
}


function getNumberOfItemsSold( data ) {

    var items = 0;
    for ( var i = 0; i < data.length; i++ ) {
        var sales = data[ i ];
        items += sales._items.length;
    }

    return items;

}

function randomNumber( max, min ) {
    return (Math.random() * (max - min) + min)
}