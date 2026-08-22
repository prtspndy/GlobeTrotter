const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

router.get('/', activityController.getActivities);
router.get('/:id', activityController.getActivityById);

module.exports = router;
