
import { Meteor } from 'meteor/meteor';

const handler = ({ body }) => {
  
	try {

		const { type, data } = body;

		let scenario = Stripe.webhooks[type];
	
		if(scenario && Object.prototype.toString.call(scenario) === "[object Function]"){
			scenario(data);
		}else{
			console.log("ERROR :: target webhook action is not function.");
		}

	} catch (exception) {

		throw new Meteor.Error('500', `[stripeHandler.handler] ${exception}`);

	}

};

export const stripeHandler = (options) => handler(options);




	