import 'package:flutter/material.dart';
import 'package:flutter_travel_and_foods/graphql_client.dart';
import 'package:graphql/client.dart';

class TravelShow extends StatefulWidget {
  final String id;

  TravelShow({ this.id });

  @override
  _TravelShowState createState() => _TravelShowState();
}

class _TravelShowState extends State<TravelShow> {
  QueryResult response;

  @override
  void initState() {
    super.initState();
    getCountry(widget.id);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Detalhes"),),
      body: Padding(
        padding: const EdgeInsets.all(10.0),
        child: buildCountry(),
      ),
    );
  }

  Widget buildCountry() {
    if (response == null) {
      return Text("Carregando...");
    }

    if (response.hasErrors) {
      return Text("Aconteceu um erro");
    }

    return Container(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(
            response.data['Country']['name'],
            style: TextStyle(
              fontSize: 32,
              fontWeight: FontWeight.bold
            ),
          ),
          SizedBox(height: 20,),
          Text(response.data['Country']['description']),
          SizedBox(height: 15,),
          // ListView(
          //   children: <Widget>[
          //     ListTile(title: Text("Burgao"),),
          //     ListTile(title: Text("Burgao"),),
          //     ListTile(title: Text("Burgao"),)
          //   ],
          // )
        ],
      )
    );
  }

  getCountry(String id) async {
    const String getCountryQuery = r'''
      query($id: ID!) {
        Country(id: $id) {
          name
          description
          foods {
            id
            name
            scores
          }
        }
      }
    ''';

    final QueryOptions options = QueryOptions(
      document: getCountryQuery,
      variables: <String, String>{
        "id": id,
      },
    );
    final QueryResult result = await GraphQL().client.query(options);

    setState(() {
      response = result;
    });
  }
}