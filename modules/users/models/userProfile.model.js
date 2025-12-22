import mongoose from 'mongoose'

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    isCurrent: { type: Boolean, default: false },
    description: { type: String },
  },
  { _id: true }
)

const userProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },

    headline: {
      type: String,
      trim: true,
    },

    location: {
      city: String,
      country: String,
      remotePreference: {
        type: Boolean,
        default: true,
      },
    },

    skills: [
      {
        name: { type: String, required: true },
        level: {
          type: String,
          enum: ['beginner', 'intermediate', 'advanced'],
          default: 'intermediate',
        },
      },
    ],

    experience: [experienceSchema],

    preferences: {
      jobType: {
        type: [String],
        enum: ['full-time', 'part-time', 'internship', 'contract'],
        default: ['full-time'],
      },
      locations: [String],
      remoteOnly: {
        type: Boolean,
        default: false,
      },
      salaryRange: {
        min: Number,
        max: Number,
      },
    },

    resume: {
      originalUrl: String,
      parsedText: String,
      lastUpdated: Date,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('UserProfile', userProfileSchema)
