const mongoose = require('mongoose')
const db = require('../models')
const Booking = require('../models/Booking')
const Member = require('../models/Member')

const Category = db.category
const Item = db.item

module.exports = {
    landingPage: async (req, res) => {
        try {
            const categories = await Category.find()
            .select(' _id name')
            .limit(3)
            .populate({
                path: 'itemId',
                select: '_id name country city isPopular imageUrl',
                perDocumentLimit: 4,
                populate: ({
                    path: 'imageUrl',
                    select: 'image',
                    perDocumentLimit: 1
                })

            })

            res.status(200).json({
                categories
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error"})
        }
    },

    detailPage: async (req, res) => {
        try {
            const { id } = req.params;
            const item = await Item.findOne({ _id: id})
            .populate({ path: 'imageUrl', select: '_id image'})

            res.status(200).json({
                ...item._doc
            })
        } catch (error) {
            res.status(500).json({ message: "Internal server error"})
        }
    },

    bookingPage: async (req, res) => {
        
            const { 
                itemId, 
                duration, 
                bookingStartDate, 
                bookingEndDate,
                firstname,
                lastname,
                email,
                phoneNumber,
                accountHolder,
                bankFrom
             } = req.body;

             if (!req.file) {
                return res.status(404).json({ message: "Image not found" });
              }

              if(
                itemId === undefined || 
                duration === undefined || 
                bookingStartDate === undefined || 
                bookingEndDate === undefined ||
                firstname === undefined ||
                lastname === undefined ||
                email === undefined ||
                phoneNumber === undefined ||
                accountHolder === undefined ||
                bankFrom  === undefined
              ) {
                res.status(404).json({ message: "Lengkapi semua field" });
              }

            const item = await Item.findOne({ _id: itemId });

            if (!item) {
            return res.status(404).json({ message: "Item not found" });
            }

            let total = item.price * duration;
            let tax = total * 0.10;

            const member = await Member.create({
                firstname,
                lastname,
                email,
                phoneNumber
            })

            const newBooking = {
                bookingStartDate,
                bookingEndDate,
                total: total += tax,
                itemId: {
                  _id: item.id,
                  name: item.name,
                  price: item.price,
                  duration: duration
                },
      
                memberId: member.id,
                payments: {
                  image: req.file.path,
                  bankFrom: bankFrom,
                  accountHolder: accountHolder
                }
              }

            const booking = await Booking.create(newBooking);

            res.status(201).json({ message: "Success Booking", booking });

            }
       

}