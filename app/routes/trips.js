const controller = require('../controllers/trips')
const validate = require('../controllers/trips.validate')
const AuthController = require('../controllers/auth')
const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['user']),
  trimRequest.all,
  validate.tripItem,
  controller.createMyItem
)

router.post(
  '/:id',
  requireAuth,
  AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  validate.tripItem,
  controller.createAdminItem
)

router.get(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['user']),
  trimRequest.all,
  controller.getMyItems
)

router.get(
  '/:id',
  requireAuth,
  AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  controller.getAdminItems
)

module.exports = router