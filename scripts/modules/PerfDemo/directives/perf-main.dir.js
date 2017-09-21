(function () {

    angular.module('PerfDemo').directive('perfMain', function () {

        return {

            restrict: 'E',

            controller: function ($scope) {

                /*============= MODEL ============*/

                $scope.userSelected = false;


                /*============= MODEL DEPENDENT METHODS ============*/

                /*============= BEHAVIOR ===========*/


                /*============= LISTENERS ============*/

                $scope.$on('perf-user-faceted-search.userSelected', function (e, user) {
                    $scope.userSelected = user;
                });

                $scope.$on('perf-user-details.done', function (e, user) {
                    $scope.userSelected = false;
                });


                /*============= INITIALIZATION ============*/
            },

            template: [

                '<perf-header></perf-header>',

                '<div class="perf-content">',
                    '<div class="container">',
                        '<perf-user-faceted-search></perf-user-faceted-search>',
                    '</div>',
                '</div>',

                '<perf-user-details ng-if="userSelected" user="userSelected"></perf-user-details>'

            ].join('')
        };
    });

})();