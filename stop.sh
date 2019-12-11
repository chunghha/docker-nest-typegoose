#!/usr/bin/env bash

docker stop $(docker ps -aqf "name=nest")
