FROM mongo:4.0.8

#COPY misha_fake_data.json /docker-entrypoint-initdb.d/
COPY 001_create_flaskuser.js /docker-entrypoint-initdb.d/
COPY 002_insert_misha_fake_data.js /docker-entrypoint-initdb.d/
