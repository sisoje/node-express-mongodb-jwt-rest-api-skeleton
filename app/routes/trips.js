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
  '/:userid',
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
  '/:userid',
  requireAuth,
  AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  controller.getAdminItems
)

router.delete(
  '/:id',
  requireAuth,
  AuthController.roleAuthorization(['user', 'admin']),
  trimRequest.all,
  controller.deleteItem
)

router.patch(
  '/:id',
  requireAuth,
  AuthController.roleAuthorization(['user', 'admin']),
  trimRequest.all,
  validate.tripItem,
  controller.updateItem
)

module.exports = router
