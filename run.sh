#!/usr/bin/env bash

if [ "$1" = "rebuild" ]; then
    docker build --tag=nest-typegoose-api -f ./Dockerfile .
fi

if [ "$1" = "nest" ]; then
    docker build --tag=nest-typegoose-api -f ./Dockerfile .
fi

docker-compose up -d nest
