

import React from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, Button } from 'react-native';
import { observable } from '@legendapp/state';
import { enableReactTracking } from '@legendapp/state/config/enableReactTracking';
import { observer } from '@legendapp/state/react';
import { Ionicons } from '@expo/vector-icons';

const timerStates = new Map();

const getTimerState = (id,duration,labler) => {
  if (!timerStates.has(id)) {
    timerStates.set(
      id,
      observable({
        timer: duration,
        isRunning: false,
        inputTime: '',
        label: labler,
        intervalId: null,
      })
    );
  }
  return timerStates.get(id);
};

const TimerApp: React.FC<{ id: number ,duration:number ,labler:string}> = observer(({ id ,duration,labler}) => {
  enableReactTracking({ auto: true });

  const timerState$ = getTimerState(id,duration,labler);

  const timer = timerState$.timer.get();

  const isRunning = timerState$.isRunning.get();
  const inputTime = timerState$.inputTime.get();
  const label = timerState$.label.get();

  console.log(timerState$.get())
  console.log(label)


  const toggleTimer = () => {
    if (!isRunning && timer > 0) {
      timerState$.isRunning.set(true);
      const interval = setInterval(() => {
        timerState$.timer.set((current) => {
          if (current > 0) return current - 1;
          clearInterval(timerState$.intervalId.get());
          timerState$.isRunning.set(false);
          Alert.alert('Time is up!', `${label} has finished.`);
          return 0;
        });
      }, 1000);
      timerState$.intervalId.set(interval);
    } else {
      clearInterval(timerState$.intervalId.get());
      timerState$.isRunning.set(false);
    }
  };
  


  return (
    <View style={styles.container}>
      <View style={styles.timerInfo}>
        <Text style={styles.timerText}>{Math.floor(timer / 60).toString().padStart(2, '0')}:{(timer % 60).toString().padStart(2, '0')}</Text>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <TouchableOpacity onPress={toggleTimer} style={styles.iconButton}>
        <Ionicons
          name={isRunning ? 'pause-circle-outline' : 'play-circle-outline'}
          size={48}
          color={isRunning ? '#FFA500' : '#FFA500'}
        />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    backgroundColor: '#2000',
  },
  timerInfo: {
    flex: 1,
  },
  timerText: {
    fontSize: 40,
    color: '#ZZZ',
    fontWeight: '500',
  },
  labelText: {
    fontSize: 16,
    color: '#AAA',
    marginTop: 4,
  },
  iconButton: {
    marginLeft: 16,
  },
});




export default TimerApp;
