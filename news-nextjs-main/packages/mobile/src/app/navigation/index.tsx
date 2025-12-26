import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import NewsList from "../../features/news-list/ui/NewsList";
import NewsDetails from "../../features/news-details/ui/NewsDetails";

export type RootStackParamList = {
  NewsList: undefined;
  NewsDetails: { article: any };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="NewsList"
          component={NewsList}
          options={{ title: "Новости" }}
        />

        <Stack.Screen
          name="NewsDetails"
          component={NewsDetails}
          options={{ title: "Детали" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
