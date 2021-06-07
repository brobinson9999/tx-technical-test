#! /bin/sh

#curl -X DELETE http://localhost:8000/api/product/19

curl -X PATCH -H "Content-Type: application/json" -d @update_test.json http://localhost:8000/api/product/2
