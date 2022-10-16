#!/bin/sh

if [ -d $(which python3) ]; then
    echo Cannot find python3
    exit 1
fi

if ! [ -d venv ]; then
    python3 -m venv venv
    source ./venv/bin/activate
    python3 -m pip install -r requirements.txt
else
    source ./venv/bin/activate
fi

if [[ $(netstat -tl | grep 27017) ]]; then
    mlaunch stop
fi

if [ -d ./data ]; then
    rm -rf ./data
fi

mlaunch \
    --replicaset \
    --nodes 3 \
    --name replset \
    --sharded mongo0 mongo1 mongo2 \
    --csrs \
    --config 3 \
    --dir ./data 

mlaunch list
sleep 2

echo "
use admin
db.createUser(
  {
    user: \"user\",
    pwd: \"Debug123\",
    roles: [ { role: \"userAdminAnyDatabase\", db: \"admin\" } ]
  }
)" | mongo --port 27017
