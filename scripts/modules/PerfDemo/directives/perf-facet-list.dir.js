(function () {

    angular.module('PerfDemo').directive('perfFacetList', function () {

        return {

            restrict: 'E',

            scope: {
                facetedSearchManager: "="
            },

            controller: [

                '$scope',

                function ($scope) {


                    /*============ MODEL ============*/

                    $scope.facetData = $scope.facetedSearchManager.getFacetData();
                    $scope.selectedFacetsCount = 0;


                    /*============ BEHAVIOR ============*/

                    $scope.toggleFacetValue = function (facet, facetValue) {
                        $scope.facetedSearchManager.toggleFacet(facet.id, facetValue.id);
                    };

                    $scope.clearAll = function () {
                        $scope.facetedSearchManager.clearAllFacets();
                    };


                    /*============ LISTENERS ============*/

                    $scope.facetedSearchManager.addListener('facetDataUpdated', function (facetData) {
                        $scope.facetData = facetData;
                        $scope.selectedFacetsCount = $scope.facetedSearchManager.getSelectedFacetsCount();
                    });

                }
            ],

            template: [
                '<div class="well well-thin">',
                    '<div class="perf-facet-list-header row">',
                        '<div class="col-sm-7">',
                            '<span class="perf-facet-list-title">Refine By:</span>',
                        '</div>',
                        '<div class="col-sm-5 text-right">',
                            '<span class="perf-facet-list-clear-all">',
                                '<a href="#" class="btn-link btn-full-width-when-small" ng-click="clearAll()" ng-disabled="selectedFacetsCount == 0">Clear<span class="sr-only"> all facets </span> <i class="fa fa-times-circle"></i></a>',
                            '</span>',
                        '</div>',
                    '</div>',
                    '<div class="perf-facet-list-facets">',
                        '<div class="perf-facet-list-facet" ng-class="{selected: facet.selected}" ng-repeat="facet in facetData track by facet.id">',
                            '<h4 class="perf-facet-list-facet-title" >{{::facet.title}}</h4>',
                            '<div class="perf-facet-list-facet-values" role="group">',
                                '<div class="perf-facet-list-facet-value" ng-repeat="value in facet.values track by value.id" role="checkbox" ng-checked="value.selected">',
                                    '<input id="perf-facet-input-{{::facet.id + \'-\' + value.id}}" type="checkbox" ng-checked="value.selected" ng-click="toggleFacetValue(facet, value)"/>',
                                    '<label for="perf-facet-input-{{::facet.id + \'-\' + value.id}}" class="perf-facet-list-facet-value-title">{{::value.title}}</label>',
                                    '<span class="perf-facet-list-facet-value-count">( {{value.count}} )</span>',
                                '</div>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</div>'
            ].join('')

        };
    });

})();
