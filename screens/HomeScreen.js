import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { classesData } from '../data/data';
import moment from 'moment';
import 'moment/locale/mn';

moment.locale('mn');
const daysOfWeek = ['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба', 'Ням'];

export default function HomeScreen({ navigation }) {
  const [expandedDay, setExpandedDay] = useState(null);
  const toggleDay = (day) => setExpandedDay(expandedDay === day ? null : day);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Хичээлийн Хуваарь</Text>
      {daysOfWeek.map((day) => {
        const dayClasses = classesData.filter((cls) =>
          cls.schedule.some((schedule) => schedule.day === day)
        );
        return (
          <View key={day} style={styles.daySection}>
            <TouchableOpacity style={styles.dayHeader} onPress={() => toggleDay(day)}>
              <Text style={styles.dayTitle}>
                {day} {expandedDay === day ? '▲' : '▼'}
              </Text>
            </TouchableOpacity>
            {expandedDay === day && (
              <View style={styles.dayContent}>
                {dayClasses.length > 0 ? (
                  dayClasses.map((cls) => (
                    <View key={cls.id} style={styles.scheduleCard}>
                      <Text style={styles.scheduleName}>{cls.name}</Text>
                      <Text style={styles.scheduleTime}>
                        {cls.schedule
                          .filter((s) => s.day === day)
                          .map((s) => s.time)
                          .join(', ')}
                      </Text>
                      <Text style={styles.scheduleInstructor}>Багш: {cls.instructor}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noClassesText}>Хичээл байхгүй</Text>
                )}
              </View>
            )}
          </View>
        );
      })}

      <Text style={styles.sectionTitle}>Ангиуд</Text>
      {classesData.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          onPress={() => navigation.navigate('Class', { classId: item.id })}
        >
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardSubtitle}>
            {item.schedule.map((s) => `${s.day} ${s.time}`).join(', ') || 'Хуваарь байхгүй'}
          </Text>
        </TouchableOpacity>
      ))}
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
    fontSize: 28,
    fontWeight: '700',
    color: '#a44a53',
    textAlign: 'center',
    marginBottom: 20,
  },
  daySection: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  dayHeader: {
    padding: 12,
    backgroundColor: '#a44a53',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  dayContent: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  scheduleCard: {
    backgroundColor: '#f2f2f2',
    borderLeftColor: '#a44a53',
    borderLeftWidth: 5,
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  scheduleName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  scheduleTime: {
    fontSize: 16,
    color: '#666',
    marginVertical: 4,
  },
  scheduleInstructor: {
    fontSize: 14,
    color: '#999',
  },
  noClassesText: {
    fontSize: 16,
    color: '#555',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    color: '#a44a53',
    marginTop: 30,
    marginBottom: 10,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderColor: '#a44a53',
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
});