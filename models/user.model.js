const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

// const cartSchema = new mongoose.Schema(
// 	{
// 		product: { type: mongoose.Types.ObjectId, ref: 'Product' },
// 		amount: Number
// 	},
// 	{ _id: false }
// );

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: null,
      },
    password: {
        type: String,
        required: true,
        select: false
    },
    // cart: [cartSchema],
    type: {
        type: String,
    },
    language: [{
        type: String,
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: "user",
    }, ],
    following: [{
        type: Schema.Types.ObjectId,
        ref: "user",
    }, ],
    videosId: [
        {
          type: Schema.Types.ObjectId,
          ref: "Video",
        },
      ],
});

userSchema.virtual('followersCount').get(function() {
    return this.followers.length;
});

userSchema.virtual('followingCount').get(function() {
    return this.following.length;
});

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


const User = mongoose.model("user", userSchema); 

module.exports = User; 