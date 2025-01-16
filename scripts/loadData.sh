#/bin/bash

if [[ $# -gt 0 ]]; then
    echo "Got $1"
else
    echo "Provide development or production"
    exit
fi

str="./.env."
str+="$1"

node  --env-file="$str" scripts/loadData.js

