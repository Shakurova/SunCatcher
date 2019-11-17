db.createUser(
    {
        user: "flaskuser",
        pwd: "asdf",
        roles:[
            {
                role: "dbOwner",
                db:   "flaskdb"
            }
        ]
    }
);