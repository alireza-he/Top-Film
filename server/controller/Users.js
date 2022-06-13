const {hashPassword} = require("../middleware/authentication")
const {verifyPassword} = require("../middleware/authentication")
const {createToken} = require("../middleware/authentication")
const User = require("../model/user")

const CreateUser = async ({username, password, email}) => {
    const checkExistingUser = await User.find({username});

    if (checkExistingUser.length > 0) {
        return {error: "نام كاربري وارد شده تکراری است!", status: "ERROR"}
    } else {
        const newPassword = await hashPassword(password)
        const values = {username, password: newPassword, email};

        try {
            const user = await User.create(values)
            const {email, created, role, sub, time_sub, profilePhoto} = user;
            const data = {username, email, created, role, sub, time_sub, profilePhoto}
            return {data, status: "SUCCESS"};
        } catch (err) {
            throw err
        }
    }
}

const userAuthenticating = async ({username, password}) => {
    const checkExistingUser = await User.findOne({username})

    if (!checkExistingUser) {
        return {error: "نام كابری و یا رمز عبور وارد شده وجود ندارد!", status: "ERROR"}
    } else {
        const hashPassword = checkExistingUser.password
        const checkPassword = await verifyPassword(password, hashPassword)

        if (!checkPassword) {
            return {error: "نام كابری و یا رمز عبور وارد شده وجود ندارد!", status: "ERROR"}
        } else {
            const {email, created, role, sub, time_sub, profilePhoto} = checkExistingUser;
            const token = await createToken({username, password, email, created})
            const user = {username, email, created, role, sub, time_sub, profilePhoto}
            return {token, user, status: "SUCCESS"}
        }
    }
}

const getUserData = async ({username}) => {
    const checkExistingUser = await User.findOne({username})
    const {email, created, role, sub, time_sub, profilePhoto} = checkExistingUser;
    return {username, email, created, role, sub, time_sub, profilePhoto}
}

const putUserData = async ({email, password, username, past_password}) => {
    const findUser = await User.findOne({username})
    if (password) {
        const checkPassword = await verifyPassword(past_password, findUser.password)
        if (checkPassword === true) {
            const newPassword = await hashPassword(password)
            const value = {password: newPassword, email}
            const user = await User.findByIdAndUpdate(findUser._id, {...value}, {new: true})
            const userData = {
                email: user.email,
                username: username,
                profilePhoto: user.profilePhoto,
                sub: user.sub,
                time_sub: user.time_sub,
                role: user.role,
                created: user.created
            }
            return {user: userData, status: "SUCCESS"}
        } else {
            return {error: "رمز عبور وارد شده مطابقت ندارد!", status: "ERROR"}
        }
    } else {
        const user = await User.findByIdAndUpdate(findUser._id, {...value}, {new: true})
        console.log(user)
        const userData = {
            email: user.email,
            username: username,
            profilePhoto: user.profilePhoto,
            sub: user.sub,
            time_sub: user.time_sub,
            role: user.role,
            created: user.created
        }
        return {user: userData, status: "SUCCESS"}
    }
}

const UsersCount = async () => {
    const usersCount = await User.countDocuments()

    return usersCount
}

const getUsers = async (params) => {
    const usersCount = await UsersCount();
    const page = parseInt(params.page)
    const pageSize = parseInt(params.pageSize)
    const users = await User.find({}).limit(pageSize).skip(page === 1 ? 0 : (page - 1) * pageSize);

    return {users, count: usersCount};
}

const putUser = async (value) => {
    const {userId, values} = value;
    const updateUser = await User.findByIdAndUpdate(userId, {...values}, {new: true})
    return updateUser
}

const getUserId = async (value) =>{
    const userId = (await User.findOne(value))._id

    return userId
}

module.exports = {
    CreateUser,
    userAuthenticating,
    getUserData,
    putUserData,
    UsersCount,
    getUsers,
    putUser,
    getUserId
}