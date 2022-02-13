const app = require('./build_app')

app.app.listen(process.env.PORT || 5000, function () {
    console.log("Staging Server started on port "+ this.address().port);
});