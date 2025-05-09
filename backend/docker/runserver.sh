#!/bin/bash
# if any of the commands in your code fails for any reason, the entire script fails
set -o errexit
# fail exit if one of your pipe command fails
set -o pipefail
# exits if any of your variables is not set
set -o nounset

export BACKEND_HOST="${BACKEND_HOST}"
export BACKEND_PORT="${BACKEND_PORT}"


python manage.py runserver "$BACKEND_HOST":"$BACKEND_PORT"

exec "$@"