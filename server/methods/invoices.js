Stripe.invoices = {};

Stripe.invoices.create = function (object) {
	var options = {
		auth: Stripe.secretKey,
		params: object
	}
	
	return HTTP.call('POST', Stripe.baseUrl + 'invoices', options).data;
}

Stripe.invoices.retrieve = function (id) {
	var options = {
		auth: Stripe.secretKey
	}

	return HTTP.call('GET', Stripe.baseUrl + 'invoices/' + id, options).data;
}

Stripe.invoices.retrieveUpcoming = function (id,object) {
	var options = {
		auth: Stripe.secretKey,
		params: object
	}

	return HTTP.call('GET', Stripe.baseUrl + 'invoices/upcoming?customer=' + id, options).data;
}

Stripe.invoices.update = function (id, object) {
	var options = {
		auth: Stripe.secretKey,
		params: object
	}

	return HTTP.call('POST', Stripe.baseUrl + 'customers/' + id, options).data;

}

Stripe.invoices.pay = function (id) {
	var options = {
		auth: Stripe.secretKey
	}

	return HTTP.call('DELETE', Stripe.baseUrl + 'invoices/' + id + '/pay', options).data;

}

Stripe.invoices.list = function (object) {
	var options = {
		auth: Stripe.secretKey,
		params: object
	}

	return HTTP.call('GET', Stripe.baseUrl + 'invoices', options).data;

}