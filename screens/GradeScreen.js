// screens/GradeScreen.js
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { Card } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';

export default function GradeScreen({ route }) {
  const { className, code, teacher } = route.params;

  // Example grade data
  const gradeData = {
    midterm: {
      earned: 25,
      max: 30,
      percentage: '83.3%'
    },
    final: {
      earned: 35,
      max: 40,
      percentage: '87.5%'
    },
    attendance: {
      earned: 8,
      max: 10,
      percentage: '80%'
    },
    laboratory: {
      earned: 18,
      max: 20,
      percentage: '90%'
    }
  };

  const totalEarned = Object.values(gradeData).reduce((sum, item) => sum + item.earned, 0);
  const totalMax = Object.values(gradeData).reduce((sum, item) => sum + item.max, 0);
  const totalPercentage = ((totalEarned / totalMax) * 100).toFixed(1);

  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.summaryCard}>
        <Text style={styles.className}>{className}</Text>
        <Text style={styles.classInfo}>{code} • {teacher}</Text>
        <View style={styles.totalGradeContainer}>
          <Text style={styles.totalGrade}>{totalPercentage}%</Text>
          <Text style={styles.totalPoints}>
            {totalEarned}/{totalMax} оноо
          </Text>
        </View>
      </Card>

      <View style={styles.gradesContainer}>
        <GradeItem
          title="Явц дундын шалгалт"
          icon="pencil-alt"
          earned={gradeData.midterm.earned}
          max={gradeData.midterm.max}
          percentage={gradeData.midterm.percentage}
        />
        <GradeItem
          title="Улирлын шалгалт"
          icon="file-alt"
          earned={gradeData.final.earned}
          max={gradeData.final.max}
          percentage={gradeData.final.percentage}
        />
        <GradeItem
          title="Ирц"
          icon="user-check"
          earned={gradeData.attendance.earned}
          max={gradeData.attendance.max}
          percentage={gradeData.attendance.percentage}
        />
        <GradeItem
          title="Лаборатори"
          icon="flask"
          earned={gradeData.laboratory.earned}
          max={gradeData.laboratory.max}
          percentage={gradeData.laboratory.percentage}
        />
      </View>
    </ScrollView>
  );
}

const GradeItem = ({ title, icon, earned, max, percentage }) => (
  <Card containerStyle={styles.gradeCard}>
    <View style={styles.gradeHeader}>
      <View style={styles.gradeIcon}>
        <FontAwesome5 name={icon} size={16} color="#3498db" />
      </View>
      <Text style={styles.gradeTitle}>{title}</Text>
    </View>
    <View style={styles.gradeDetails}>
      <Text style={styles.gradePoints}>{earned}/{max}</Text>
      <Text style={styles.gradePercentage}>{percentage}</Text>
    </View>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  className: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  classInfo: {
    fontSize: 15,
    color: '#666',
    marginBottom: 16,
  },
  totalGradeContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  totalGrade: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#822321',
  },
  totalPoints: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  gradesContainer: {
    padding: 10,
  },
  gradeCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  gradeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  gradeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  gradeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  gradeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  gradePoints: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  gradePercentage: {
    fontSize: 16,
    color: '#822321',
    fontWeight: '600',
  },
});