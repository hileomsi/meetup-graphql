import 'package:flutter/material.dart';
import 'package:flutter_travel_and_foods/graphql_client.dart';
import 'package:flutter_travel_and_foods/pages/travels_list.dart';

void main() => runApp(Application());

class Application extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Viagens e Comidas',
      theme: ThemeData(
        primarySwatch: Colors.purple,
      ),
      home: TravelsList(),
    );
  }
}