'use strict';
var assert = require('assert');
var userService = require('../services/user.service');
var authService = require('../services/auth.service');
var faker = require('faker');
var userModel = require('./user.model.spec');
var tokenTDUser = 'NodeUserTOKEN';

describe.only('flow', function () {
  it('create user', function (done) {
    var data = {
      firstName : userModel.firstName,
      lastName : userModel.lastName
    };
    
    userService.create(data, tokenTDUser, function (err, data) {
      if (err) {
        return done(err);
      }
      userModel.userId = data.userId;
      assert(data.userId);
      return done();
    });
  });

  it('create user auth', function (done) {
    var credentialFake = {
      userId: userModel.userId,
      email: userModel.email,
      password: userModel.password,
      rememberMe: true
    };
    
    authService.authLocal(credentialFake, tokenTDUser, function (err, data) {
      if (err) {
        return done(err);
      }
      userModel.token = data.token;
      assert(data.token);
      return done();
    });
  });
});