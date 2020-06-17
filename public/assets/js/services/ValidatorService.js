
// Validator Service for forms
angular.module('SMCERApp').factory('ValidatorService', ["$state", "SweetAlert", function ($state, SweetAlert) {

    return {
        validateForm: function (form, show) {
            var firstError = null;
            if (form.$invalid) {

                var field = null, firstError = null;
                for (field in form) {
                    if (field[0] != '$') {
                        if (firstError === null && !form[field].$valid) {
                            firstError = form[field].$name;
                        }

                        if (form[field].$pristine) {
                            form[field].$dirty = true;
                        }
                    }
                }

                angular.element('.ng-invalid[name=' + firstError + ']').focus();
                SweetAlert.swal("Há erros que precisam ser corrigidos antes de prosseguir", "Os erros são marcados com uma borda vermelha e uma mensagem no formulário", "error");
                return false;

            } else {
                if (show) {
                    SweetAlert.swal("Bom trabalho!", "Os dados foram preenchidos corretamente.", "success");
                }
                return true;
            }

        },
        reset: function (form) {
            form.$setPristine(true);
        }
    };

}]);