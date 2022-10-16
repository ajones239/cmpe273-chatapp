#!/bin/sh

if [ -d $(which python3) ]; then
    echo Cannot find python3
    exit 1
else
    echo "Found python3"
fi

if ! [ -d venv ]; then
    echo "venv not found, creating virtual env..."
    python3 -m venv venv
    source ./venv/bin/activate
    echo "installing requirements..."
    python3 -m pip install -r requirements.txt
else
    echo "venv found, activating..."
    source ./venv/bin/activate
fi

if [[ $(netstat -tl | grep 27017) ]]; then
    echo "mongodb is running, stopping cluster..."
    mlaunch stop
fi

if [ -d ./data ]; then
    echo "clearing old cluster data..."
    rm -rf ./data
fi

echo "launching mongodb cluster..."
mlaunch \
    --replicaset \
    --nodes 3 \
    --name replset \
    --sharded mongo0 mongo1 mongo2 \
    --csrs \
    --config 3 \
    --dir ./data 

echo "mongodb cluster successfully launched"
mlaunch list
sleep 2

echo "adding user..."
echo "
use admin
db.createUser(
  {
    user: \"user\",
    pwd: \"Debug123\",
    roles: [ { role: \"userAdminAnyDatabase\", db: \"admin\" } ]
  }
)" | mongo --port 27017
