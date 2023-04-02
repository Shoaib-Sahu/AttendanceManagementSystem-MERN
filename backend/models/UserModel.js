import mongoose from "mongoose";
import bcrypt from 'bcrypt';
mongoose.set("strictQuery", true);

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        firstname: {
            type: String,
            required: [true, "Please Enter Your Firstname"]
        },
        lastname: {
            type: String,
            required: [true, "Please Enter Your Lastname"]
        },
        rollNo: {
            type: String,
            required: true
        },
        class: {
            type: String,
            required: true
        },
        course: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        status: {
            type: String
        },
        attendance: [{
            date: {
                type: String,
            },
            studentId: {
                type: String
            },
            present: {
                type: Boolean,
            },
            student: Object,
        }],
        profilePicture: String,
    },
    {
        timestamps: true
    },
);

// Generating hash password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    };
    this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", userSchema);
export default User;