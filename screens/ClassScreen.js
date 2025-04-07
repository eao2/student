import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { classesData } from '../data/data';

export default function ClassScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const classId = route.params?.classId;

  if (!classId) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          No class selected. Please go back and select a class.
        </Text>
      </View>
    );
  }

  const classData = classesData.find((c) => c.id === classId);

  if (!classData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Class data not found. Please check the class selection.
        </Text>
      </View>
    );
  }

  const goToAttendance = () => {
    navigation.navigate('Attendance', { classId });
  };

  const goToGrades = () => {
    navigation.navigate('Grade', { classId });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{classData.name}</Text>
      <Text style={styles.instructor}>Багш: {classData.instructor}</Text>
      
      <View style={styles.card}>
        <Text style={styles.subtitle}>Хичээлийн Хуваарь:</Text>
        {classData.schedule.map((s, index) => (
          <Text key={index} style={styles.scheduleItem}>• {s.day} - {s.time}</Text>
        ))}
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button} onPress={goToAttendance}>
          <Text style={styles.buttonText}>Ирц харах</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToGrades}>
          <Text style={styles.buttonText}>Дүн харах</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#FDFDFD',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#a44a53',
    textAlign: 'center',
    marginBottom: 10,
  },
  instructor: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderColor: '#a44a53',
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  scheduleItem: {
    fontSize: 16,
    marginVertical: 4,
    color: '#444',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#a44a53',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});