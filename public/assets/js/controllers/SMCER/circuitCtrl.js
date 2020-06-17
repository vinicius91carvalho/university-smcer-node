'use strict';

app.controller('CircuitListCtrl', ["$scope", "$state", "$filter", "ngTableParams", "SweetAlert", "Circuit", 
    function($scope, $state, $filter, ngTableParams, SweetAlert, Circuit){

    $scope.filtro = '';
    
    $scope.init = function() {
        searchCircuits();
    };
    
    $scope.init();

    function searchCircuits() {       
        $scope.circuits = Circuit.query(
            function (circuits){
                $scope.tableParams = createTable($scope.circuits);
            }
        );
    };

    function createTable(data) {
        return new ngTableParams({
            page: 1, 
            count: 10 
        }, {
            total: data.length, 
            getData: function ($defer, params) {
                var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });
    };    

    $scope.deleteCircuit = function(circuit){
        circuit.$delete({ id: circuit.id }, 
            function(){
                SweetAlert.swal("Sucesso", "Circuito excluido com sucesso", "success");
            }
        );
    };

}]);
app.controller('CircuitCreateCtrl', ["$scope", "$state", "$stateParams", "Circuit", "SweetAlert", 
    function($scope, $state, $stateParams, Circuit, SweetAlert){

    $scope.init = function(){
        $scope.circuit = new Circuit();
    }

    $scope.init();     

    $scope.addCircuit = function(){
        $scope.circuit.$save(
            function (circuit){
                $state.go('app.manager.circuits');
            }, function (erro){
                console.log(erro);
                SweetAlert.swal("Ocorreu um erro", erro.data, "error");
            });
    }

}]);
app.controller('CircuitEditCtrl', ["$scope", "$state", "$stateParams", "Circuit", "SweetAlert",
    function($scope, $state, $stateParams, Circuit, SweetAlert){

    $scope.init = function(){
        $scope.circuit = Circuit.get( { id: $stateParams.id } );
        
    }

    $scope.init();

    $scope.updateCircuit = function() {
        $scope.circuit.$update({id: $scope.circuit.id},
            function (circuit){
                $state.go('app.manager.circuits');
        }, function (erro){
                console.log(erro);
                SweetAlert.swal("Dados incorretos", "Verifique os dados digitados", "error");
        });        
    };

}]);