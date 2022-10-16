# Database setup script

Running `setupdb.sh` will

- create a python3 virtual environment if it does not exist and install dependencies
- activate the python3 virtual environment `venv`
- stop existing mongodb clusters and delete data
- launch mongo db cluster
    * 1 mongos router
    * 3 config servers
    * 3 shards, each with 3 replicants
- create default user 
