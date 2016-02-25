#!/bin/sh

# remove all exited containers
echo "Removing all 'Exited' containers..."
docker rm -f $(docker ps --filter 'status=exited' -a) > /dev/null 2>&1

# remove all <none> images
echo "Removing all untagged (<none>) images..."
docker rmi $(docker images | grep "^<none>" | awk "{print $3}") > /dev/null 2>&1

#docker build -t="dockerfile/python" github.com/dockerfile/python
#docker build -t="dockerfile/nodejs" github.com/dockerfile/nodejs

# build and start containers with fig
docker-compose build && docker-compose up
