#! /bin/sh

for file in initial_data_*.json
do
  curl -X POST -H "Content-Type: application/json" -d @$file http://localhost:8000/api/product/
done