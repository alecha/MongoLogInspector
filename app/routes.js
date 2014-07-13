module.exports = function (app, router, compressedLog, _) {

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
            compressedLog.find({State: 1}).limit(1000).exec(function (err, logs) {
                if (err)
                    res.send(err);
                _.each(logs, function (log) {
                    var attributes = JSON.parse('{"date": "miaData"}'); //call for decrypting
                    var log = {
                        state: log.State,
                        applicationName: log.ApplicationName
                    };
                    for (var prop in attributes)
                        log[prop] = attributes[prop]
                    planLogs.push(log);
                });
                res.json(planLogs);
            });
        });

    app.use('/api', router);
};