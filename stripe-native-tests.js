// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by stripe-native.js.
import { name as packageName } from "meteor/allerion:stripe-native";

// Write your tests here!
// Here is an example.
Tinytest.add('stripe-native - example', function (test) {
  test.equal(packageName, "stripe-native");
});
