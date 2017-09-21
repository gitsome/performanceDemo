(function () {

    angular.module('PerfDemo').directive('perfHeader', function () {

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

                    '<div class="row">',
                        '<div class="col">',
                            '<h1 class="perf-main-title">User iPhone Preferences</h1>',
                        '</div>',
                    '</div>',

                '</div>'
            ].join('')
        };
    });

})();