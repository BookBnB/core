#!/bin/bash
./docker/build_production_image.sh
docker tag bookbnb:latest registry.heroku.com/bookbnb-$BRANCH/web
echo "$HEROKU_API_KEY" | docker login --username=_ --password-stdin registry.heroku.com
docker push registry.heroku.com/bookbnb-$BRANCH/web
curl https://cli-assets.heroku.com/install.sh | sh  # install heroku
heroku container:release web -a bookbnb-$BRANCH
