#!/bin/bash

set -e

BRANCH=master
if [[ $TRAVIS_TAG ]]; then
  STAGE="production"
elif [[ $TRAVIS_TAG == 'development' ]]; then
  STAGE="dev"
fi

if [ -z ${STAGE+x} ]; then
  echo "Not deploying changes";
  exit 0;
fi

echo "Deploying from branch $BRANCH to stage $STAGE"
npm prune --production  #remove devDependencies
sls deploy --stage $STAGE --region $AWS_REGION
