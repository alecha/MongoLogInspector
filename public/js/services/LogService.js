angular.module('LogModule', []).factory('LogService', function ($http) {
    var logs = [];
    var logsProperties = [];
    $http.get("/api/logs")
        .success(function (logsFromServer) {
            _.each(logsFromServer, function (log) {
                logs.push(log);

                for (var prop in log) {
                    if (!_.contains(logsProperties, prop))
                        logsProperties.push(prop);
                }
            });
        })
        .error(function () {
            console.log('error in get Logs');
        });

    return {
        logs: logs,
        logsProperties: logsProperties
    };
});