import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskWithSameTitle = tasks.find(task => task.title === newTaskTitle)

    if(taskWithSameTitle){
      return Alert.alert('Task já cadastrada','Você não pode cadastrar uma task com o memso nome')
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldTasks => [...oldTasks, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTask = tasks.map(task => ({...task}))

<<<<<<< HEAD
    const taskToBeMarkedAsDone = updatedTask.find(task => task.id === id)
=======
  const taskToBeMarkedAsDone = updatedTask.find(task => task.id === id)
>>>>>>> a9a7d34741685e8bb62766c9f0884d37a5dee147

    if(!taskToBeMarkedAsDone)
    return

    taskToBeMarkedAsDone.done = !taskToBeMarkedAsDone.done
    setTasks(updatedTask)
  }

  function handleRemoveTask(id: number) {
    const updatedTask = tasks.filter(task => task.id !== id )

    setTasks(updatedTask)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB'
  }
})
