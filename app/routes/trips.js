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
  AuthController.roleAuthorization(['user', 'manager', 'admin']),
  trimRequest.all,
  validate.tripItem,
  controller.createMyItem
)

router.post(
  '/:userId',
  requireAuth,
  AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  validate.tripItem,
  validate.createOther,
  controller.createAdminItem
)

router.get(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['user', 'manager', 'admin']),
  trimRequest.all,
  controller.getMyItems
)

router.get(
  '/:userId',
  requireAuth,
  AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  validate.getOther,
  controller.getAdminItems
)

router.delete(
  '/:id',
  requireAuth,
  AuthController.roleAuthorization(['user', 'manager', 'admin']),
  trimRequest.all,
  validate.deleteItem,
  controller.deleteItem
)

router.patch(
  '/:id',
  requireAuth,
  AuthController.roleAuthorization(['user', 'manager', 'admin']),
  trimRequest.all,
  validate.updateItem,
  controller.updateItem
)

module.exports = router
