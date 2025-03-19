import mongoose, { Schema, Document } from 'mongoose';

const caRegSchema = new mongoose.Schema(
  {
    caId: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
      match: /^[A-Z0-9]+$/,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
    },
    middleName: {
      type: String,
      required: true,
      minlength: 2,
    },
    firstName: {
      type: String,
      required: true,
      minlength: 2,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female', 'Transgender'],
    },
    email: {
      type: String,
      required: true,
      match: /^\S+@\S+\.\S+$/,
    },
    address: {
      type: String,
      required: true,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
  },
  {
    timestamps: true,
    collection: 'CARegistrations',
  }
);

const CARegModel = mongoose.models.CAReg || mongoose.model('CAReg', caRegSchema);

export default CARegModel;