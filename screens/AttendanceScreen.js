import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { classesData } from '../data/data';

export default function AttendanceScreen() {
  const route = useRoute();
  const { classId } = route.params;
  const classData = classesData.find((c) => c.id === classId);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{classData.name}</Text>
      <Text style={styles.section}>Ирцийн Мэдээлэл</Text>
      <View style={styles.attendanceCard}>
        <Text style={styles.label}>Лекцийн Ирц:</Text>
        <Text style={styles.value}>{classData.attendance.lecture}</Text>
      </View>
      <View style={styles.attendanceCard}>
        <Text style={styles.label}>Лабораторийн Ирц:</Text>
        <Text style={styles.value}>{classData.attendance.laboratory}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#FDFDFD',
  },
  title: {
    fontSize: 26,
    color: '#a44a53',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    fontSize: 22,
    color: '#333',
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  attendanceCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#a44a53',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    color: '#555',
    fontWeight: '700',
  },
});