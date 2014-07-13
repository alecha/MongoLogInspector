angular.module('LogCtrl', []).controller('LogController', function ($scope, LogService) {
    $scope.logs = LogService.logs;
    $scope.logsProperties = LogService.logsProperties;

    $scope.visibleLogProperties = ["applicationName", "state"];

    $scope.toggleLogProperty = function (logProp) {
        if (_.contains($scope.visibleLogProperties, logProp))
            $scope.visibleLogProperties.splice($scope.visibleLogProperties.indexOf(logProp), 1);
        else
            $scope.visibleLogProperties.push(logProp);
    }
});