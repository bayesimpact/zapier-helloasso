# HelloAsso Zapier Integration

A [Zapier](https://zapier.com) app that make it possible to trigger on new
[HelloAsso](https://www.helloasso.com) payments.

This app has been built by [Bayes Impact](https://www.bayesimpact.org) which is
not related to HelloAsso nor Zapier.

## Usage

You first need to get an API key from HelloAsso
[here](https://dev.helloasso.com/), then you can create a Zap that uses
HelloAsso as trigger. For now the app is invite only, click
[here](https://zapier.com/platform/public-invite/7180/3ce87fa187c1a5b87eb1fe389130e97e/)
to get an invite. When requested by Zapier to connect an account, use the
username/API key as username/password.

## Develop & Test

In order to develop & test this project, we made it easy using docker-compose.
Install docker and docker-compose if you do not have it.

It should also work to install Zapier tools locally although we do not use that
workflow. If you do then run:

```sh
npm install -g zapier-platform-cli
yarn install
```

and in the commands below, you can drop the `docker-compose ... zapier` parts.

### Linting

Checking for lint errors is done with:
```sh
docker-compose run --rm zapier npm run lint
```

### Testing

To test the code, you will need to have access to Bayes Impact payments and to
our username / API key, otherwise make sure to update the `ORGANIZATION_ID` in
the test files.

Using your username & API key, you can test using:
```sh
docker-compose run -e TEST_USERNAME="<username>" -e TEST_PASSWORD="<API key>" --rm zapier zapier test
```

## Deploying

To deploy a new version you need to create your deploy key:
```sh
docker-compose run --rm zapier bash
zapier login
cat ~/.zapierrc
```

Keep the deploy key found above in the `ZAPIER_DEPLOY_KEY` env var, then run:

```sh
docker-compose run --rm zapier zapier push
```
