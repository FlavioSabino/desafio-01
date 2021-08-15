import React from 'react';
import { View,TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import { EditTaskArgs } from '../Páginas/Home';
import { Task } from './TasksList';

interface TaskItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({taskId, taskNewTitle}: EditTaskArgs) =>void;
}

export function TaskItem({task, editTask, removeTask, toggleTaskDone}: TaskItemProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}} >
     <View>
       <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
           onPress = {() => toggleTaskDone(task.id)}
         >
         <View 
           style={task.done ? styles.taskMarkerDone : styles.taskMarker}
            >
         { task.done && (
          <Icon 
           name="check"
           size={12}
           color="#fff"
            />
            )}
          </View>

           <Text  
            style={task.done ? styles.taskTextDone : styles.taskText}
              >
              {task.title}
            </Text>
             </TouchableOpacity>
            </View>

         <TouchableOpacity            
            style={{ paddingHorizontal: 24 }}
            onPress = {() => removeTask(task.id)}
            >
           <Image source={trashIcon} style={{tintColor:"#ffff" }} />
            </TouchableOpacity>  
    </View>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#fff',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
     marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})