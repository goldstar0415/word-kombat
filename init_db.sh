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
    if [ -f words.sql ]; then
      psql -U $user_name $db_name < $db_name.dump.sql
    fi
else
    echo "Database $db_name failed to initialize"
fi