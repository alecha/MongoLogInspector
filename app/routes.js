module.exports = function (app, router, compressedLog, _, zlib) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    router.use(function (req, res, next) {
        console.log('something is happening');
        next();
    });

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('/', function (req, res) {
        res.sendfile('./public/index.html');
    });

    router.get('/', function (req, res) {
        res.json({message: 'message from the server'});
    })

    router.route('/logs')
        .get(function (req, res) {
            var planLogs = [];
            compressedLog.find({State: 1}).limit(10).exec(function (err, logs) {
                if (err)
                    res.send(err);
                var logsLength = logs.length;
                counter = 0;
                _.each(logs, function (log) {
                    var baseLog = {
                        state: log.State,
                        applicationName: log.ApplicationName
                    };
                    decompress(log.CompressedEvents, baseLog, planLogs, logsLength, res, callback);
                });
            });
        });

    app.use('/api', router);

    function callback(res, planLogs) {
        res.json(planLogs);
    }

    function decompress(compressed, baseLog, planLogs, logsLength, res, callback) {
        var buffer = new Buffer(compressed, 'base64').slice(4);
        zlib.unzip(buffer, function (err, buffer) {
            counter++;
            if (!err) {
                var logDetails = JSON.parse(buffer.toString());
                for (var i = 0; i < logDetails.length; i++) {
                    var currentLog = {
                        state: baseLog.state,
                        applicationName: baseLog.applicationName
                    };
                    for (var prop in logDetails[i])
                        currentLog[prop] = logDetails[i][prop];
                    planLogs.push(currentLog);
                }
                if (counter  == logsLength) {
                    callback(res, planLogs);
                }
            }
        });
    }
    var counter = 0;
};
