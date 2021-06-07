#! /bin/sh

curl -X POST -H "Content-Type: application/json" -d @update_test.json http://localhost:8000/api/product/1
