import React, { useEffect, useRef, useState } from 'react';
import { View,TouchableOpacity, Text, Image, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/edit/edit.png'
import { EditTaskArgs } from '../Páginas/Home';
import { Task } from './TasksList';

interface TaskItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({taskId, taskNewTitle}: EditTaskArgs) =>void;
}

export function TaskItem({task, editTask, removeTask, toggleTaskDone}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [taskNewTitleValue, setTaskNewTitleValue] = useState(task.title)
  const textInputRef = useRef<TextInput>(null)

  function handleStartEditiong(){
    setIsEditing(true)
  }

  function handleCancelEditing(){
    setTaskNewTitleValue(task.title)
    setIsEditing(false)
  }

  function handleSubmitEditing(){
    editTask({ taskId: task.id, taskNewTitle: taskNewTitleValue})
    setIsEditing(false)
  }

  useEffect(() =>{
    if (textInputRef.current){
      if (isEditing){
        textInputRef.current.focus()
      } else{
        textInputRef.current.blur()
      }
    }
  },[isEditing])

  return (
    <View style={styles.container} >
     <View style={styles.infoContainer} >
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
      
          <TextInput
            value={taskNewTitleValue}
            onChangeText={setTaskNewTitleValue}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
             </TouchableOpacity>
            </View>
        
         <View style={styles.icosContainer} >
           {isEditing ? (
             <TouchableOpacity  
                onPress = { handleCancelEditing}
             >
                <Icon name="x" size={24} color="#ffff" />
          </TouchableOpacity>
           ) : (
              <TouchableOpacity            
                 onPress = {handleStartEditiong}
            >
                <Image source={editIcon} style={{tintColor:"#ffff" }} />
         </TouchableOpacity>
           )}
            <View style={styles.iconsDivider} />

            <TouchableOpacity            
               onPress = {() => removeTask(task.id)}
               disabled={isEditing}
            >
           <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1, tintColor:"#ffff" }} />
         </TouchableOpacity>
         </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
     flexDirection: 'row',
      alignItems: 'center', 
      justifyContent: 'space-between'
  },
  infoContainer:{
    flex:1
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,    
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
    borderColor: '#ffff',
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
  },
  icosContainer:{
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:12,
    paddingRight:24
  },
  iconsDivider:{
    width:1,
    height:24,
    backgroundColor:'#fff',
    marginHorizontal:12
  }
})
