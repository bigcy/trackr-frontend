/* global localStorage */
/* jshint camelcase: false */
define(['config'], function(config) {
    'use strict';
    return ['$scope', '$location', '$state', '$log', '$http', function($scope, $location, $state, $log, $http) {
        $scope.url = config.url;

        var hash = $location.hash();
        if(hash.indexOf('access_token') > -1) {
            var extractRegex = /access_token=([a-zA-Z0-9-]*)&/;
            var result = extractRegex.exec(hash);
            if(result.length > 1) {
                $log.debug('Found access token in hash, redirecting to the app.', result[1]);
                localStorage.setItem('oauthToken', result[1]);
                $http.defaults.headers.common.Authorization = 'Bearer ' + result[1];
                $state.go('app');
            } else {
                $log.error('access_token not extractable via regex from hash', hash);
            }
        } else if(hash.length > 0) {
            $log.debug('Hash didn\'t contain the access_token', hash);
        }
    }];
});