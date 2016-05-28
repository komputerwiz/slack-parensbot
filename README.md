# slack-parensbot

A Slack bot to automatically close parentheses, brackets, and braces.

## Setup

1. create a new custom bot integration on your Slack team. You should receive an API token.
2. `npm install`

## Running a server instance

Your Slack integration API token can be provided in one of two ways:

1.  As a command-line option `-k` or `--token`:

        node ./index.js --token=xxxx-xxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxx

2.  As an environment variable `PARENSBOT_SLACK_API_TOKEN`

        export PARENSBOT_SLACK_API_TOKEN=xxxx-xxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxx
        node ./index.js

    If using this method, the server can also be started with the `npm start` script shortcut.

## Running in a Docker Container

Build an instance of the Docker image using the **Dockerfile** in this repo (we'll call it `slack-parensbot` for now)

Run the image, providing the Slack API token as an environment variable.

    docker run -d -e PARENSBOT_SLACK_API_TOKEN=xxxx-xxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxx slack-parensbot
