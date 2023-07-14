const User = require('../../models/user');
const { getUser } = require('../../controllers/user/getUser.js');

const createUser = async (user) => {

  try {
    const usuario = await User.findOne({ email: user.email });

    if (usuario) {
      return usuario
    }else{
      const newUser = new User({
        picture: user.picture,
        name: user.given_name,
        surname: user.family_name,
        email: user.email,
        verified: user.email_verified
      });
      const res = await newUser.save();
      return res;
    }
  } catch (error) {
    throw new Error('Error al crear el usuario');
  }
};

module.exports = createUser;
