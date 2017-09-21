(function () {

    angular.module('PerfDemo').factory('ObservableClass', [

        function () {

            /*============ PRIVATE STATIC VARIABLES AND METHODS ============*/

            // default properties
            var defaults = {};


            /*============ CLASS DECLARATION ============*/

            var ObservableClass = function (entityData) {

                // we simply tack on merged properties during initialization
                var that = this;
                $.extend(true, that, defaults, entityData, {});


                /*============ PRIVATE VARIABLES AND METHODS ============*/

                var listeners = {};


                /*============ PUBLIC METHODS ============*/

                that.addListener = function (eventName, callBack) {
                    if (!listeners[eventName]) {
                        listeners[eventName] = [];
                    }
                    listeners[eventName].push(callBack);
                };

                that.removeListener = function (eventName, callBack) {
                    listeners[eventName] = _.without(listeners[eventName], callBack);
                };

                that.fireEvent = function (eventName, data_args) {
                    if (listeners[eventName]) {
                        for (var i=0; i < listeners[eventName].length; i++) {
                            listeners[eventName][i].apply(that, data_args);
                        }
                    }
                };
            };


            /*============ PUBLIC STATIC METHODS ============*/

            /*============ LISTENERS ============*/


            /*============ ENTITY PASSBACK ============*/

            return ObservableClass;
        }
    ]);

})();