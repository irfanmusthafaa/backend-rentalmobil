const controller = require('../controllers/AdminControllers')

module.exports = function(app) {
    app.post('/api/v1/item/create', controller.createItem)
    app.get('/api/v1/item', controller.getItems)
    app.delete('/api/v1/item/delete', controller.deleteItem)

    app.post('/api/v1/category/create', controller.createCategory)
    app.get('/api/v1/category', controller.getCategories)

    app.post('/api/v1/image/create', controller.createImage)
    app.delete('/api/v1/image/delete', controller.deleteImage)
}

