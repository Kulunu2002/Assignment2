const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    profilePicture: {
        type: String,
    },
    tokens: [
        {
            token: {
                type: String
            }
        }
    ]
})

userSchema.pre("save", async function (next) {
    const user = this;

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await Users.findOne({ email })

    if (!user) {
        throw new Error("Not User")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error("invalid Password")
    }

    return user;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, "mysecret")
    user.tokens = user.tokens.concat({ token })

    await user.save()
    return token;


}

const Users = mongoose.model('Users', userSchema);

module.exports = Users;