#!/bin/bash

API_HOST=localhost:8000

IMG_DIR=$(echo $BASH_SOURCE | sed 's/addImages.sh//g')

for f in $IMG_DIR*;
do
    if [[ $f == $0 ]]; then # ignore script
        continue
    fi
    # $f looks like ./path/to/images/img.jpg. need filename w/o path
    img=$(echo $f | rev | cut -d'/' -f1 | rev)
    echo Adding $img to database
    curl -v \
        -X POST \
        --data-binary "@$f" \
        "http://$API_HOST/api/image/$img"
    echo
done
