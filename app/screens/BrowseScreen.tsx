import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

export default function BrowseScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Browse Artists</Text>
        <TextInput 
          style={styles.searchInput}
          placeholder="Search artists..."
        />
      </View>

      <FlatList
        data={artists}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.artistCard}
            onPress={() => navigation.navigate('ArtistProfile', { id: item.id })}
          >
            <Image
              source={{ uri: item.avatar }}
              style={styles.avatar}
              contentFit="cover"
            />
            <View style={styles.artistInfo}>
              <Text style={styles.artistName}>{item.name}</Text>
              <Text style={styles.artistTitle}>{item.title}</Text>
              <View style={styles.skillsContainer}>
                {item.skills.map(skill => (
                  <View style={styles.skillBadge} key={skill}>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
} 