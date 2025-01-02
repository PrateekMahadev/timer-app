import React, { useState } from 'react';
import { View, Button } from 'react-native';
import TimerApp from './timer';  // Import TimerApp component
import { observer } from '@legendapp/state/react';
import { observable } from '@legendapp/state';
import store$ from './store';

// const MyComponent = () => {
//   const [timers, setTimers] = useState([]);

//   // Function to add a new timer
//   const handleAddTimer = () => {
//     setTimers([...timers, { id: Date.now() }]);  // Add a new timer object with a unique id
//   };

//   return (
//     <View >
//       <Button title="Add Timer" onPress={handleAddTimer} />
// <View  style={{ padding: 30 }}>
//       {timers.map((timer) => (
//         <TimerApp key={timer.id} />  
//       ))}
// </View>
//     </View>
//   );
// };

// const timers$ = observable([]);

const timers$ = store$.timers;

const MyComponent = () => {
  //const [timers, setTimers] = useState([]);

  // Function to add a new timer
  const handleAddTimer = () => {
    // setTimers([...timers, { id: Date.now() }]);  // Add a new timer object with a unique id
      const newTimer = {
        id: Date.now(),
        timer: 0,
        isRunning: false,
        inputTime: '',
        intervalId: null,
      };
      timers$.set([...timers$.get(), newTimer]);
    };

  return (
    <View >
      <Button title="Add Timer" onPress={handleAddTimer} />
      <View style={{ padding: 30 }}>
        {timers$.get().map((timer) => (
          <TimerApp key={timer.id} id={timer.id} timer={timer} />
        ))}
      </View>
    </View>
  );
};



export default observer(MyComponent);













