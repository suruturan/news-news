import React from "react";
import { View, Text, ScrollView, Image } from "react-native";

export default function NewsDetails({ route }) {
  const { article } = route.params;

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      {article.urlToImage && (
        <Image
          source={{ uri: article.urlToImage }}
          style={{ width: "100%", height: 200, borderRadius: 8 }}
        />
      )}

      <Text style={{ fontSize: 22, fontWeight: "700", marginTop: 12 }}>
        {article.title}
      </Text>

      <Text style={{ color: "#777", marginVertical: 8 }}>
        {article.author} — {article.publishedAt}
      </Text>

      <Text style={{ fontSize: 16 }}>{article.content}</Text>
    </ScrollView>
  );
}
