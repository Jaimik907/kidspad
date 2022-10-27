const bcrypt = require('bcrypt');
const User = require('../user/modal');

// constants
// const userType = ['Admin', 'Super Admin', 'User'];

exports.login = (req, res, next) => {
  const user_email = req.body.email;
  const user_password = req.body.password;

  User.findOne({
    where: { email: user_email },
  })
    .then((user) => {
      if (!user) {
        res.status(400).json({ message: 'User not found!' });
        return;
      }

      // compare the password with db
      bcrypt
        .compare(user_password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            res.status(401).json({ message: 'Password not match' });
            return;
          }

          const { name, email, phone, role } = user;

          res.status(200).json({
            name,
            email,
            phone,
            role,
          });
        })
        .catch((e) => {
          res.status(500).json({ message: 'Something went wrong', err: e });
        });
    })
    .catch((e) => {
      res.status(500).json({ message: 'Something went wrong', err: e });
    });
};

exports.register = (req, res, next) => {
  const { name, email, phone, role, password } = req.body;

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        res.status(409).json({ message: 'User already exist' });
        return;
      }

      bcrypt
        .hash(password, 12)
        .then((encryptedPassword) => {
          return User.create({
            name,
            password: encryptedPassword,
            phone,
            role,
            email,
          });
        })
        .then(() => {
          res.status(200).json({ message: 'user created successfully' });
        })
        .catch((e) => {
          res
            .status(500)
            .json({ message: 'something went wrong', error: e.errors });
        });
    })
    .catch((e) =>
      res.status(500).json({ message: 'something went wrong', error: e })
    );
};
