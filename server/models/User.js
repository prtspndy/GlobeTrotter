const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String },
  googleId: { type: String },
  profileImage: { type: String, default: '' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  preferences: {
    travelStyle: [{ type: String }],
    preferredCurrency: { type: String, default: 'USD' }
  },
  savedDestinations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'City' }],
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, { timestamps: true });

UserSchema.methods.matchPassword = async function(enteredPassword) {
  if (!this.passwordHash) return false;
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

module.exports = mongoose.model('User', UserSchema);
