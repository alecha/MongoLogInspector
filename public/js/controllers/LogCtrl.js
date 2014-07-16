angular.module('LogCtrl', []).controller('LogController', function ($scope, LogService) {
    $scope.logs = LogService.logs;
    $scope.logsProperties = LogService.logsProperties;

    $scope.visibleLogProperties = ["applicationName", "host", "level", "short_message", "state", "timestamp"];

    $scope.toggleLogProperty = function (logProp) {
        if (_.contains($scope.visibleLogProperties, logProp))
            $scope.visibleLogProperties.splice($scope.visibleLogProperties.indexOf(logProp), 1);
        else
            $scope.visibleLogProperties.push(logProp);
    }

    $scope.setClass = function(log){
        switch(log.level){
            case 1,2,3:
                return "danger";
            case 4,5,6:
                return "info";
        }
    }
});