import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        parentName: {
            type: String,
        },

        email: {
            type: String,
        },

        course: {
            type: String,
            required: true,
        },

        school: {
            type: String,
        },

        batchTiming: {
            type: String,
        },

        message: {
            type: String,
        },

        formType: {
            type: String,
            required: true,
            default: "enquiry"
        },

        status: {
            type: String,
            enum: ["new", "contacted", "admitted"],
            default: "new",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Admission", admissionSchema);