 const express = require('express');

  const router = express.Router();

  //@route Post '/api/users'
  //@desc  register user
  //@access public

  router.post('/', (req, res) => {
  
    res.send('Register a User');
  });

  module.exports = router;