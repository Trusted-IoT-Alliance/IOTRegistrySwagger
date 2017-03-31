'use strict';

var url = require('url');

var iotregistryware = require('./iotregistrywareService');

module.exports.createRegistrantSig = function createRegistrantSig (req, res, next) {
  iotregistryware.createRegistrantSig(req.swagger.params, res, next);
};

module.exports.generateRegisterSpecSig = function generateRegisterSpecSig (req, res, next) {
  iotregistryware.generateRegisterSpecSig(req.swagger.params, res, next);
};

module.exports.generateRegisterThingSig = function generateRegisterThingSig (req, res, next) {
  iotregistryware.generateRegisterThingSig(req.swagger.params, res, next);
};

module.exports.registrantGET = function registrantGET (req, res, next) {
  iotregistryware.registrantGET(req.swagger.params, res, next);
};

module.exports.registrantPOST = function registrantPOST (req, res, next) {
  iotregistryware.registrantPOST(req.swagger.params, res, next);
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
