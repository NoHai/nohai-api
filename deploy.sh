#!/bin/bash

#Get servers list
set -f
string=$DEPLOY_SERVER
array=(${string//,/ })

echo "Deploying information to EC2 and Gitlab"

echo "Create ENV file"
cat > env.list <<EOF
NOHAI_CUSTOMER_SERVICE_EMAIL=$NOHAI_CUSTOMER_SERVICE_EMAIL
NOHAI_FIREBASE_PRIVATE_KEY_ID=$NOHAI_FIREBASE_PRIVATE_KEY_ID
NOHAI_FIREBASE_PRIVATE_KEY="$NOHAI_FIREBASE_PRIVATE_KEY"
NOHAI_FIREBASE_CLIENT_EMAIL=$NOHAI_FIREBASE_CLIENT_EMAIL
NOHAI_FIREBASE_CLIENT_ID=$NOHAI_FIREBASE_CLIENT_ID
NOHAI_JWT_SECRET="$NOHAI_JWT_SECRET"
NOHAI_PORT=$NOHAI_PORT
NOHAI_SENDGRID_API_KEY=$NOHAI_SENDGRID_API_KEY
TYPEORM_CONNECTION=$TYPEORM_CONNECTION
TYPEORM_DATABASE=$TYPEORM_DATABASE
TYPEORM_ENTITIES="$TYPEORM_ENTITIES"
TYPEORM_ENTITIES_DIR="$TYPEORM_ENTITIES_DIR"
TYPEORM_HOST=$TYPEORM_HOST
TYPEORM_LOGGING=$TYPEORM_LOGGING
TYPEORM_MIGRATIONS="$TYPEORM_MIGRATIONS"
TYPEORM_MIGRATIONS_DIR="$TYPEORM_MIGRATIONS_DIR"
TYPEORM_MIGRATIONS_RUN="$TYPEORM_MIGRATIONS_RUN"
TYPEORM_PASSWORD=$TYPEORM_PASSWORD
TYPEORM_PORT=$TYPEORM_PORT
TYPEORM_SEEDS="$TYPEORM_SEEDS"
TYPEORM_SEEDS_DIR="$TYPEORM_SEEDS_DIR"
TYPEORM_SUBSCRIBERS_DIR="$TYPEORM_SUBSCRIBERS_DIR"
TYPEORM_SYNCHRONIZE=$TYPEORM_SYNCHRONIZE
TYPEORM_USERNAME=$TYPEORM_USERNAME
EOF

#Iterate servers for deploy and pull last commit
for i in "${!array[@]}"; do
	echo "Deploy project on server ${array[i]}"
	echo "Stop docker container"
	ssh -o BatchMode=yes -o StrictHostKeyChecking=no ubuntu@${array[i]} "docker stop nohai-api || true && docker rm nohai-api || true && rm -rf /var/www/nohai/*"
	echo "Copy files"
	ls "$PWD"
	rsync -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" -r --exclude "node_modules" --progress "$PWD"/ ubuntu@${array[i]}:/var/www/nohai 
	echo "Run docker"
	ssh -o BatchMode=yes -o StrictHostKeyChecking=no ubuntu@${array[i]} /bin/bash <<EOF
	cd /var/www/nohai
	docker build -t nohai-api-image .
	
	docker run -d -it -p 8081:5000 --env-file env.list --name nohai-api nohai-api-image
EOF
done
