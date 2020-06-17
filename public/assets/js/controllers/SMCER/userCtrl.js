'use strict';

app.controller('UserListCtrl', ["$scope", "$state", "$filter", "ngTableParams", "SweetAlert", "User", 
    function($scope, $state, $filter, ngTableParams, SweetAlert, User){

    $scope.filtro = '';
    
    $scope.init = function() {
        searchUsers();
    };
    
    $scope.init();

    function searchUsers() {       
        $scope.users = User.query(
            function (users){
                $scope.tableParams = createTable($scope.users);
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

    $scope.deleteUser = function(user){
        user.$delete({ id: user.id }, 
            function(){
                SweetAlert.swal("Sucesso", "Usuário excluido com sucesso", "success");
            }
        );
    };

}]);
app.controller('UserCreateCtrl', ["$scope", "$state", "$stateParams", "User", "SweetAlert", 
    function($scope, $state, $stateParams, User, SweetAlert){

    $scope.init = function(){
        $scope.user = new User();
    }

    $scope.init();     

    $scope.addUser = function(){
        $scope.user.$save(
            function (user){
                $state.go('app.manager.users');
            }, function (erro){
                console.log(erro);
                SweetAlert.swal("Ocorreu um erro", erro.data, "error");
            });
    }

}]);
app.controller('UserEditCtrl', ["$scope", "$state", "$stateParams", "User", "SweetAlert",
    function($scope, $state, $stateParams, User, SweetAlert){

    $scope.init = function(){
        $scope.user = User.get( { id: $stateParams.id } );
        
    }

    $scope.init();

    $scope.updateUser = function() {
        $scope.user.$update({id: $scope.user.id},
            function (user){
                $state.go('app.manager.users');
        }, function (erro){
                console.log(erro);
                SweetAlert.swal("Dados incorretos", "Verifique os dados digitados", "error");
        });        
    };

}]);