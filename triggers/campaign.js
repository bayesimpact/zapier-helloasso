const triggerCampaign = (z, bundle) => {
  const responsePromise = z.request({
    url: `https://api.helloasso.com/v3/organizations/${bundle.inputData.organization}/campaigns.json`,
  })
  return responsePromise.
    then(response => JSON.parse(response.content)).
    then(jsonResponse => jsonResponse.resources)
}

module.exports = {
  display: {
    description: 'The only purpose of this trigger is to populate the dropdown list ' +
      "of campaigns in the UI, thus, it's hidden.",
    hidden: true,
    label: 'Get Campaign',
  },
  key: 'campaign',
  noun: 'Campaign',
  operation: {
    inputFields: [{
      dynamic: 'organization.id',
      key: 'organization',
      label: 'Organization',
      required: true,
    }],
    perform: triggerCampaign,
  },
}
