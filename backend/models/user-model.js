const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: {
     type: String, 
    required: true 
},
  last_name: {
     type: String, 
     equired: true 
    },
  role: { 
    type: String, 
    required: true 
},
  dob: {
     type: Date, 
     required: true 
    },
  gender: {
     type: String, 
     required: true 
    },
  email: { 
    type: String, 
    required: true,
     unique: true 
    },
  mobile: { 
    type: String, 
    required: true
 },
  city: { 
    type: String, 
    required: true 
},
  state: { 
    type: String, 
    required: true 
},
  password: { 
    type: String, 
    required: true 
},
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('User', userSchema);