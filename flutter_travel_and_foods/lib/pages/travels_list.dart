import 'package:flutter/material.dart';
import 'package:flutter_travel_and_foods/graphql_client.dart';
import 'package:flutter_travel_and_foods/pages/travel_show.dart';
import 'package:graphql/client.dart';

class TravelsList extends StatefulWidget {
  @override
  _TravelsListState createState() => _TravelsListState();
}

class _TravelsListState extends State<TravelsList> {
  QueryResult response;

  @override
  void initState() {
    super.initState();
    fetchCountries();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Viagens"),),
      // floatingActionButton: FloatingActionButton(),
      body: Padding(
        padding: const EdgeInsets.all(10.0),
        child: buildCountries(),
      ),
    );
  }

  Widget buildCountries() {
    if (response == null) {
      return Text("Carregando...");
    }

    if (response.hasErrors) {
      return Text("Aconteceu um erro");
    }
    List allCountries = response.data['allCountries'] as List;

    return ListView.builder(
      itemCount: allCountries.length,
      itemBuilder: (BuildContext context, int index) {
        final country = allCountries[index];
        return ListTile(
          title: Text(country["name"]),
          trailing: Icon(Icons.arrow_forward_ios),
          onTap: () => navigateTravelShow(context, country["id"]),
        );
      },
    );
  }

  fetchCountries() async {
    const String allCountries = r'''
      query {
        allCountries {
          id
          name
        }
      }
    ''';

    final QueryOptions options = QueryOptions(document: allCountries);
    final QueryResult result = await GraphQL().client.query(options);

    setState(() {
      response = result;
    });
  }

  navigateTravelShow(BuildContext context, String id) {
    Navigator.push(context, MaterialPageRoute(
      builder: (context) => TravelShow(id: id)
    ));
  }
}