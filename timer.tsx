import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert ,Button} from 'react-native';
import { observable } from '@legendapp/state';
import { enableReactTracking } from '@legendapp/state/config/enableReactTracking';
import { observer } from '@legendapp/state/react';
import { Ionicons } from '@expo/vector-icons';




const timerStates = new Map();

const getTimerState = (id, duration, labler) => {
  if (!timerStates.has(id)) {
    timerStates.set(
      id,
      observable({
        timer: duration,
        originalDuration: duration,
        isRunning: false,
        label: labler,
        intervalId: null,
      })
    );
  }
  return timerStates.get(id);
};

const TimerApp: React.FC<{ id: number; duration: number; labler: string; onRemove: (id: number) => void }> = observer(
  ({ id, duration, labler, onRemove }) => {
    enableReactTracking({ auto: true });

    const timerState$ = getTimerState(id, duration, labler);
    const timer = timerState$.timer.get();
    const isRunning = timerState$.isRunning.get();
    
    console.log(timerState$.get())
  
    // useEffect(() => {
    //   if (timer === -1) {
    //     timerState$.timer.set(timerState$.originalDuration.get())

    //   }
    // },[timer]);

    const toggleTimer = () => {
      if (!isRunning && timer > 0) {
        timerState$.isRunning.set(true);
        const interval = setInterval(() => {
          timerState$.timer.set((current) => {
            if (current > 0) return current - 1;
            timerState$.timer.set(timerState$.originalDuration.get());
            clearInterval(timerState$.intervalId.get());
            timerState$.isRunning.set(false);
            Alert.alert('Time is up!', `${labler} has finished.`);
            return timerState$.originalDuration.get();
          });
        }, 1000);
        timerState$.intervalId.set(interval);
      } else {
        clearInterval(timerState$.intervalId.get());
        timerState$.isRunning.set(false);
      }
    };



    // const toggleTimer = () => {
    //   if (!isRunning && timer > 0) {
    //     timerState$.isRunning.set(true);
    //     const interval = setInterval(() => {
    //       timerState$.timer.set((current) => {
    //         if (current > 0) return current - 1;
    
    //         // Reset the timer to the original duration
    //         timerState$.timer.set(timerState$.originalDuration.get());
            
    //         clearInterval(timerState$.intervalId.get());
    //         timerState$.isRunning.set(false);
    //         Alert.alert('Time is up!', `${labler} has finished.`);
            
    //         return timerState$.originalDuration.get(); // This will keep the state correct
    //       });
    //     }, 1000);
    //     timerState$.intervalId.set(interval);
    //   } else {
    //     clearInterval(timerState$.intervalId.get());
    //     timerState$.isRunning.set(false);
    //   }
    // };

    const removeTimer=()=>{
      if (!isRunning)
      onRemove(id)
    }

    const stopTimer=()=>{
      if(isRunning){
      timerState$.timer.set(timerState$.originalDuration.get());
      clearInterval(timerState$.intervalId.get());
      timerState$.isRunning.set(false);
      Alert.alert('Timer', `${labler} stopped.`);
      return timerState$.originalDuration.get();
      }

      
    }
    return (
      <View style={styles.container}>
        <View style={styles.timerInfo}>
          <Text style={styles.timerText}>
            {Math.floor(timer / 60).toString().padStart(2, '0')}:
            {(timer % 60).toString().padStart(2, '0')}
          </Text>
          <Text style={styles.labelText}>{labler}</Text>
        </View>
        <TouchableOpacity onPress={toggleTimer} style={styles.iconButton}>
          <Ionicons
            name={isRunning ? 'pause-circle-outline' : 'play-circle-outline'}
            size={48}
            color={isRunning ? '#FFA500' : '#00FF00'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={stopTimer} style={styles.stopButton}>
            <Ionicons name="stop-circle-outline" size={48} color={isRunning ? '#FF00FF' : '#DDD'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={removeTimer} style={styles.removeButton}>
            <Ionicons name="close-circle-outline" size={48} color={isRunning ? '#DDD' : '#FF0000'} />
          </TouchableOpacity>
      </View>
    );
  }
);

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
  removeButton: {
    marginLeft: 16,
  },
  stopButton: {
    marginLeft: 16,
  },

});

export default TimerApp;

