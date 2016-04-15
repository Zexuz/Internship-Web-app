var app = angular.module('myApp');


app.controller('statsController', [ '$scope', 'StatsFactory', 'ToastFactory', 'UserFactory', function ( $scope, stats, Toast, user ) {

    var strNotLoggedIn = "Du är inte inloggad, var snäll logga in";
    if (user.getUserInfo() === null)return Toast.showError(strNotLoggedIn);

    $scope.getAllInfo = function () {
        stats.getAllInfo(user.getUserInfo().id, function ( err, data ) {
            if ( err ) return Toast.showError(err);

            var stats = new Stats();

            stats.apiData = data;


            $scope.numberOfItemsSold = getNumberOfItemsSold(data);
            $scope.numberOfCompleteSales = data.length;


            $scope.barLabels = [ 'Måndag','Tisdag','Onsdag','Torsdag','Fredag','Lördag','Söndag' ];
            $scope.barSeries = [ 'Total Sales' ];

            $scope.barData = [
                [
                    stats.getTotalSoldToday() * randomNumber(0.1, 1.9),
                    stats.getTotalSoldToday() * randomNumber(0.1, 1.9),
                    stats.getTotalSoldToday() * randomNumber(0.1, 1.9),
                    stats.getTotalSoldToday() * randomNumber(0.1, 1.9),
                    stats.getTotalSoldToday() * randomNumber(0.1, 1.9)
                ]
            ];
            var cashier = stats.getCashiers();


            var doLable = [];
            var doData = [];

            var doLable1 = [];
            var doData1 = [];

            for ( let i = 0; i < cashier.length; i++ ) {
                let sale = cashier[ i ];

                doLable.push(sale.owner.name);
                doData.push(getNumberOfItemsInSale(sale));
                console.log(sale);

                doLable1.push(sale.owner.name);
                doData1.push(getItemsTotalPriceForSale(sale));
            }


            $scope.doughnutLabels = doLable;
            $scope.doughnutData = doData;

            $scope.doughnutLabels1 = doLable1;
            $scope.doughnutData1 = doData1;


        });
    };

    $scope.getAllInfo();

} ]);


function getItemsTotalPriceForSale( sale ) {

    var totalSum = 0;
    var items = sale._items;

    for ( var j = 0; j < items.length; j++ ) {
        var item = items[ j ];
        totalSum += Number(item.salePrice) * item.quant;
    }

    return Math.floor(totalSum);
}

function getNumberOfItemsInSale( sale ) {

    var totalSum = 0;
    var items = sale._items;

    for ( var j = 0; j < items.length; j++ ) {
        var item = items[ j ];
        totalSum += item.quant;
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