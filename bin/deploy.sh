#!/bin/bash

set -e

BRANCH=${TRAVIS_BRANCH:-$(git rev-parse --abbrev-ref HEAD)}
STAGE="dev"

if [ -z ${STAGE+x} ]; then
  echo "Not deploying changes";
  exit 0;
fi

echo "Deploying from branch $BRANCH to stage $STAGE"
#npm prune --production  #remove devDependencies
sls deploy -v --stage $STAGE --region $AWS_REGION
