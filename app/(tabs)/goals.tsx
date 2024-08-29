import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Goal = {
  id: string;
  name: string;
  target: number;
  progress: number;
};

export default function GoalScreen() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [goalName, setGoalName] = useState('');
  const [goalTarget, setGoalTarget] = useState('');

  useEffect(() => {
    const loadGoals = async () => {
      const storedGoals = await AsyncStorage.getItem('goals');
      if (storedGoals) {
        setGoals(JSON.parse(storedGoals));
      }
    };
    loadGoals();
  }, []);

  const addGoal = async () => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      name: goalName,
      target: parseInt(goalTarget),
      progress: 0,
    };
    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    await AsyncStorage.setItem('goals', JSON.stringify(updatedGoals));
    setGoalName('');
    setGoalTarget('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set a New Goal</Text>
      <TextInput
        style={styles.input}
        placeholder="Goal Name"
        value={goalName}
        onChangeText={setGoalName}
      />
      <TextInput
        style={styles.input}
        placeholder="Target (e.g., 100km)"
        keyboardType="numeric"
        value={goalTarget}
        onChangeText={setGoalTarget}
      />
      <Button title="Add Goal" onPress={addGoal} />
      <FlatList
        data={goals}
        renderItem={({ item }) => (
          <View style={styles.goalContainer}>
            <Text>{item.name}: {item.progress}/{item.target}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  goalContainer: {
    marginBottom: 16,
  },
});
