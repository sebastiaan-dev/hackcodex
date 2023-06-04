# HackCodeX-Python-API

Basic Restful Flask API to communicate the the front-end.

Instead of using pip to install packages run:
poetry add <package-name>

Then build with:
poetry build

Run the code with:
poetry run python src/main.py

Example curls:
* curl http://localhost:5000/query -d "data=Who is my son?" -X PUT
* curl http://localhost:5000/query -d "data=Who is my daughter?" -X PUT
* curl http://localhost:5000/query


* curl http://localhost:5000/query -d "data=Who is Kristina?" -X PUT
* curl http://localhost:5000/add -d "data=James Anderson has a sister Kristina Anderson, age 70. She visits often and likes baking." -X PUT
* curl http://localhost:5000/add