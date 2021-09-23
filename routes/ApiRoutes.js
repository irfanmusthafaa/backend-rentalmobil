const controller = require('../controllers/ApiControllers')

module.exports = function(app) {
    app.get('/api/v1/landing-page', controller.landingPage)
    app.get('/api/v1/detail-page/:id', controller.detailPage)
    app.post('/api/v1/booking-page', controller.bookingPage)

}