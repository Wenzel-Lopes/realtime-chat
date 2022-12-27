#!/bin/bash
docker login -u wenzellopes -p Darth@31101998

docker container stop 7f231a3884c0
docker pull wenzellopes/docker-chat-final

docker run -d -p 3000:3000 wenzellopes/docker-chat