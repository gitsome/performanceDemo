(function () {

    angular.module('PerfDemo').directive('perfMain', function () {

        return {

            restrict: 'E',

            controller: function ($scope) {

                /*============= PRIVATE PROPERTIES / METHODS ============*/

                /*============= MODEL ============*/

                /*============= MODEL DEPENDENT METHODS ============*/

                /*============= BEHAVIOR ===========*/

                /*============= LISTENERS ============*/

                /*============= INITIALIZATION ============*/
            },

            template: [
                '<div class="container">',
                    '<h1 class="perf-main-title">Demo time</h1>',
                    '<div class="alert alert-primary" role="alert">',
                      'This is a primary alert—check it out!',
                    '</div>',
                '</div>'
            ].join('')
        };
    });

})();