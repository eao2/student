// screens/HomeScreen.js
import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  RefreshControl,
  Dimensions
} from 'react-native';
import { Card } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [activeDay, setActiveDay] = useState('Да');

  const classes = [
    {
      id: '1',
      name: 'Програм хангамжийн шаардлагын шинжилгээ болон зохиомж',
      code: 'CS301',
      teacher: 'Д.Золжаргал',
      scheduleDay: 'Даваа',
      scheduleTime: '8:20-9:50',
      attendance: '85%',
      type: 'лекц'
    },
    {
      id: '2',
      name: 'Мобайл програмчлал',
      code: 'CS302',
      teacher: 'Ц.Солонгоо',
      scheduleDay: 'Мягмар',
      scheduleTime: '10:00-11:30',
      attendance: '90%',
      type: 'лекц'
    },
    // Add more classes as needed
  ];

  const weekDays = ['Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя', 'Ня'];

  const scheduleData = {
    'Да': [
      { time: '8:20-9:50', className: 'Програм хангамжийн шаардлагын шинжилгээ болон зохиомж', type: 'лекц', room: 'ШМТДС 809', teacher: 'Д.Золжаргал' },
      { time: '10:00-11:30', className: 'Мобайл програмчлал', type: 'лекц', room: 'ШМТДС 712', teacher: 'Ц.Солонгоо' },
      { time: '11:40-13:10', className: 'Цахим аюулгүй байдал', type: 'лаборатор', room: 'ШМТДС 913', teacher: 'н.Чулуунтулга' },
      { time: '14:00-15:40', className: 'Бакалаврын ахисан түвшний төсөл I', type: 'лаборатор', room: 'ШМТДС 905', teacher: 'Н.Анхбаяр' },
    ],
    'Мя': [
      { time: '8:20-9:50', className: 'Мобайл програмчлал', type: 'лаборатор', room: 'ШМТДС 912', teacher: 'Ц.Солонгоо' },
      { time: '10:00-11:30', className: 'Магадлал ба статистик', type: 'лекц', room: 'ШМТДС 809', teacher: 'Б.Санчир' },
      { time: '11:40-13:10', className: 'Цахим аюулгүй байдал', type: 'лекц', room: 'ШМТДС 712', teacher: 'н.Чулуунтулга' },
    ],
    'Лх': [
      { time: '8:20-9:50', className: 'Хиймэл оюун ухааны үндэс ба машин сургалт', type: 'лекц', room: 'ШМТДС 602', teacher: 'Н.Анхбаяр' },
      { time: '10:00-11:30', className: 'Компьютерийн сүлжээ', type: 'лекц', room: 'ШМТДС 712', teacher: 'н.Чулуунтулга' },
      { time: '11:40-13:10', className: 'Хиймэл оюун ухааны үндэс ба машин сургалт', type: 'лаборатор', room: 'ШМТДС 912', teacher: 'Н.Анхбаяр' },
    ],
    'Пү': [],
    'Ба': [
      { time: '8:20-9:50', className: 'Магадлал ба статистик', type: 'семинар', room: 'ШМТДС 714', teacher: 'Б.Санчир' },
      { time: '10:00-11:30', className: 'Програм хангамжийн шаардлагын шинжилгээ болон зохиомж', type: 'лаборатор', room: 'ШМТДС 912', teacher: 'Д.Золжаргал' },
      { time: '11:40-13:10', className: 'Компьютерийн сүлжээ', type: 'лаборатор', room: 'ШМТДС 912', teacher: 'н.Чулуунтулга' },
    ],
    'Бя': [],
    'Ня': [],
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleClassPress = (classInfo) => {
    navigation.navigate('ClassDetail', classInfo);
  };

  const renderSchedule = () => {
    const schedule = scheduleData[activeDay];
    
    if (schedule.length === 0) {
      return (
        <View style={styles.emptyScheduleContainer}>
          <FontAwesome5 name="calendar-day" size={50} color="#ccc" />
          <Text style={styles.emptyScheduleText}>Энэ өдөр хичээл байхгүй</Text>
        </View>
      );
    }
    
    return (
      <View style={styles.scheduleContainer}>
        {schedule.map((item, index) => (
          <Card key={index} containerStyle={styles.scheduleCard}>
            <View style={styles.scheduleTimeContainer}>
              <FontAwesome5 name="clock" size={16} color="#822321" />
              <Text style={styles.scheduleTime}>{item.time}</Text>
            </View>
            
            <Text style={styles.scheduleClassName}>{item.className}</Text>
            
            <View style={styles.scheduleDetails}>
              <View style={styles.scheduleDetail}>
                <FontAwesome5 name="chalkboard-teacher" size={14} color="#666" />
                <Text style={styles.scheduleDetailText}>{item.type}</Text>
              </View>
              
              <View style={styles.scheduleDetail}>
                <FontAwesome5 name="map-marker-alt" size={14} color="#666" />
                <Text style={styles.scheduleDetailText}>{item.room}</Text>
              </View>
              
              <View style={styles.scheduleDetail}>
                <FontAwesome5 name="user" size={14} color="#666" />
                <Text style={styles.scheduleDetailText}>{item.teacher}</Text>
              </View>
            </View>
          </Card>
        ))}
      </View>
    );
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <LinearGradient
        colors={['#822321', '#822321']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Сайн байна уу!</Text>
        <Text style={styles.headerSubtitle}>B200970099</Text>
      </LinearGradient>

      {/* Week Days */}
      <View style={styles.weekDaysContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {weekDays.map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayButton,
                activeDay === day && styles.activeDayButton
              ]}
              onPress={() => setActiveDay(day)}
            >
              <Text style={[
                styles.dayButtonText,
                activeDay === day && styles.activeDayButtonText
              ]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Classes Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Миний хичээлүүд</Text>
        <View style={styles.classesGrid}>
          {classes.map((classInfo) => (
            <TouchableOpacity
              key={classInfo.id}
              style={styles.classCard}
              onPress={() => handleClassPress(classInfo)}
            >
              <LinearGradient
                colors={['#822321', '#822321']}
                style={styles.classCardGradient}
              >
                <View style={styles.classCardContent}>
                  <Text style={styles.classCode}>{classInfo.code}</Text>
                  <Text style={styles.className} numberOfLines={2}>
                    {classInfo.name}
                  </Text>
                  <View style={styles.classInfo}>
                    <FontAwesome5 name="user" size={12} color="#fff" />
                    <Text style={styles.classTeacher}>{classInfo.teacher}</Text>
                  </View>
                  <View style={styles.classInfo}>
                    <FontAwesome5 name="clock" size={12} color="#fff" />
                    <Text style={styles.classTime}>{classInfo.scheduleTime}</Text>
                  </View>
                  <View style={styles.attendanceContainer}>
                    <Text style={styles.attendanceText}>Ирц: {classInfo.attendance}</Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Schedule Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Өнөөдрийн хуваарь</Text>
        {renderSchedule()}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#822321',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  weekDaysContainer: {
    paddingVertical: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  dayButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeDayButton: {
    backgroundColor: '#822321',
  },
  dayButtonText: {
    fontSize: 16,
    color: '#666',
  },
  activeDayButtonText: {
    color: '#fff',
  },
  sectionContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  classesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  classCard: {
    width: (windowWidth - 45) / 2,
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  classCardGradient: {
    backgroundColor: '#822321',
    padding: 16,
  },
  classCardContent: {
    minHeight: 150,
  },
  classCode: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    opacity: 0.8,
    marginBottom: 5,
  },
  className: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  classInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  classTeacher: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 5,
    opacity: 0.9,
  },
  classTime: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 5,
    opacity: 0.9,
  },
  attendanceContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 5,
    borderRadius: 5,
  },
  attendanceText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  scheduleContainer: {
    marginBottom: 10,
  },
  scheduleCard: {
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  scheduleTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  scheduleTime: {
    marginLeft: 8,
    fontSize: 14,
    color: '#822321',
    fontWeight: '600',
  },
  scheduleClassName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  scheduleDetails: {
    marginTop: 5,
  },
  scheduleDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  scheduleDetailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  emptyScheduleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  emptyScheduleText: {
    marginTop: 10,
    fontSize: 16,
    color: '#999',
  },
});