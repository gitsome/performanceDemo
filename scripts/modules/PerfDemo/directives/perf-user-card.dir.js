(function () {

    angular.module('PerfDemo').directive('perfUserCard', function () {

        return {

            restrict: 'E',

            template: [
                '<div class="row card-data">',
                    '<div class="number-wrapper">',
                        '<div class="list-number">',
                            '<span class="value number">{{::$index + 1}}</span>',
                        '</div>',
                    '</div>',
                    '<div class="card-wrapper">',
                        '<div>',
                            '<div class="user-data">',
                                '<h3 class="name">',
                                    '<span class="value lastname emphasize">{{::user.lastName}}</span><span ng-if="user.lastName">, </span>',
                                    '<span class="value firstname">{{::user.firstName}}</span> ',
                                '</h3>',
                                '<div class="perf-user-details">',
                                    '<span>{{::user.location.city}}, {{::user.location.state}}</span>',
                                '</div>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</div>'
            ].join('')
        };
    });

})();