
Npm.depends({
  'body-parser': '1.18.2'
});

Package.describe({
  name: 'dancaws:stripe-native',
  version: '0.1.4',
  summary: 'Implements Stripe API as a Meteor package sans Node. Built-in webhooks management.',
  git: 'https://github.com/KaitaniLabs/meteor-stripe-native.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('client/js.html', 'client');
  api.addFiles([
    'server/init.js',
    'server/methods/charges.js',
    'server/methods/refunds.js',
    'server/methods/customers.js',
    'server/methods/cards.js',
    'server/methods/subscriptions.js',
    'server/methods/plans.js',
    'server/methods/coupons.js',
    'server/methods/discounts.js',
    'server/methods/invoices.js',
    'server/methods/invoiceItems.js',
    'server/methods/disputes.js',
    'server/methods/transferReversals.js',
    'server/methods/recipients.js',
    'server/methods/applicationFees.js',
    'server/methods/applicationFeeRefunds.js',
    'server/methods/accounts.js',
    'server/methods/balance.js',
    'server/methods/events.js',
    'server/methods/tokens.js',
    'server/methods/bitcoinReceivers.js',
    'server/methods/fileUploads.js',
    'server/methods/discounts.js',
    'server/api/api.js',
    'server/api/handler.js',
    'server/api/index.js'

  ], 'server');
  api.use('ecmascript@0.9.0','server');
  api.use('http','server');
  api.use('meteorhacks:picker@1.0.3','server');
  api.use('templating','client');
  api.export('Stripe','server');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use(['allerion:stripe-native']);
  api.addFiles('tests/client.js','client');
  api.addFiles([
    'tests/init.js',
    'tests/charges.js',
    'tests/refunds.js',
    'tests/customers.js',
    'tests/cards.js',
    'tests/subscriptions.js',
    'tests/plans.js',
    'tests/coupons.js',
    'tests/discounts.js',
    'tests/accounts.js',
  ],'server');
});

