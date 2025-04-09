// screens/ClassDetailScreen.js (continued)
import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  Platform 
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ClassDetailScreen({ route, navigation }) {
  const { name, code, teacher, scheduleDay, scheduleTime } = route.params;
  const [activeTab, setActiveTab] = useState('lecture');

  const attendanceData = {
    lecture: {
      total: 15,
      present: 13,
      absent: 1,
      excused: 1,
      weeks: [
        {
          weekNumber: 1,
          dates: [
            { date: '2023-09-01', status: 'present', topic: 'Танилцуулга' }
          ]
        },
        {
          weekNumber: 2,
          dates: [
            { date: '2023-09-08', status: 'present', topic: 'Үндсэн ойлголтууд' }
          ]
        },
        {
          weekNumber: 3,
          dates: [
            { date: '2023-09-15', status: 'present', topic: 'Аргачлал' }
          ]
        },
        {
          weekNumber: 4,
          dates: [
            { date: '2023-09-22', status: 'present', topic: 'Шинжилгээ хийх аргууд' }
          ]
        },
        {
          weekNumber: 5,
          dates: [
            { date: '2023-09-29', status: 'absent', topic: 'Платформын онцлогууд' }
          ]
        },
        {
          weekNumber: 6,
          dates: [
            { date: '2023-10-06', status: 'present', topic: 'Нэгдсэн ойлголт' }
          ]
        },
        {
          weekNumber: 7,
          dates: [
            { date: '2023-10-13', status: 'present', topic: 'Хэрэглэгчийн шаардлага' }
          ]
        },
        {
          weekNumber: 8,
          dates: [
            { date: '2023-10-20', status: 'present', topic: 'Функционал бус шаардлага' }
          ]
        },
        {
          weekNumber: 9,
          dates: [
            { date: '2023-10-27', status: 'present', topic: 'Төслийн ерөнхий шаардлага' }
          ]
        },
        {
          weekNumber: 10,
          dates: [
            { date: '2023-11-03', status: 'present', topic: 'Системийн зохиомж' }
          ]
        },
        {
          weekNumber: 11,
          dates: [
            { date: '2023-11-10', status: 'present', topic: 'Дүрслэл ба загварчлал' }
          ]
        },
        {
          weekNumber: 12,
          dates: [
            { date: '2023-11-17', status: 'excused', topic: 'Шинжилгээний аргууд' }
          ]
        },
        {
          weekNumber: 13,
          dates: [
            { date: '2023-11-24', status: 'present', topic: 'Системийн нэгдсэн архитектур' }
          ]
        },
        {
          weekNumber: 14,
          dates: [
            { date: '2023-12-01', status: 'present', topic: 'Туршилт ба хэрэгжүүлэлт' }
          ]
        },
        {
          weekNumber: 15,
          dates: [
            { date: '2023-12-08', status: 'present', topic: 'Төслийн нэгдсэн дүгнэлт' }
          ]
        }
      ]
    },
    laboratory: {
      total: 10,
      present: 9,
      absent: 1,
      excused: 0,
      weeks: [
        {
          weekNumber: 1,
          dates: [
            { date: '2023-09-03', status: 'present', topic: 'Лаб ажил #1: Танилцуулга' }
          ]
        },
        {
          weekNumber: 3,
          dates: [
            { date: '2023-09-17', status: 'present', topic: 'Лаб ажил #2: Хэрэглэгчийн хэрэгцээ' }
          ]
        },
        {
          weekNumber: 5,
          dates: [
            { date: '2023-10-01', status: 'present', topic: 'Лаб ажил #3: Шинжилгээний хэрэгслүүд' }
          ]
        },
        {
          weekNumber: 7,
          dates: [
            { date: '2023-10-15', status: 'present', topic: 'Лаб ажил #4: Шаардлагын баримтжуулалт' }
          ]
        },
        {
          weekNumber: 9,
          dates: [
            { date: '2023-10-29', status: 'present', topic: 'Лаб ажил #5: UML диаграм' }
          ]
        },
        {
          weekNumber: 11,
          dates: [
            { date: '2023-11-12', status: 'present', topic: 'Лаб ажил #6: Прототайп хийх' }
          ]
        },
        {
          weekNumber: 13,
          dates: [
            { date: '2023-11-26', status: 'absent', topic: 'Лаб ажил #7: Дизайн загварууд' }
          ]
        },
        {
          weekNumber: 14,
          dates: [
            { date: '2023-12-03', status: 'present', topic: 'Лаб ажил #8: Шаардлагын дүн шинжилгээ' }
          ]
        },
        {
          weekNumber: 15,
          dates: [
            { date: '2023-12-10', status: 'present', topic: 'Лаб ажил #9: Зохиомжийн загварууд' }
          ]
        },
        {
          weekNumber: 16,
          dates: [
            { date: '2023-12-17', status: 'present', topic: 'Лаб ажил #10: Төслийн хамгаалалт' }
          ]
        }
      ]
    }
  };

  const getAttendancePercentage = (type) => {
    const data = attendanceData[type];
    return Math.round((data.present / data.total) * 100);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'present': return '#2ecc71';
      case 'absent': return '#e74c3c';
      case 'excused': return '#f39c12';
      default: return '#95a5a6';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'present': return 'Ирсэн';
      case 'absent': return 'Тасалсан';
      case 'excused': return 'Чөлөөтэй';
      default: return 'Тодорхойгүй';
    }
  };

  const handleGradePress = () => {
    navigation.navigate('Grade', { 
      className: name, 
      code: code, 
      teacher: teacher
    });
  };

  const renderAttendanceRecords = () => {
    return attendanceData[activeTab].weeks.map((week, index) => (
      <View key={index} style={styles.card}>
        <Text style={styles.weekTitle}>{week.weekNumber}-р долоо хоног</Text>
        {week.dates.map((item, dateIndex) => (
          <View key={dateIndex} style={styles.attendanceItem}>
            <View style={styles.attendanceInfo}>
              <Text style={styles.dateText}>
                {new Date(item.date).toLocaleDateString('mn-MN', { 
                  year: 'numeric', 
                  month: '2-digit', 
                  day: '2-digit' 
                })}
              </Text>
              <Text style={styles.topicText}>{item.topic}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
              <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
            </View>
          </View>
        ))}
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <Text style={styles.className}>{name}</Text>
        <Text style={styles.classCode}>{code}</Text>
        
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <FontAwesome5 name="user" size={16} color="#822321" />
            <Text style={styles.infoText}>{teacher}</Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome5 name="calendar-alt" size={16} color="#822321" />
            <Text style={styles.infoText}>{scheduleDay}</Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome5 name="clock" size={16} color="#822321" />
            <Text style={styles.infoText}>{scheduleTime}</Text>
          </View>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.gradeButton} 
        onPress={handleGradePress}
      >
        <FontAwesome5 name="chart-bar" size={18} color="white" />
        <Text style={styles.gradeButtonText}>Үнэлгээ харах</Text>
      </TouchableOpacity>

      <View style={styles.tabContainer}>
        {['lecture', 'laboratory'].map((tab) => (
          <TouchableOpacity 
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab === 'lecture' ? 'Лекц' : 'Лаборатори'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.statsCard}>
        <Text style={styles.attendancePercent}>
          {getAttendancePercentage(activeTab)}%
        </Text>
        
        <View style={styles.statsGrid}>
          {[
            { label: 'Нийт', value: attendanceData[activeTab].total },
            { label: 'Ирсэн', value: attendanceData[activeTab].present, color: '#2ecc71' },
            { label: 'Тасалсан', value: attendanceData[activeTab].absent, color: '#e74c3c' },
            { label: 'Чөлөөтэй', value: attendanceData[activeTab].excused, color: '#f39c12' }
          ].map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={[styles.statValue, stat.color && { color: stat.color }]}>
                {stat.value}
              </Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {renderAttendanceRecords()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  card: {
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
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  classCode: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 15,
    color: '#444',
  },
  gradeButton: {
    backgroundColor: '#822321',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  gradeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f3f5',
    borderRadius: 16,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#822321',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: 'white',
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
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
  attendancePercent: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#822321',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
  },
  weekTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#822321',
    marginBottom: 16,
  },
  attendanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },
  dateText: {
    fontSize: 15,
    color: '#666',
    marginBottom: 4,
  },
  topicText: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  statusText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
});