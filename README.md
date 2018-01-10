## Stripe (native) [![Build Status](https://travis-ci.org/benjick/meteor-stripe-native.svg?branch=master)](https://travis-ci.org/benjick/meteor-stripe-native)

Implementing the Stripe API natively in Meteor, no need for wrapAsync. Built in ability to handle webhooks from Stripe however you want to.

This package also includes [Stripe.js](https://stripe.com/docs/stripe.js) and [Stripe Checkout](https://stripe.com/docs/checkout). See bottom of readme under "Client"

See full docs at https://stripe.com/docs/api/node but note some differences 

Improved version of [benick:stripe-native](https://atmospherejs.com/benjick/stripe-native)

## Install

Using Meteor's Package System:

    $ meteor add allerion:stripe-native

## Dependencies

* NPM
  - body-parser

* Atmosphere
  - meteorhacks:picker
  - http
  - templating

## Implemented methods

* Charges
* Refunds
* Customers
* Cards
* Subscriptions (missing tests)
* Plans
* Coupons
* Discounts (missing tests)
* Application fees (missing tests)
* Account (need more tests)
* Tokens
* Invoices (missing tests)

## Differences with the node module

### No callbacks

For example:

#### server-side

```js
Meteor.methods({
  charge: function (token) {
    this.unblock();
    check(token, String);

    try {
      var result = Stripe.charges.create({
        amount: 400,
        currency: 'sek',
        source: token.id,
        description: "Imma chargin' mah lazer"
      });

      // do something with result, save to db maybe?

      return true;
    }
    catch {
      throw new Meteor.Error('payment-failed', 'The payment failed');
    }
  }
});
```

#### client-side

```js
Meteor.call('charge', token, function (error, result) {
  console.log(error);
  console.log(result);
});
```

### Stripe secret key is read from the environment variable STRIPE_SECRET

```js
Stripe.secretKey = process.env.STRIPE_SECRET + ':null';
```

### HTTP doesn't parse params correct, so nested objects is a bit special:

node-stripe:

```js
var Stripe = require("stripe")(
  "sk_test_xxx"
);

Stripe.coupons.update("25OFF", {
  metadata: {key: "value"}
)
```

meteor-stripe-native:

```js
Stripe.coupons.update("25OFF", {
  'metadata[key]': 'value'
})
```

## Client

Stripe.js is now loaded directly from stripe.com and this happens after all other Meteor scripts are loaded. As such, the `Stripe` variable is not immediately available for use so instead, calls need to be deferred until after your Meteor app has started, like so:

```js
Meteor.startup(function() {
    Stripe.setPublishableKey('YOUR_PUBLISHABLE_KEY');
});
```

The same goes for Stripe Checkout, too:

```js
Meteor.startup(function() {
    var handler = StripeCheckout.configure({
    key: 'YOUR_PUBLISHABLE_KEY',
    token: function(token) {}
  });
});
```

## Webhook

The package depends on `meteorhacks:picker` package and npm `body-parser`. All current available webhooks from Stripe are included by default. They are:

* account.external_account.created
* account.external_account.deleted
* account.external_account.updated
* account.updated
* balance.available
* charge.captured
* charge.dispute.closed
* charge.dispute.created
* charge.dispute.funds_reinstated
* charge.dispute.funds_withdrawn
* charge.dispute.updated
* charge.failed
* charge.pending
* charge.refund.updated
* charge.refunded
* charge.succeeded
* charge.updated
* coupon.created
* coupon.deleted
* coupon.updated
* customer.bank_account.deleted
* customer.created
* customer.deleted
* customer.discount.created
* customer.discount.deleted
* customer.discount.updated
* customer.source.created
* customer.source.deleted
* customer.source.expiring
* customer.source.updated
* customer.subscription.created
* customer.subscription.deleted
* customer.subscription.trial_will_end
* customer.subscription.updated
* customer.updated
* file.created
* invoice.created
* invoice.payment_failed
* invoice.payment_succeeded
* invoice.sent
* invoice.upcoming
* invoice.updated
* invoiceitem.created
* invoiceitem.deleted
* invoiceitem.updated
* order.created
* order.payment_failed
* order.payment_succeeded
* order.updated
* order_return.created
* payout.canceled
* payout.created
* payout.failed
* payout.paid
* payout.updated
* plan.created
* plan.deleted
* plan.updated
* product.created
* product.deleted
* product.updated
* recipient.created
* recipient.deleted
* recipient.updated
* review.closed
* review.opened
* sigma.scheduled_query_run.created
* sku.created
* sku.deleted
* sku.updated
* source.canceled
* source.chargeable
* source.failed
* source.transaction.created
* transfer.created
* transfer.reversed
* transfer.updated

By default the package will not do anything for any webhook that comes in. You can override this behaviour by setting the relevant webhook(s) in the Stripe object to a specific function. This will only make any sense on the server since webhooks are server-side not client-side. It should be done inside a Meteor.startup call so that the Stripe object exists.

```js
Meteor.startup(function(){

  Stripe.webhooks["plan.created"] = function(data){
    // Do your magic here
  };

});
```

Or if you want to override multiples at the same time and you are using Underscore.js you can try something like this:

```js
Meteor.startup(function(){

  _.extend(Stripe.webhooks,{
    
    "plan.created" : function(data){
      // Do your magic here
    },
    "plan.deleted" : function(data){
      // Do your magic here
    },

    ...

  });

});
```

The code for the webhooks system comes from [The Meteor Chef](https://themeteorchef.com/tutorials/handling-webhooks), but is slightly modified to reduce the codebase. Please read that tutorial to understand how it works, although you do not need to write any of the code mentioned in it to make the webhooks system work.

