import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema(
  {
    /* ======================
       OWNERSHIP & STATUS
       ====================== */
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    status: {
      type: String,
      enum: ['open', 'closed', 'paused'],
      default: 'open',
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    /* ======================
       CORE JOB INFO
       ====================== */
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    /* ======================
       COMPANY INFO
       ====================== */
    company: {
      name: {
        type: String,
        required: true,
      },
      website: String,
      logo: String,

      // 🔥 NEW (for scraping)
      linkedinUrl: String,
    },

    /* ======================
       JOB TYPE & LOCATION
       ====================== */
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'internship', 'contract'],
      required: true,
    },

    location: {
      city: String,
      country: String,
      isRemote: {
        type: Boolean,
        default: false,
      },
    },

    /* ======================
       SALARY
       ====================== */
    salary: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'INR',
      },
    },

    /* ======================
       REQUIREMENTS
       ====================== */
    experienceLevel: {
      type: String,
      enum: ['fresher', 'junior', 'mid', 'senior'],
    },

    requiredSkills: [String],

    /* ======================
       🔥 APPLICATION METHOD
       ====================== */
    application: {
      method: {
        type: String,
        enum: ['platform', 'email', 'external-link'],
        required: true,
      },

      applyUrl: String, // LinkedIn / company page
      applyEmail: String, // resume@company.com
    },

    /* ======================
       🔥 CONTACT INFO (SCRAPED)
       ====================== */
    contacts: {
      hr: {
        name: String,
        email: String,
        linkedinProfile: String,
      },

      ceo: {
        name: String,
        email: String,
        linkedinProfile: String,
      },
    },

    /* ======================
       SCRAPING METADATA
       ====================== */
    source: {
      type: String,
      enum: ['internal', 'linkedin', 'indeed', 'company-site','api'],
      default: 'internal',
    },

    sourcePostUrl: String, // 🔥 LinkedIn post URL
    externalJobId: String, // LinkedIn job ID

    scrapedAt: Date,

    /* ======================
       DASHBOARD / STATS
       ====================== */
    totalApplications: {
      type: Number,
      default: 0,
    },

    applicationDeadline: Date,

    tags: [String],
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Job', jobSchema)
