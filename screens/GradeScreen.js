import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { classesData } from '../data/data';

export default function GradeScreen() {
  const route = useRoute();
  const classId = route.params?.classId;
  const classData = classesData.find((c) => c.id === classId);

  if (!classData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Class data not found. Please go back and select a class.
        </Text>
      </View>
    );
  }

  const total = Object.values(classData.grades).reduce((a, b) => a + b, 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{classData.name}</Text>
      <Text style={styles.section}>Дүнгийн Мэдээлэл</Text>
      {Object.entries(classData.grades).map(([key, value]) => {
        const max = getMaxGrade(key);
        const progressValue = max > 0 ? Math.min(Math.max(value / max, 0), 1) : 0;
        return (
          <View key={key} style={styles.gradeRow}>
            <Text style={styles.gradeLabel}>{translateGradeKey(key)}: </Text>
            <Text style={styles.gradeValue}>
              {value} / {max}
            </Text>
            <ProgressBar 
              progress={progressValue}
              color="#a44a53"
              style={styles.progressBar}
            />
          </View>
        );
      })}
      <Text style={styles.total}>Нийт Оноо: {total} / 100</Text>
    </ScrollView>
  );
}

const getMaxGrade = (key) => {
  switch (key) {
    case 'attendance':
      return 10;
    case 'laboratory':
      return 10;
    case 'midterm':
      return 20;
    case 'final':
      return 30;
    case 'assignment':
      return 30;
    default:
      return 0;
  }
};

const translateGradeKey = (key) => {
  switch (key) {
    case 'attendance':
      return 'Ирц';
    case 'laboratory':
      return 'Лаборатори';
    case 'midterm':
      return 'Явцын шалгалт';
    case 'final':
      return 'Финал шалгалт';
    case 'assignment':
      return 'Бие даалт';
    default:
      return key;
  }
};

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
  },
  gradeRow: {
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderColor: '#a44a53',
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  gradeLabel: {
    fontSize: 18,
    color: '#333',
    marginBottom: 4,
  },
  gradeValue: {
    fontSize: 18,
    color: '#555',
    fontWeight: '700',
    marginBottom: 8,
  },
  progressBar: {
    marginTop: 8,
    width: '100%',
    height: 10,
    borderRadius: 5,
  },
  total: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginTop: 30,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});