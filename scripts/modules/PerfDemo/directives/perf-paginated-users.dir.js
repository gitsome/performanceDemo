(function () {

    angular.module('PerfDemo').directive('perfPaginatedUsers', function () {

        return {

            restrict: 'E',

            scope: {
                users: '='
            },

            controller: function ($scope) {

                /*============= PRIVATE VARIABLES ============*/

                var PAGE_LIMIT = 50;


                /*============= MODEL ============*/

                $scope.pagedUsers = [];

                $scope.currentPage = 1;
                $scope.totalPages = 0;
                $scope.baseIndex = 0;

                /*============= MODEL DEPENDENT METHODS ============*/

                var pageStart;
                var pageEnd;
                var updatePagedUsers = function () {

                    $scope.totalPages = Math.ceil($scope.users.length / PAGE_LIMIT);

                    pageStart = ($scope.currentPage - 1) * PAGE_LIMIT;
                    pageEnd = pageStart + PAGE_LIMIT - 1;

                    $scope.baseIndex = pageStart + 1;

                    $scope.pagedUsers = $scope.users.slice(pageStart, pageEnd);

                    _.each($scope.pagedUsers, function (user, index) {
                        user._index = pageStart + index + 1;
                    });
                };


                /*============= BEHAVIOR ===========*/

                $scope.nextPage = function () {
                    if ($scope.currentPage < $scope.totalPages) {
                        $scope.currentPage++;
                        updatePagedUsers();
                    }
                };

                $scope.prevPage = function () {
                    if ($scope.currentPage > 1) {
                        $scope.currentPage--;
                        updatePagedUsers();
                    }
                };

                $scope.userSelected = function (user) {
                    $scope.$emit('perf-paginated-users.userSelected', user);
                };


                /*============= LISTENERS ============*/

                $scope.$on('perf-paginated-users.requestUpdate', function (e, users) {
                    $scope.users = users;
                    $scope.currentPage = 1;
                    updatePagedUsers();
                });


                /*============= INITIALIZATION ============*/

                updatePagedUsers();
            },

            template: [

                '<div class="row">',

                    '<div class="col-sm-3">',
                        '<button class="btn btn-default" ng-click="prevPage()">',
                            '<i class="fa fa-chevron-left"></i> Previous',
                        '</button>',
                    '</div>',

                    '<div class="col-sm-6 text-align-center">',
                        'Page {{currentPage}} of {{totalPages}}',
                    '</div>',

                    '<div class="col-sm-3 text-align-right">',
                        '<button class="btn btn-default" ng-click="nextPage()">',
                            'Next <i class="fa fa-chevron-right"></i>',
                        '</button>',
                    '</div>',

                '</div>',

                '<ul class="list-unstyled search-result user-cards">',
                    '<li class="user user-card" ng-repeat="user in pagedUsers track by user.id" ng-click="userSelected(user)" perf-focusable>',
                        '<perf-user-card user="user"></per-user-card>',
                    '</li>',
                '</ul>',

                '<div class="row">',

                    '<div class="col-sm-3">',
                        '<button class="btn btn-default" ng-click="prevPage()">',
                            '<i class="fa fa-chevron-left"></i> Previous',
                        '</button>',
                    '</div>',

                    '<div class="col-sm-6 text-align-center">',
                        'Page {{currentPage}} of {{totalPages}}',
                    '</div>',

                    '<div class="col-sm-3 text-align-right">',
                        '<button class="btn btn-default" ng-click="nextPage()">',
                            'Next <i class="fa fa-chevron-right"></i>',
                        '</button>',
                    '</div>',

                '</div>'

            ].join('')
        };
    });

})();
