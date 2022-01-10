<p align="center">
	<a href="https://eostarter.org">
		<img src="./docs/images/logo-words.png" width="300">
	</a>
</p>
<br/>

# EOS Token Sale Platform

![](https://img.shields.io/github/license/eostarter/token-sale-platform) ![](https://img.shields.io/badge/code%20style-standard-brightgreen.svg) ![](https://img.shields.io/badge/%E2%9C%93-collaborative_etiquette-brightgreen.svg) ![](https://img.shields.io/twitter/follow/eostarter1.svg?style=social&logo=twitter) ![](https://img.shields.io/github/forks/eostarter/token-sale-platform?style=social)

A decentralized Token Sale platform, which allows users to set up a token sale, determine the token sale parameters, and deploy their sale onto the EOS Mainnet.

- [Project Description](#project-description)
- [Technical Stack](#technical-stack)
- [Installation](#installation)
  - [Before you Start](#before-you-start)
  - [Project Setup](#project-setup)
  - [Quick Start](#quick-start)
- [File Structure](#file-structure)
- [Technical Specs](#technical-spec)
  - [Infrastructure Diagram](#infrastructure-diagram)
  - [Technologies Specification](#technologies-specification)
    - [Kubernetes Cluster](#kubernetes-cluster)
    - [Web Application](#web-application)
    - [Backend](#backend)
      - [Hasura GraphQL Server](#hasura-graphql-server)
      - [Hapi REST Server](#hapi-rest-server)
    - [EOSIO Blockchain Technology Integration](#eosio-blockchain-technology-integration)
- [Contributing](#contributing)
- [About EOStarter](#about-eostarter)

# Project Description

The token sale platform is a decentralized application based on two open-source smart contracts that any project can use to sell its tokens.

- [**Token Pool Contract**](https://github.com/eostarter/eostarter.token-smart-contract)

- [**Token Sale Contract**](https://github.com/eostarter/eostarter.sale-smart-contract)

We are proposing to develop a Token Sale Smart Contract system that allows for the crowdsourcing of projects through a token sale that can be configured with different parameters like staking capabilities, whitelisting requirements, token vesting, etc.

You can read about the full specs of these 2 Smart Contracts here:

[TOKENSALE PLATFORM - SCOPE OF WORK](https://medium.com/eostarter/eostarter-tokensale-platform-scope-of-work-4cb153c33ab6)

# Technical Features

This project features all the latest technologies and practices in the industry.

- Hapi
- Hasura
- React
- Kubernetes
- EOSIO

# Installation

## Before you Start

Somethings you need before getting started:

- [git](https://git-scm.com/)
- [node.js](https://nodejs.org/es/)
- [docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/)

## Project Setup

Copy the `.env.example` then update the environment variables according to your needs.

```
cp .env.example .env
```

## Quick Start

1.  Clone this repo using `git clone --depth=1 https://github.com/eostarter/token-sale-platform.git <YOUR_PROJECT_NAME>`.
2.  Move to the appropriate directory: `cd <YOUR_PROJECT_NAME>`.
3.  Run `make run` in order to start the project using docker compose.

At this point you can navigate to `http://localhost:3000`.

# File Structure

Within the download you'll find the following directories and files:

```
├── docs
│   └── img
├── hapi
│   └── src
│       ├── config
│       ├── routes
│       ├── services
│       └── utils
├── hasura
│   ├── metadata
│   ├── migrations
│   └── seeds
├── kubernetes
├── utils
├── wallet
│   └── config
└── webapp
    ├── public
    └── src
        ├── components
        │   ├── Footer
        │   ├── Header
        │   ├── Loader
        │   ├── Message
        │   ├── PageTitle
        │   └── Sidebar
        ├── config
        ├── context
        ├── gql
        ├── language
        ├── layouts
        │   └── Dashboard
        ├── routes
        │   ├── About
        │   ├── Help
        │   ├── Home
        │   └── Route404
        ├── theme
        └── utils
```

# Technical Documentation

## Infrastructure Diagram

<p align="center">
  <img src="docs/img/infra.svg" />
</p>

## Technologies Specification

### Kubernetes Cluster

At EOS Costa Rica, we build software taking into consideration a high availability of the services that can integrate it. For this, we use [Kubernetes](https://kubernetes.io/), that allows to isolate modules in order to reduce the risk of the system collapsing. In the image above, you can take a look at our representation of the architecture we consider is more suitable to our purposes.

### Web Application

This FullStack Template uses [React.js](https://reactjs.org) as a Frontend Library which together with other tools like [Apollo Client](https://www.apollographql.com/docs/react/), [GraphQL](https://graphql.org/) and [Material UI](https://material-ui.com/) brings a robust solution for building Single Page Applications out of the box.

### Backend

#### Hasura GraphQL Server

[Hasura](https://hasura.io/) technology maps a [PostgreSQL](https://www.postgresql.org/) database and provides a reliable and easy-to-use API. This allow us to focus on critical features of our projects, delegating mechanic CRUD (Create, Read, Update, Delete) operations.
Hasura also enables custom REST handling capabilities with the possibility to integrate a custom REST server, that way we can extend the base CRUD functionalities and build custom business logic.

#### Hapi REST Server

We need to handle REST custom requests coming from the Hasura GraphQL server. For this, we use [hapi.dev](https://hapi.dev/), which is a simple and easy-to-use backend framework.

### EOSIO Blockchain Technology Integration

As a company that delivers EOSIO blockchain-based solutions, we build a template which contains EOSIO integration, specifically [eosjs](https://github.com/EOSIO/eosjs). This allow us to iterate quickly over the more challenging features of our projects.

# Contributing

Please Read EOS Costa Rica's [Open Source Contributing Guidelines](https://developers.eoscostarica.io/docs/open-source-guidelines).

Please report bugs big and small by [opening an issue](https://github.com/eostarter/token-sale-platform/issues)

## About EOSstarter

<p align="center">
	<a href="https://eostarter.org">
		<img src="./docs/images/logo-words.png" width="300">
	</a>
</p>
<br/>

EOStarter is a Community-powered Incubator and Gamified Launchpad for EOS projects.

[eostarter.org](https://eostarter.org/)
