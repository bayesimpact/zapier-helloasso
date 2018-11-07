const formatDate = date => {
  return new Date(date).toISOString().substr(0, '2018-11-07T20:20:31'.length)
}

const triggerPayment = (z, bundle) => {
  const responsePromise = z.request({
    method: 'GET',
    // TODO(pascal): Ask a param to sort by most recent first to HelloAsso API
    // owners and enable it when bundle.meta.frontend is true.
    params: bundle.meta && bundle.meta.frontend ? {} : {
      from: formatDate(new Date() - 1000 * 60 * 60 * 12),
    },
    url: 'https://api.helloasso.com/v3/organizations/' +
      `${bundle.inputData.organization}/campaigns/${bundle.inputData.campaign}/payments.json`,
  })
  return responsePromise.then(response => JSON.parse(response.content).resources)
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
    ],
    perform: triggerPayment,
  },
}
