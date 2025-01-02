

// // export default TimerApp;
// import React from 'react';
// import { AppRegistry, View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
// import { observable } from '@legendapp/state';
// import { enableReactTracking } from '@legendapp/state/config/enableReactTracking';
// import { persistObservable } from '@legendapp/state/persist';
// import { observer } from '@legendapp/state/react';

// // Enable automatic React tracking
// enableReactTracking({ auto: true });

// const state = observable({
//   timer: 0,
//   isRunning: false,
//   inputTime: '',
//   intervalId: null,
// });

// const TimerApp: React.FC= observer(() => {
  

// persistObservable(state, { local: 'state' });

//   const handleSetTimer = () => {
//     const time = parseInt(state.inputTime.get(), 10);
//     if (!isNaN(time) && time > 0) {
//       state.timer.set(time);
//     } else {
//       Alert.alert('Invalid Input', 'Please enter a valid time before setting the timer.');
//     }
//   };

//     const handleInputChange = (value) => {
//       const time = parseInt(value, 10);
//       if (!isNaN(time)) {
//         state.inputTime.set(time);
//       }
//     }

//   const startTimer = () => {
//     if (!state.isRunning.get() && state.timer.get() > 0) {
//       state.isRunning.set(true);
//       const interval = setInterval(() => {
//         state.timer.set((current) => {
//           if (current > 0) return current - 1;
//           clearInterval(state.intervalId.get());
//           state.isRunning.set(false);
//           Alert.alert('Time is up!', 'The countdown has finished.');
//           return 0;
//         });
//       }, 1000);
//       state.intervalId.set(interval);
//     }
//   };

//   const stopTimer = () => {
//     clearInterval(state.intervalId.get());
//     state.isRunning.set(false);
//   };

//   return (
//     <View>
//       <Text>Timer: {state.timer.get()} seconds</Text>
//       <TextInput
//         keyboardType="numeric"
//         placeholder="Enter time (seconds)"
//         value={state.inputTime.get()} // Controlled input bound to the observable
//         onChangeText={handleInputChange} // Updates the observable on input
//       />
//       <View>
//         <Button title="Set Timer" onPress={handleSetTimer} disabled={state.isRunning.get()} />
//         <Button title="Start" onPress={startTimer} disabled={state.isRunning.get() || state.timer.get() <= 0} />
//         <Button title="Stop" onPress={stopTimer} disabled={!state.isRunning.get()} />
//       </View>
//     </View>
//   );
// });


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   text: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//     width: '80%',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '80%',
//   },
// });

// AppRegistry.registerComponent('timer_app', () => TimerApp);

// export default TimerApp;



import React from 'react';
import { AppRegistry, View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import { observable } from '@legendapp/state';
//import { persistObservable } from '@legendapp/state/persist';
import { enableReactTracking } from '@legendapp/state/config/enableReactTracking';
import { observer } from '@legendapp/state/react';


const timerStates = new Map();


const getTimerState = (id) => {
  if (!timerStates.has(id)) {
    timerStates.set(
      id,
      observable({
        timer: 0,
        isRunning: false,
        inputTime: '',
        intervalId: null,
      })
    );
  }
  return timerStates.get(id);
};


const TimerApp: React.FC = observer(({id}) => {
console.log({id})

  enableReactTracking({ auto: true });

  const timerState$ = getTimerState(id);


  let timer = timerState$.timer.get();
  let isRunning = timerState$.isRunning.get();
  let inputTime = timerState$.inputTime.get();

  const handleSetTimer = () => {
    const time = parseInt(inputTime, 10);
    if (!isNaN(time) && time > 0) {
      timerState$.timer.set(time);
    } else {
      Alert.alert('Invalid Input', 'Please enter a valid time before setting the timer.');
    }
  };

  const handleInputChange = (value) => {
    timerState$.inputTime.set(value);
  };

  const startTimer = () => {
    if (!isRunning && timer > 0) {
      timerState$.isRunning.set(true);
      const interval = setInterval(() => {
        timerState$.timer.set((current) => {
          if (current > 0) return current - 1;
          clearInterval(timerState$.intervalId.get());
          timerState$.isRunning.set(false);
          Alert.alert('Time is up!', 'The countdown has finished.');
          return 0;
        });
      }, 1000);
      timerState$.intervalId.set(interval);
    }
  };

  const stopTimer = () => {
    clearInterval(timerState$.intervalId.get());
    timerState$.isRunning.set(false);
  };

  return (
    <View >
      <Text >Timer: {timer} seconds</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Enter time (seconds)"
        value={timerState$.inputTime.get().toString()}
        onChangeText={handleInputChange}
        // onChangeText={(e) => timerState$.inputTime.set(e.target.value)}
      />
      <View>
        <Button title="Set Timer" onPress={handleSetTimer} disabled={isRunning} />
        <Button title="Start" onPress={startTimer} disabled={isRunning || timer <= 0} />
        <Button title="Stop" onPress={stopTimer} disabled={!isRunning} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '80%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

AppRegistry.registerComponent('timer_app', () => TimerApp);

export default TimerApp;