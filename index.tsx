import React, { useState } from 'react';
import { View, Button ,Modal,Text,Alert, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import TimerApp from './timer';  // Import TimerApp component
import { observer } from '@legendapp/state/react';
import {  action, toJS } from 'mobx'; // Assuming MobX is being used
import { Ionicons } from '@expo/vector-icons';

import { observable } from '@legendapp/state';
import store$ from './store';

const timers$ = store$.timers;

const MyComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState(''); 
  const [labelerText, setLabelerText] = useState(''); 

  const handleAddTimer = () => {
    setModalVisible(true);
    };
    const model_button=()=>{
      const time = parseInt(text, 10);
      const labeler = labelerText.trim();
      //console.log(time);
      if (!isNaN(time) && time > 0) {
        const newTimer = {
          id: Date.now(),
          timer: time,
          isRunning: false,
          inputTime: '',
          label:labeler,
          intervalId: null,
          
        };
        timers$.set([...timers$.get(), newTimer]);
        console.log(timers$.get())
          setModalVisible(false);  
      } else {
        Alert.alert('Invalid Input', 'Please enter a valid time before setting the timer.');
      }
    }


  return (
    <View >
      <View style={styles.container}>
      <TouchableOpacity onPress={handleAddTimer} style={styles.addButton}>
        <Ionicons name="add" size={32} color="#FFA500" />
      </TouchableOpacity>
    </View>
    
      <View>

      <Modal
        animationType="slide" 
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} 
      >
        <View>
          <TextInput id='lol' value={text} placeholder="Enter timer duration"
        onChangeText={(value) => setText(value)}></TextInput>
        </View>
        <View>
          <TextInput id='lol2' value={labelerText} placeholder="Enter label"
        onChangeText={(value) => setLabelerText(value)}></TextInput>
        </View>
        <View>
          <Button title="set timer" onPress={model_button}></Button>
        </View>

      </Modal>

      </View>
      <View style={{ padding: 30 }}>
        {timers$.get().map((timer) => (
          <TimerApp key={timer.id} id={timer.id}  duration={timer.timer} labler={timer.label} />
        ))}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10, // Ensure it appears on top of other elements
  },
  addButton: {
    backgroundColor: '#700', // Match the background of the timer interface
    padding: 8,
    borderRadius: 16,
  },
});




export default observer(MyComponent);














