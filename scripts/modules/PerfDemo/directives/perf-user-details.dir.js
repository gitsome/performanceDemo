(function () {

    angular.module('PerfDemo').directive('perfUserDetails', function () {

        return {

            restrict: 'E',

            scope: {
                user: '='
            },

            controller: function ($scope) {

                /*============= MODEL ============*/




                /*============= MODEL DEPENDENT METHODS ============*/


                /*============= BEHAVIOR ===========*/

                $scope.close = function () {
                    $scope.$emit('perf-user-details.done');
                };


                /*============= LISTENERS ============*/

                /*============= INITIALIZATION ============*/
            },

            template: [

                '<button class="btn btn-primary perf-user-details-close" ng-click="close()"><i class="fa fa-times-circle"></i> Close</button>',

                '<div class="container-fluid">',

                    '<div class="row">',

                        '<div class="col-sm-6">',

                            '<div class="form-group">',
                                '<label for="name">First Name</label>',
                                '<input type="text" class="form-control" id="name" ng-model="user.firstName" disabled="disabled">',
                            '</div>',


                            '<div class="form-group">',
                                '<label for="lname">Last Name</label>',
                                '<input type="text" class="form-control" id="lname" ng-model="user.lastName" disabled="disabled">',
                            '</div>',


                            '<div class="form-group">',
                                '<label for="email">Email address</label>',
                                '<input type="email" class="form-control" id="email" ng-model="user.email" disabled="disabled">',
                            '</div>',

                        '</div>',
                        '<div class="col-sm-6">',

                                '<div class="form-group">',
                                    '<label for="phone">Phone Number</label>',
                                    '<input type="text" class="form-control" id="phone" ng-model="user.phone_number" disabled="disabled">',
                                '</div>',

                                '<div class="form-group">',
                                    '<label for="city">City</label>',
                                    '<input type="text" class="form-control" id="city" ng-model="user.location.city" disabled="disabled">',
                                '</div>',

                                '<div class="form-group">',
                                    '<label for="state">State</label>',
                                    '<input type="text" class="form-control" id="state" ng-model="user.location.state" disabled="disabled">',
                                '</div>',

                        '</div>',

                    '</div>',

                '</div>'

            ].join('')
        };
    });

})();