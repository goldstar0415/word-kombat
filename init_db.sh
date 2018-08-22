#!/bin/sh

db_name=word-kombat
user_name=word_master
user_password=temp

echo "Confirm user $user_name creation"
psql -U postgres -c "CREATE USER \"$user_name\" WITH ENCRYPTED PASSWORD '$user_password';"

echo "Confirm database $db_name creation"
psql -U postgres -c "CREATE DATABASE \"$db_name\" OWNER \"$user_name\";"

if [ $? -eq 0 ]; then
    echo "Database $db_name successfully initialized with owner $user_name"
else
    echo "Database $db_name failed to initialize"
fi