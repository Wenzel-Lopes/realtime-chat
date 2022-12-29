#!/bin/bash
docker login -u wenzellopes -p Darth@31101998

docker stop hungry_davinci
docker pull wenzellopes/docker-chat

docker run -d -p 3000:3000 wenzellopes/docker-chat