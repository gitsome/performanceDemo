(function () {

    angular.module('PerfDemo').directive('perfHeader', function () {

        return {

            restrict: 'E',

            controller: function ($scope, $element) {

                /*============= PRIVATE PROPERTIES / METHODS ============*/

                /*============= MODEL ============*/

                /*============= MODEL DEPENDENT METHODS ============*/

                /*============= BEHAVIOR ===========*/

                /*============= LISTENERS ============*/

                /*============= INITIALIZATION ============*/

                window.onscroll = function () {
                    var doc = document.documentElement;
                    var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

                    var body = document.body;
                    var html = document.documentElement;
                    var height = Math.max( body.scrollHeight, body.offsetHeight,
                        html.clientHeight, html.scrollHeight, html.offsetHeight );

                    var percentDown = (1 - (top/height));
                    $element[0].style = `background-color: rgba(255,255,255, ${1 * percentDown});`;
                };
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