angular.module('myApp').controller('EANController', [ '$scope', function ( $scope ) {

    $scope.lookUpBarcode = function () {
        console.log($scope.EANNumber);
    }


} ]).config([ 'VKI_CONFIG', function ( VKI_CONFIG ) {
    VKI_CONFIG.layout.Numerico = {
        'name': "Numerico", 'keys': [
            [ [ "1", '1' ], [ "2", "2" ], [ "3", "3" ], [ "Bksp", "Bksp" ] ],
            [ [ "4", "4" ], [ "5", "5" ], [ "6", '6' ], [ "Enter", "Enter" ] ],
            [ [ "7", "7" ], [ "8", "8" ], [ "9", "9" ], [] ],
            [ [ "0", "0" ], [ "-" ], [ "+" ], [ "," ] ]
        ], 'lang': [ "pt-BR-num" ]
    };
} ]);