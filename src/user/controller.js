const User = require('../user/modal');

exports.getAllUser = (req, res, next) => {
  User.findAll({
    where: { role: 'student' },
  })
    .then((users) => {
      if (users.length) {
        res.status(200).json({ message: 'students fetch successfully', users });
      } else {
        res.status(404).json({ message: 'user not found' });
      }
    })
    .catch((e) => {
      res.status(500).json({ message: 'something went wrong', error: e });
    });
};
