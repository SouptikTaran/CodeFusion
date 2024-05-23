const { userSchema } = require('../schemas/userValidator')
const User = require('../models/user')


module.exports.Signin = async (req, res) => {
    res.status(200).render("SignIn")
}

module.exports.SignUser = async (req, res) => {
    const { username, email, password } = req.body
   //Created an object for checking if the data is valid or not 
    const data = {
        username,
        email,
        password
    }

    //checking the input type of the given data
    let validation = userSchema.safeParse(data)

    if (!validation.success) {
        return res.status(400).render('badRequest')
    }

    //check if user exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).render('badRequest'); 
    }

    await User.create({
        username,
        email,
        password
    });
    try {
        const token = await User.matchPasswordandGenerateToken(email, password);
        return res.cookie("token" , token).redirect('/')
    } catch (error) {
        console.log(error)
    }
    

    return res.status(200).redirect("/")

}

module.exports.Login = async (req, res) => {
    res.status(200).render("Login")
}

module.exports.LoginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordandGenerateToken(email, password);
        return res.cookie("token", token).redirect("/");
    } catch (error) {
        console.log(error)
        return res.render('badRequest');
    }
}

module.exports.logout = async (req, res) => {
    res.status(200).clearCookie("token").redirect("/");
}