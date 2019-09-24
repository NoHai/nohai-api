#!/bin/bash

#Get servers list
set -f
string=$DEPLOY_SERVER
array=(${string//,/ })

echo "Deploying information to EC2 and Gitlab"

#Iterate servers for deploy and pull last commit
for i in "${!array[@]}"; do
	echo "Deploy project on server ${array[i]}"
	echo "Stop docker container"
	ssh -o BatchMode=yes -o StrictHostKeyChecking=no ubuntu@${array[i]} "docker stop nohai-api || true && docker rm nohai-api || true && rm -rf /var/www/nohai/*"
	echo "Copy files"
	scp -r ./ ubuntu@${array[i]}:/var/www/nohai
	echo "Run docker"
	ssh -o BatchMode=yes -o StrictHostKeyChecking=no ubuntu@${array[i]} /bin/bash <<EOF
	cd /var/www/nohai/nohai-api
	docker build -t nohai-api-image .
	
	docker run -d -it -p 8081:5000 \
	--env NOHAI_CUSTOMER_SERVICE_EMAIL="$NOHAI_CUSTOMER_SERVICE_EMAIL" \
	--env NOHAI_FIREBASE_PRIVATE_KEY="$NOHAI_FIREBASE_PRIVATE_KEY" \
	--env NOHAI_FIREBASE_PRIVATE_KEY_ID="$NOHAI_FIREBASE_PRIVATE_KEY_ID" \
	--env NOHAI_JWT_EXPIRE_IN="$NOHAI_JWT_EXPIRE_IN" \
	--env NOHAI_JWT_SECRET="$NOHAI_JWT_SECRET" \
	--env NOHAI_PORT="$NOHAI_PORT" \
	--env NOHAI_SENDGRID_API_KEY="$NOHAI_SENDGRID_API_KEY" \
	--env TYPEORM_CONNECTION="$TYPEORM_CONNECTION" \
	--env TYPEORM_DATABASE="$TYPEORM_DATABASE" \
	--env TYPEORM_ENTITIES="$TYPEORM_ENTITIES" \
	--env TYPEORM_ENTITIES_DIR="$TYPEORM_ENTITIES_DIR" \
	--env TYPEORM_HOST="$TYPEORM_HOST" \
	--env TYPEORM_LOGGING="$TYPEORM_LOGGING" \
	--env TYPEORM_MIGRATIONS="$TYPEORM_MIGRATIONS" \
	--env TYPEORM_MIGRATIONS_DIR="$TYPEORM_MIGRATIONS_DIR" \
	--env TYPEORM_MIGRATIONS_RUN="$TYPEORM_MIGRATIONS_RUN" \
	--env TYPEORM_PASSWORD="$TYPEORM_PASSWORD" \
	--env TYPEORM_PORT="$TYPEORM_PORT" \
	--env TYPEORM_SEEDS="$TYPEORM_SEEDS" \
	--env TYPEORM_SEEDS_DIR="$TYPEORM_SEEDS_DIR" \
	--env TYPEORM_SUBSCRIBERS_DIR="$TYPEORM_SUBSCRIBERS_DIR" \
	--env TYPEORM_SYNCHRONIZE="$TYPEORM_SYNCHRONIZE" \
	--env TYPEORM_USERNAME="$TYPEORM_USERNAME" \
	--name nohai-api nohai-api-image
EOF
done
