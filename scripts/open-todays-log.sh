#!/bin/bash

log_file_name=`date +"%Y-%m-%d".log`
cd ..
full_path="$PWD/server/.logs/${log_file_name}"

if [ -z $1 ]
then
    sudo nano $full_path
else
    nano $full_path
fi



