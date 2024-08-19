import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Image, ScrollView} from 'react-native';

 import {TodoItem, EmpItem, AppContaioner} from '../../components'; 
import EStyleSheet from 'react-native-extended-stylesheet';
import { COLORS } from '../../constant';
import Icon from 'react-native-vector-icons/MaterialIcons';



const popularCourses = [
  { id: '1', title: 'Just-fit workout', image: { uri: 'https://example.com/path/to/just-fit-workout.png' } },
  { id: '2', title: 'Flow Yoga', image: { uri: 'https://example.com/path/to/flow-yoga.png' } },
  { id: '3', title: 'Bend and Kick', image: { uri: 'https://example.com/path/to/bend-and-kick.png' } },
];

const popularTeachers = [
  { id: '1', name: 'Miranda Jones', role: 'Hot Yoga Teacher', followers: '1.2k', rating: 4.5, image: { uri: 'https://example.com/path/to/miranda-jones.png' } },
  { id: '2', name: 'Michael Carl', role: 'Running Coach', followers: '348', rating: 4.0, image: { uri: 'https://example.com/path/to/michael-carl.png' } },
  { id: '3', name: 'Kate Lewis', role: 'Yoga Teacher', followers: '30k', rating: 5.0, image: { uri: 'https://example.com/path/to/kate-lewis.png' } },
  { id: '4', name: 'Kelly Wong', role: 'Hot Yoga Teacher', followers: '2.2k', rating: 4.5, image: { uri: 'https://example.com/path/to/kelly-wong.png' } },
];

const sliderImages = [
  { id: '1', image: { uri: 'https://example.com/path/to/slider-image1.png' } },
  { id: '2', image: { uri: 'https://example.com/path/to/slider-image2.png' } },
  { id: '3', image: { uri: 'https://example.com/path/to/slider-image3.png' } },
];

const Home = () => {
  

  return (
    <ScrollView>
    <View style={styles.container}>
    <Text style={styles.searchTitle}>Search</Text>
    <View style={styles.searchBar}>
      <Icon name="search-outline" size={20} color="#aaa" />
      <TextInput placeholder="Search" style={styles.searchInput} />
    </View>
    <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.sliderContainer}
      >
        {sliderImages.map(image => (
          <Image
            key={image.id}
            source={image.image}
            style={styles.sliderImage}
          />
        ))}
      </ScrollView>

    <Text style={styles.sectionTitle}>Popular Courses</Text>
    <FlatList
      data={popularCourses}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.courseCard}>
          <Image source={item.image} style={styles.courseImage} />
          <Text style={styles.courseTitle}>{item.title}</Text>
        </View>
      )}
    />

    <Text style={styles.sectionTitle}>Popular Teachers</Text>
    <FlatList
      data={popularTeachers}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.teacherCard}>
          <View style={styles.teacherInfo}>
            <Image source={item.image} style={styles.teacherImage} />
            <View>
              <Text style={styles.teacherName}>{item.name}</Text>
              <Text style={styles.teacherRole}>{item.role}</Text>
            </View>
          </View>
          <View style={styles.teacherStats}>
            <Text style={styles.followers}>{item.followers} followers</Text>
            <Text style={styles.rating}>★ {item.rating}</Text>
          </View>
        </View>
      )}
    />
  </View>
  </ScrollView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  sliderContainer: {
    height: 200,
    marginBottom: 20,
  },
  sliderImage: {
    width: 300,
    height: '70%',
    borderRadius: 8,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  courseCard: {
    marginRight: 16,
    alignItems: 'center',
  },
  courseImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  courseTitle: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: 'bold',
  },
  searchTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10
  },
  teacherCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  teacherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teacherImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  teacherName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  teacherRole: {
    fontSize: 14,
    color: '#666',
  },
  teacherStats: {
    alignItems: 'flex-end',
  },
  followers: {
    fontSize: 14,
    color: '#666',
  },
  rating: {
    fontSize: 14,
    color: '#ff9900',
  },
});

export default Home;
