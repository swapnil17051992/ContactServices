const express = require('express');

const router = express.Router();


  //@route GET '/api/contacts'
  //@desc  Get all User Contact
  //@access public
router.get('/', (req, res) => {
  
    res.send('Get all Contact User');
  });


  //@route   Post '/api/contacts'
  //@desc    Add New Contact
  //@access  public

  router.post('/', (req, res) => {
  
    res.send('Add new Contact');
  });

  
  //@route   PUT '/api/contacts'
  //@desc   Update contact
  //@access  public

  router.put('/:id', (req, res) => {
  
    res.send('Update Contact');
  });

  
  //@route   Delete '/api/contacts'
  //@desc    Delete existing contact
  //@access  public

  router.delete('/:id', (req, res) => {
  
    res.send('Delete Contact');
  });



  module.exports=router;