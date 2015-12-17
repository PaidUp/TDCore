
'use strict';
var assert = require('chai').assert
var paymentPlanService = require('../services/paymentPlan.service.js');

var conn = {
  token: 'tdschedule-secret',
  urlPrefix : '/api/v2',
  isHttps: false,
  host: 'localhost',
  port: 9006
};

var result = {};

before(function(done){
  paymentPlanService.init(conn);
  done();
});

describe('payment services test', function () {


  it('create payment plan', function (done) {
    let param = {name:'testName',
      destination:'destinationTest'}
    paymentPlanService.paymentPlanCreate(param, function (err, data) {
      if (err) {
        return done(err);
      }
      result.paymentPlanId = data.paymentPlanId;
      assert.isString(data.paymentPlanId);
      done();
    });
  });

  it('update payment plan', function (done) {
    let param = {paymentPlanId:result.paymentPlanId,
      paymentPlanData: {name:'testName3',
        destination:'destinationTest3'}};
    paymentPlanService.paymentPlanUpdate(param, function (err, data) {
      if (err) {
        return done(err);
      }
      assert.isTrue(data.updated);
      done();
    });
  });

  it('get info payment plan', function (done) {
    paymentPlanService.paymentPlanInfo(result.paymentPlanId, function (err, data) {
      if (err) {
        return done(err);
      }
      assert.isObject(data);
      done();
    });
  });

  it('list payment plan', function (done) {
    paymentPlanService.paymentPlanList({entity_id : result.paymentPlanId}, function (err, data) {
      if (err) {
        return done(err);
      }
      assert.isArray(data);
      assert.equal(1 , data.length)
      done();
    });
  });

  it('create full payment plan', function (done) {
    var param =  {
      name:'testNameFull', destination:'destinationTestFull',
      'metadatas' : [
        {name : 'metaName1' , value : 'metaValue1'} , {name : 'metaName2' , value : 'metaValue2'}],
      'schedules' : [
        {name :'schedule full test 1',
          informations : [
            {name : 'scheduleName1' , value : 'scheduleValue1'},
            {name : 'scheduleName2' , value : 'scheduleValue2'}
          ]
        },
        {name :'schedule full test 2',
          informations : [
            {name : 'scheduleName3' , value : 'scheduleValue3'},
            {name : 'scheduleName4' , value : 'scheduleValue4'}
          ]
        }
      ]}

    paymentPlanService.paymentPlanCreateFull(param, function (err, data) {
      if (err) {
        return done(err);
      }
      result.paymentPlanIdFull = data.paymentPlanId;
      assert.isString(data.paymentPlanId);
      done();
    });
  });

  it('get info full payment plan', function (done) {
    paymentPlanService.paymentPlanInfoFull(result.paymentPlanIdFull, function (err, data) {
      if (err) {
        return done(err);
      }
      assert.isObject(data);
      done();
    });
  });

  it('get info full payment plan by name', function (done) {
    paymentPlanService.paymentPlanInfoFullByName('testNameFull', false, function (err, data) {
      if (err) {
        return done(err);
      }
      assert.isObject(data);
      done();
    });
  });

  it('get info full payment plan by name parse', function (done) {
    paymentPlanService.paymentPlanInfoFullByName('testNameFull', true, function (err, data) {
      if (err) {
        return done(err);
      }
      assert.isObject(data);
      assert.ok(data.destinationId);
      done();
    });
  });

  it('delete payment plan', function (done) {
    paymentPlanService.paymentPlanDelete(result.paymentPlanIdFull, function (err, data) {
      if (err) {
        return done(err);
      }
      assert.isTrue(data.deleted);
      done();
    });
  });

  it('get info full payment plan deleted', function (done) {
    paymentPlanService.paymentPlanInfoFull(result.paymentPlanIdFull, function (err, data) {
      assert.equal('Invalid playment plan id.', err.faultString);
      done();
    });
  });
});