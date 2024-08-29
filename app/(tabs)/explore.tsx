import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Routine {
  id: string;
  days: number;
  title: string;
  description: string;
  completed: boolean;
}

const Checklist: React.FC = () => {
  const [routines, setRoutines] = useState<Routine[]>([
    { id: '1', days: 5, title: 'Morning Exercise', description: 'Daily workout for 30 minutes', completed: true },
    { id: '2', days: 3, title: 'Read a Book', description: 'Read at least 20 pages', completed: false },
    // Add more routines here
  ]);

  const toggleComplete = (id: string) => {
    setRoutines(prevRoutines =>
      prevRoutines.map(routine =>
        routine.id === id ? { ...routine, completed: !routine.completed } : routine
      )
    );
  };

  const renderItem = ({ item }: { item: Routine }) => (
    <LinearGradient colors={['#4b4b4b', '#2b2b2b']} style={styles.routineItem}>
      <View style={styles.dayCount}>
        <Text style={styles.dayCountText}>{item.days}</Text>
      </View>
      <View style={styles.routineTextContainer}>
        <Text style={styles.routineTitle}>{item.title}</Text>
        <Text style={styles.routineDescription}>{item.description}</Text>
      </View>
      <TouchableOpacity onPress={() => toggleComplete(item.id)}>
        <View style={styles.checkBox}>
          {item.completed && <Text style={styles.checkMark}>✔</Text>}
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );

  return (
    <LinearGradient colors={['#1b1b1b', '#0b0b0b']} style={styles.container}>
      <FlatList
        data={routines}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  routineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  dayCount: {
    marginRight: 10,
    backgroundColor: '#292929',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCountText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  routineTextContainer: {
    flex: 1,
  },
  routineTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  routineDescription: {
    color: '#AAAAAA',
    fontSize: 14,
  },
  checkBox: {
    width: 30,
    height: 30,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#00FF00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    color: '#00FF00',
    fontSize: 18,
  },
});

export default Checklist;
