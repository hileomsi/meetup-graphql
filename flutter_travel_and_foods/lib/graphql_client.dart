import 'package:graphql/client.dart';

class GraphQL {
  GraphQLClient client;

  GraphQL() {
    final HttpLink httpLink = HttpLink(
      uri: 'https://api.graph.cool/simple/v1/cjab55e1y058o0142o5nagl70',
    );

    final GraphQLClient client = GraphQLClient(
      cache: InMemoryCache(),
      link: httpLink,
    );

    this.client = client;
  }
}