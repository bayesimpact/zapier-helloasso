const triggerOrg = z => {
  const responsePromise = z.request({
    url: 'https://api.helloasso.com/v3/organizations.json',
  })
  return responsePromise.then(response => JSON.parse(response.content).resources)
}

module.exports = {
  display: {
    description: 'The only purpose of this trigger is to populate the dropdown list ' +
      "of organizations in the UI, thus, it's hidden.",
    hidden: true,
    label: 'Get Organization',
  },
  key: 'organization',
  noun: 'Organization',
  operation: {
    inputFields: [],
    perform: triggerOrg,
  },
}
