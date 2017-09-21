(function () {

    angular.module('PerfDemo').directive('perfUserFacetedSearch', function () {

        return {

            restrict: 'E',

            scope: {
                users: "=?"
            },

            controller: [

                '$scope',
                '$timeout',
                'UsersService',
                'FacetedSearchManagerClass',

                function ($scope, $timeout, UsersService, FacetedSearchManagerClass) {


                    /*============ PRIVATE VARIABLES AND METHODS ============*/

                    var filteredUsers = [];


                    /*============ MODEL ============*/

                    $scope.searchCount = 0;

                    $scope.users = $scope.users || [];
                    $scope.loading = false;

                    $scope.isOverHardDisplayLimit = false;  // we won't let the user display this much... their browser will crash

                    $scope.softLimitAccepted = false;   // the user can say "yes" display results up to the hard limit

                    $scope.filteredUsersFilteredByFacets = [];
                    $scope.facetsSelectedCount = 0;

                    $scope.userNameFilter = '';
                    $scope.userNameFilterActive = false;

                    $scope.ariaLiveMessage = '';

                    $scope.facetedSearchManager = new FacetedSearchManagerClass({
                        title: 'REFINE BY:',
                        data: filteredUsers,
                        selectedFacets: {
                            enabled: {
                                enabled: true
                            }
                        },
                        facets: [
                            {
                                id: 'iPhone',
                                multiSelect: true,
                                title: 'Desired Model',
                                fieldValueAndTitle: function (dataItem) {
                                    return {
                                        value: dataItem.iPhone,
                                        title: dataItem.iPhone
                                    };
                                },
                                sortBy: function (facetValue) {
                                    return facetValue.title.toLowerCase();
                                }
                            },
                            {
                                id: 'hasMac',
                                multiSelect: false,
                                title: 'Owns a Mac/MacBook',
                                fieldValueAndTitle: function (dataItem) {

                                    return {
                                        value: dataItem.hasMac,
                                        title: dataItem.hasMac ? 'Yes' : 'No'
                                    };
                                }
                            },
                            {
                                id: 'sex',
                                title: 'Sex',
                                multiSelect: true,
                                fieldValueAndTitle: function (dataItem) {
                                    return {
                                        value: dataItem.sex,
                                        title: dataItem.sex
                                    };
                                },
                                sortBy: function (facetValue) {
                                    return facetValue.value;
                                }
                            },
                            {
                                id: 'age',
                                title: 'Age',
                                multiSelect: true,
                                fieldValueAndTitle: function (dataItem) {
                                    return {
                                        value: dataItem.age,
                                        title: dataItem.age
                                    };
                                },
                                sortBy: function (facetValue) {
                                    return facetValue.value;
                                }
                            }
                        ]
                    });


                    /*============ MODEL DEPENDENT METHODS ============*/

                    var filterUsers = function (users_in) {

                        $scope.userNameFilterActive = $.trim($scope.userNameFilter) !== '';

                        var searchTokens = $scope.userNameFilter.split(/[\s,]+/g);

                        for (var i=0; i < searchTokens.length; i++) {
                            searchTokens[i] = $.trim(searchTokens[i].toLowerCase());
                        }

                        // if there is only an empty token then don't filter
                        if (searchTokens.length === 1 && searchTokens[0] === '') {
                            return users_in;
                        }

                        return _.filter(users_in, function (user) {

                            var matches = true;
                            _.each(searchTokens, function (token) {
                                matches = matches && (user._nameSearch.indexOf(token) !== -1);
                            });
                            return matches;
                        });
                    };

                    var updateFilters = function () {
                        filteredUsers = filterUsers($scope.users);
                        $scope.facetedSearchManager.setData(filteredUsers);
                    };

                    var debounced_updateFilters = _.debounce(function () {
                        updateFilters();
                        $scope.$apply();
                    }, 300);

                    var dataWasFiltered = function () {};

                    var getUsers = function () {
                        return UsersService.getUsers();
                    };

                    var refresh = function () {

                        $scope.loading = true;

                        $scope.searchCount++;

                        getUsers().then(function (users) {

                            $scope.users = users;

                            _.each($scope.users, function (user) {
                                user._nameSearch =  (user.lastName ? user.lastName.toLowerCase() : "") + " " + (user.firstName ? user.firstName.toLowerCase() : "");
                            });

                            updateFilters();

                        }).finally(function () {
                            $scope.loading = false;
                        });

                        updateFilters();
                    };

                    var initialize = function () {
                        refresh();
                    };


                    /*============ BEHAVIOR ============*/

                    $scope.clearUserNameFilter = function () {
                        $scope.userNameFilter = '';
                    };

                    $scope.clearAllFacets = function () {
                        $scope.facetedSearchManager.clearAllFacets();
                    };

                    $scope.acceptSoftLimit = function () {
                        $scope.softLimitAccepted = true;
                    };

                    $scope.userSelected = function (user) {
                        $scope.$emit('perf-user-faceted-search.userSelected', user);
                    };


                    /*============ LISTENERS ============*/

                    // when the user updates the username filter search we need to filter the users
                    $scope.$watch('userNameFilter', debounced_updateFilters);

                    $scope.facetedSearchManager.addListener('filteredDataUpdated', function (dataFilteredByFacets) {

                        $scope.filteredUsersFilteredByFacets = _.sortBy(dataFilteredByFacets, function (user) {
                            return user._nameSearch;
                        });

                        dataWasFiltered();
                    });

                    $scope.facetedSearchManager.addListener('facetDataUpdated', function (facetData, selectedFacetMap, facetsSelectedCount) {

                        $scope.$emit('perf-user-faceted-search.selectedFacetsUpdated', selectedFacetMap);
                        $scope.facetsSelectedCount = facetsSelectedCount;

                        dataWasFiltered();
                    });


                    /*============ INITIALIZATION ============*/

                    initialize();
                }
            ],

            template: [

                '<div class="row">',

                    '<div class="col-md-4 col-sm-5">',

                        '<perf-facet-list faceted-search-manager="facetedSearchManager"></perf-facet-list>',

                    '</div>',

                    '<div class="col-md-8 col-sm-7">',

                        '<div class="well well-thin perf-activation-faceted-search-controls">',

                            '<div class="row">',
                                '<div class="col-sm-12">',

                                    '<div class="input-group" perf-clearable-input="userNameFilter">',
                                        '<span class="input-group-addon" id="perf-activation-faceted-search-addon" ng-class="{\'input-group-addon-active\': userNameFilterActive}">',
                                            '<i class="fa fa-search" aria-hidden="true"></i> ',
                                            '<span class="sr-only">Search User Name</span>',
                                        '</span>',
                                        '<input ',
                                            'id="perf-activation-faceted-search" ',
                                            'class="form-control" ',
                                            'type="text" ',
                                            'ng-model="userNameFilter" ',
                                            'placeholder="filter by user name" ',
                                            'aria-describedby="perf-activation-faceted-search-addon"',
                                        '/>',
                                    '</div>',

                                '</div>',
                            '</div>',

                        '</div>',


                        '<perf-content-loading-placeholder ng-if="filteredUsersFilteredByFacets.length === 0" no-results="filteredUsersFilteredByFacets.length === 0 && !loading">',
                            'Whoops! We couldn\'t find any matches.',
                            '<div class="perf-content-loading-placeholder-details" ng-if="facetsSelectedCount !== 0 && !loading" ng-click="clearAllFacets()"><i class="fa fa-times-circle"></i> Clear all Facets</div>',
                            '<div class="perf-content-loading-placeholder-details" ng-if="userNameFilterActive && !loading" ng-click="clearUserNameFilter()"><i class="fa fa-times-circle"></i> Clear the User Name Filter</div>',
                        '</perf-content-loading-placeholder>',

                        '<ul class="list-unstyled search-result user-cards" ng-if="!loading && (!isOverSoftDisplayLimit || (isOverSoftDisplayLimit && softLimitAccepted)) && !isOverHardDisplayLimit">',
                            '<li class="user user-card" ng-repeat="user in filteredUsersFilteredByFacets track by user.id" ng-click="userSelected(user)" perf-focusable>',
                                '<perf-user-card user="user"></per-user-card>',
                            '</li>',
                        '</ul>',

                        '<div aria-live="polite" aria-relevant="all" class="sr-only">{{ariaLiveMessage}}</div>',

                    '</div>',

                '</div>'
            ].join('')

        };

    });

})();




