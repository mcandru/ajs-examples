# Movie Watchlist

Design and implement this Movie Watchlist API.

### Setup

1. `npm install`
2. Import the Postman collection to test the API
3. Ensure that a MongoDB database is running on port 27017. You can spin one up by running:
4. `npm run dev`

```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

### Instructions

1. Create the model(s) needed to store user and movie the watchlist data needed for the API.
2. Implement the endpoints in this file with calls to the database. [find()](<https://mongoosejs.com/docs/api/model.html#Model.find()>), [create()](https://mongoosejs.com/docs/models.html#constructing-documents), and [findById()](<https://mongoosejs.com/docs/api/model.html#Model.findById()>) may come in useful in your implementation.
3. Add error handling and validation as needed.

### Resources

If you need recollection of how to create schemas and models in Mongoose, you can refer to the [Mongoose tutorial](https://www.mongodb.com/docs/drivers/node/current/integrations/mongoose-get-started/#perform-crud-operations) in the MongoDB docs.
