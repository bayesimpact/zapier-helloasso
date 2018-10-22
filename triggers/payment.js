const triggerPayment = (z, bundle) => {
  const responsePromise = z.request({
    method: 'GET',
    params: {
      from: bundle.inputData.from,
      to: bundle.inputData.to,
    },
    url: 'https://api.helloasso.com/v3/organizations/' +
      `${bundle.inputData.organization}/campaigns/${bundle.inputData.campaign}/payments.json`,
  })
  return responsePromise.
    then(response => JSON.parse(response.content)).
    then(jsonResponse => jsonResponse.resources)
}

module.exports = {
  display: {
    description: 'Triggers on a new payment.',
    label: 'Get Payment',
  },
  key: 'payment',
  noun: 'Payment',
  operation: {
    inputFields: [
      {
        dynamic: 'organization.id',
        key: 'organization',
        label: 'Organization',
        required: true,
      },
      {
        dynamic: 'campaign.id',
        key: 'campaign',
        label: 'Campaign',
        required: true,
      },
      {
        helpText: 'Minimum date of payment creation',
        key: 'from',
        label: 'From',
      },
      {
        helpText: 'Maximum date of payment creation',
        key: 'to',
        label: 'To',
      },
    ],
    perform: triggerPayment,
  },
}
