var extend = require('util')._extend;
var AWS = require('aws-sdk');
var CfnLambda = require('cfn-lambda');

var CognitoIdentity = new AWS.CognitoIdentity({apiVersion: '2014-06-30'});

var defaults = {
  returnPhysicalId: 'IdentityPoolId',
  downcase: false,
  api: CognitoIdentity,
  forceBools: [
    'AllowUnauthenticatedIdentities'
  ]
};

var Delete = CfnLambda.SDKAlias(extend(defaults, {
  method: 'deleteIdentityPool',
  ignoreErrorCodes: [404],
  keys: ['IdentityPoolId']
}));

var Update = CfnLambda.SDKAlias(extend(defaults, {
  method: 'updateIdentityPool'
}));

var Create = CfnLambda.SDKAlias(extend(defaults, {
  method: 'createIdentityPool'
}));

exports.handler = CfnLambda({
  Create: Create,
  Update: Update,
  Delete: Delete,
  SchemaPath: [__dirname, 'schema.json']
});
