import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../app/navigation";

import { useGetTopHeadlinesQuery } from "../../../shared/api/newsApi";

export default function NewsList() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { data, isLoading, error } = useGetTopHeadlinesQuery({ page: 1 });

  if (isLoading)
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  if (error)
    return (
      <Text style={{ padding: 16, color: "red" }}>
        Ошибка загрузки новостей
      </Text>
    );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={data?.articles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("NewsDetails", { article: item })}
            style={{
              padding: 16,
              backgroundColor: "#eee",
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              {item.title}
            </Text>
            <Text numberOfLines={2} style={{ marginTop: 4, color: "#555" }}>
              {item.description}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
