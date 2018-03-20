# bloomburger <sub><sup>| The blogs you care about, and nothing more. </sup></sub>

--------------------------------------------------------------------------------

[![version](http://img.shields.io/badge/version-v0.0.1-blue.svg)](#) [![versioning](http://img.shields.io/badge/versioning-semver-blue.svg)](http://semver.org/) [![branching](http://img.shields.io/badge/branching-github%20flow-blue.svg)](https://guides.github.com/introduction/flow/)
[![Circle CI](https://circleci.com/gh/jjwyse/bloomburger.svg?style=shield)](https://circleci.com/gh/jjwyse/bloomburger)


## Overview
Delivers the blogs you care about, right to your front door.


## Installation
Install `node` and `npm`. `node` version must  be >= `v6.3.0`.

```bash
# Install all necessary npm packages:
$ npm i
```

Next, if you don't already have postgres installed locally, you will need to do that.  Once you have postgres up and running, create a new database for bloomburger to use.  Lastly, create a new user in postgres and grant all privileges on your database to this user.  To point the bloomburger app at this postgres instance, set the following environment variables based on how your above setup.

```bash
export BLOOMBURGER_DB_HOST=localhost
export BLOOMBURGER_DB_PORT=5432
export BLOOMBURGER_DB_USER=
export BLOOMBURGER_DB_PASSWORD=
```

## Configuration
You will need to create a `private.key` file that goes in your bloomburger root folder, with the private key you want to use. This private key will be used to sign authentication requests using JWT.

To run `bloomburger`, you will need to set the following environment variables.

```bash
export BLOOMBURGER_GITHUB_CLIENT_SECRET=
export BLOOMBURGER_GITHUB_CLIENT_ID=
export BLOOMBURGER_REDIRECT_URL=http://localhost:3003/login
```

## Running
```bash
# Start application...
$ npm start
```
