# Movie Watchlist

Design and implement this Movie Watchlist API.

### Setup

1. Install dependencies: `npm install`
2. Start MongoDB on port 27017. If you haven't got a MongoDB container already, run:
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo
   ```
3. Import the Postman collection to test the API
4. Start the development server: `npm run dev`

### Your Task

Complete the following steps to implement the Movie Watchlist API:

1. **Create Mongoose Models**
   - Create a `models` folder in your project root
   - Create a model file in the folder for any model that you wish to define
   - Define Mongoose schemas and models for the collections (see Models section below for required properties)

2. **Implement API Endpoints**
   - Complete the endpoint implementations with database operations
   - Useful Mongoose methods: [find()](<https://mongoosejs.com/docs/api/model.html#Model.find()>), [create()](https://mongoosejs.com/docs/models.html#constructing-documents), and [findById()](<https://mongoosejs.com/docs/api/model.html#Model.findById()>)

3. **Add Error Handling and Validation**
   - Handle database errors appropriately
   - Validate incoming request data

### Models

A `movie` should have the following properties:

- `title`
- `year`
- `watched`
- `rating`

A `user` should have the following properties:

- `name`
- `email`

### Resources

If you need recollection of how to create schemas and models in Mongoose, you can refer to the [Mongoose tutorial](https://www.mongodb.com/docs/drivers/node/current/integrations/mongoose-get-started/#perform-crud-operations) in the MongoDB docs.
