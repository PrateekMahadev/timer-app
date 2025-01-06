import React, { useState } from 'react';
import { View, Button, Modal, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Text } from 'react-native';
import TimerApp from './timer'; 
import { observer } from '@legendapp/state/react';
import { Ionicons } from '@expo/vector-icons';
import store$ from './store';

const timers$ = store$.timers;

const MyComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');
  const [labelerText, setLabelerText] = useState('');

  const handleAddTimer = () => {
    setModalVisible(true);
  };

  const addTimer = () => {
    const time = parseInt(text, 10);
    setText('')
    const labeler = labelerText.trim();
    setLabelerText('')
    if (!isNaN(time) && time > 0) {
      const newTimer = {
        id: Date.now(),
        timer: time,
        label: labeler,
      };
      timers$.set([...timers$.get(), newTimer]);
      
      setModalVisible(false);
    } else {
      Alert.alert('Invalid Input', 'Please enter a valid time before setting the timer.');
    }
  };

  console.log(timers$.get())

  const removeTimer = (id: number) => {
    const updatedTimers = timers$.get().filter((timer) => timer.id !== id);
    timers$.set(updatedTimers);
  };

  return (
    <View style={{flex:1}}>

<Modal
  animationType="slide"
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <Text style={styles.modalTitle}>Set a New Timer</Text>
    <View style={{ position: 'relative', right: 20 }}>
    
    </View>
    <TextInput
      value={text}
      placeholder="Enter timer duration (seconds)"
      onChangeText={(value) => setText(value)}
      keyboardType="numeric"
      style={styles.input}
    />
    <View style={{ position: 'relative', right: 20 }}>
    
    </View>
    <TextInput
      value={labelerText}
      placeholder="Enter label"
      onChangeText={(value) => setLabelerText(value)}
      style={styles.input}
    />
    <TouchableOpacity onPress={addTimer} style={styles.setButton}>
      <Text style={styles.setButtonText}>Set Timer</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => setModalVisible(false)}
      style={styles.closeButton}
    >
      <Text style={styles.closeButtonText}>Cancel</Text>
    </TouchableOpacity>
 </View>

</Modal>


      <ScrollView style={styles.scrollView}>
        {timers$.get().map((timer) => (
          <TimerApp
            key={timer.id}
            id={timer.id}
            duration={timer.timer}
            labler={timer.label}
            onRemove={removeTimer}
          />
        ))}
      </ScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleAddTimer} style={styles.addButton}>
          <Ionicons name="add" size={32} color="#FFA500" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10, 
  },
  addButton: {
    backgroundColor: '#700', 
    padding: 8,
    borderRadius: 16,
  },

  scrollView: {
    flex: 1,
    marginTop: 80, 
    paddingHorizontal: 16,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  setButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 10,
  },
  setButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  inputRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 16,
},
inputLabel: {
  fontSize: 16,
  color: '#333',
  marginRight: 15,
},



});

export default observer(MyComponent);
















