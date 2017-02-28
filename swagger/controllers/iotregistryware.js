'use strict';

var url = require('url');

var iotregistryware = require('./iotregistrywareService');

module.exports.generateRegisterNameSigPOST = function generateRegisterNameSigPOST (req, res, next) {
  iotregistryware.generateRegisterNameSigPOST(req.swagger.params, res, next);
};

module.exports.generateRegisterSpecSigPOST = function generateRegisterSpecSigPOST (req, res, next) {
  iotregistryware.generateRegisterSpecSigPOST(req.swagger.params, res, next);
};

module.exports.generateRegisterThingSigPOST = function generateRegisterThingSigPOST (req, res, next) {
  iotregistryware.generateRegisterThingSigPOST(req.swagger.params, res, next);
};

module.exports.ownerGET = function ownerGET (req, res, next) {
  iotregistryware.ownerGET(req.swagger.params, res, next);
};

module.exports.ownerNamePOST = function ownerNamePOST (req, res, next) {
  iotregistryware.ownerNamePOST(req.swagger.params, res, next);
};

module.exports.specGET = function specGET (req, res, next) {
  iotregistryware.specGET(req.swagger.params, res, next);
};

module.exports.specPOST = function specPOST (req, res, next) {
  iotregistryware.specPOST(req.swagger.params, res, next);
};

module.exports.thingGET = function thingGET (req, res, next) {
  iotregistryware.thingGET(req.swagger.params, res, next);
};

module.exports.thingPOST = function thingPOST (req, res, next) {
  iotregistryware.thingPOST(req.swagger.params, res, next);
};
