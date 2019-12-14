const { GraphQLServer } = require('graphql-yoga');

/**
|--------------------------------------------------
| Data
|--------------------------------------------------
*/
const countries = [
  {
    id: 1,
    name: 'Brazil',
    description: 'Eum dicta fugit dolores excepturi. Quia mollitia eligendi provident iusto similique facilis pariatur eaque placeat.',
  },
  {
    id: 2,
    name: 'Spain',
    description: 'Nesciunt sunt dignissimos cumque quo quia illo voluptates.',
  },
  {
    id: 3,
    name: 'France',
    description: 'Consequatur itaque reprehenderit quae et ipsam est et sunt.',
  }
];

const foods = [
  {
    id: 1,
    name: 'Baião de Dois',
    scores: 9,
    countryId: 1,
  },
  {
    id: 2,
    name: 'Batata frita',
    scores: 7,
    countryId: 1,
  },
  {
    id: 3,
    name: 'Salada de Fruta',
    scores: 10,
    countryId: 1,
  },
];

/**
|--------------------------------------------------
| Helpers
|--------------------------------------------------
*/

const Repositories = {
  Countries: {
    create: (country) => {
      const [last] = countries.sort((a, b) => a.id > b.id ? -1 : 1);
      country.id = last ? last.id + 1 : 1;
    
      countries.push(country);
    
      return country;
    }
  },
  Foods: {
    create: (food) => {
      const [last] = foods.sort((a, b) => a.id > b.id ? -1 : 1);
      food.id = last ? last.id + 1 : 1;
    
      foods.push(food);
    
      return food;
    }
  }
};

/**
|--------------------------------------------------
| Schema
|--------------------------------------------------
*/
const typeDefs = `
# type ExampleType {
#   id: ID!
#   name: String
#   year: Int
#   scores: Float
#   isActived: Boolean!
#   children: [ChildrenExampleType!]!
# }

# type ChildrenExampleType {
#   id: ID!
#   name: String
# }

# # Cade o tipo Date?

  input FoodInput {
    name: String!
    scores: Int!
  }

  type Country {
    id: ID!
    name: String!
    description: String!
    foods: [Food!]!
    allScores: Int
  }

  type Food {
    id: ID!
    name: String!
    scores: Int!
  }

  type Query {
    findAllContries: [Country!]!
    allScores: Int!
    getCountry(id: ID!): Country!
  }

  type Mutation {
    createContry(
      name: String!,
      description: String!,
      foods: [FoodInput!]!
    ): Country!
  }
`;

/**
|--------------------------------------------------
| Resolvers
|--------------------------------------------------
*/
const resolvers = {
  /**
  |--------------------------------------------------
  | Queries
  |--------------------------------------------------
  */
  Query: {
    findAllContries: (root, params, context, info) => countries,
    allScores: (root, params, context, info) => {
      return foods.reduce((previous, current) => previous + current.scores, 0);
    },
    getCountry: (root, params, context, info) => {
      return countries.find(el => el.id == params.id);
    },
  },
  /**
  |--------------------------------------------------
  | Mutations
  |--------------------------------------------------
  */
  Mutation: {
    createContry: (root, params, context, info) => {
      const countryCreated = Repositories.Countries.create({
        name: params.name,
        description: params.description,
      });
      const foodsCreated = params.foods
        .map(food => Repositories.Foods.create({ ...food, countryId: countryCreated.id }));

      return countryCreated;
    },
  },
  /**
  |--------------------------------------------------
  | Country
  |--------------------------------------------------
  */
  Country: {
    allScores: (root, params, context, info) => {
      return foods
        .filter(food => food.countryId === root.id)
        .reduce((previous, current) => previous + current.scores, 0);
    },
    foods: (root, params, context, info) => {
      return foods.filter(food => food.countryId === root.id);
    }
  }
};

/**
|--------------------------------------------------
| Server
|--------------------------------------------------
*/
const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log('Server is running on localhost:4000'));