import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 100,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
            maxlength: 20,
        },

        parentName: {
            type: String,
            maxlength: 100,
        },

        email: {
            type: String,
            maxlength: 100,
        },

        course: {
            type: String,
            required: function () {
                return this.formType !== "enquiry";
            },
            maxlength: 100,
        },

        school: {
            type: String,
            maxlength: 100,
        },

        batchTiming: {
            type: String,
            maxlength: 50,
        },

        message: {
            type: String,
            maxlength: 1000,
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