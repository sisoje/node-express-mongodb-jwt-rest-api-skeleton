const model = require('../models/trip')
const { matchedData } = require('express-validator')
const utils = require('../middleware/utils')
const db = require('../middleware/db')


/**
 * Gets all items from database
 */
const getAllItemsFromDB = async (userId) => {
  return new Promise((resolve, reject) => {
    model.find(
      {
        userId: userId
      },
      null,
      {
        sort: {
          createdAt: 1
        }
      },
      (err, items) => {
        if (err) {
          reject(utils.buildErrObject(422, err.message))
        }
        resolve(items)
      }
    )
  })
}

/********************
 * Public functions *
 ********************/

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

exports.createMyItem = async (req, res) => {
  try {
    var userId = req.user._id
    req = matchedData(req)
    req.userId = userId
    res.status(201).json(await db.createItem(req, model))
  } catch (error) {
    utils.handleError(res, error)
  }
}

exports.createAdminItem = async (req, res) => {
  try {
    var userId = req.id
    req = matchedData(req)
    req.userId = userId
    res.status(201).json(await db.createItem(req, model))
  } catch (error) {
    utils.handleError(res, error)
  }
}

exports.getMyItems = async (req, res) => {
  try {
    res.status(200).json(await getAllItemsFromDB(req.user._id))
  } catch (error) {
    utils.handleError(res, error)
  }
}

exports.getAdminItems = async (req, res) => {
  try {
    res.status(200).json(await getAllItemsFromDB(req.id))
  } catch (error) {
    utils.handleError(res, error)
  }
}
