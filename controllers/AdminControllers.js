const mongoose = require('mongoose')
const db = require('../models')
const Image = require('../models/Image')

const Category = db.category
const Item = db.item

exports.createImage = async (req, res) => {
    if(!req.file) {
        const err = new Error('Image harus di upload');
        err.errorStatus = 422;
        throw err;
    }
    const image = req.file.path;

    try {
        const newImage = await Image.create({
            image
        })
        console.log(req.body)
        const result = await newImage.save()
        return res.status(200).send({
            message: "Data berhasil ditambahkan",
            data: result
        })
        
    } catch (err) {
        return res.status(500).send({
            message: err,
          });
    }
}

exports.deleteImage = async (req,res) => {
    try {
        const image = await Image.findOneAndRemove({_id: mongoose.Types.ObjectId(req.body.idImage)});

        const item = await Item.updateMany(
            { },
            { $pull: {imageUrl: mongoose.Types.ObjectId(req.body.idImage)}}
        );

        res.json({
            image,
            item
        })
    } catch (error) {
        return res.status(500).send({
            message: error,
          });
    }
}

exports.createItem = async (req, res) => {
    const { name, country, city, price, unit, isPopular, description, categoryId, imageUrl } = req.body;
    try {
        const category = await Category.findOne({ _id: mongoose.Types.ObjectId(categoryId) });

        if(category !== null) {
            const item = await Item.create({
                name,
                country,
                city,
                price,
                unit,
                isPopular,
                description,
                categoryId,
                imageUrl
            })

            await Category.updateOne({ _id: mongoose.Types.ObjectId(categoryId) }, { $push: { itemId: mongoose.Types.ObjectId(item._id) } });
            return res.status(200).send({ // tampilkan data
                data: item,
              });
        }

            return res.status(500).send({
            message: 'Data categoryId tidak ada',
          });

    } catch (err) {
        return res.status(500).send({
            message: 'Terjadi kesalahan, mohon cek data anda!',
          });
      
    }
}

exports.getItems = async (req, res) => {
    try {
      const item = await Item.find();
      res.json(item);
    } catch (error) {
      return res.status(500).send({
        message: error,
      });
    }
  };

  exports.deleteItem = async (req, res) => {
      try {
          const item = await Item.findOneAndRemove({_id: mongoose.Types.ObjectId(req.body.idItem)});

          const category = await Category.updateMany(
              { },
              { $pull: {itemId: mongoose.Types.ObjectId(req.body.idItem)}}
          );

          res.json({
              item,
              category
          })
      } catch (error) {
        return res.status(500).send({
            message: error,
          });
      
      }
  }
  
  // Category

  exports.createCategory = async (req, res) => {
      const { name, itemId } = req.body;
      try {
          const category = await Category.create({
              name,
              itemId
          })

          const result = await category.save()
          return res.status(200).send({
              data: result
          })
      } catch (error) {
        return res.status(500).send({
            message: err,
          });
      }
  }

  exports.getCategories = async (req, res) => {
    try {
      const category = await Category.find();
      res.json(category);
    } catch (error) {
      return res.status(500).send({
        message: error,
      });
    }
  };