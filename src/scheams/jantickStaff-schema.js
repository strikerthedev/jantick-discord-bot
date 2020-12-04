const mongoose = require('mongoose')

let StaffSchema = new mongoose.Schema({
    id : String
})

module.exports = mongoose.model('jantickStaff', StaffSchema)