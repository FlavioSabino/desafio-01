import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

 export type EditTaskArgs = {
  taskId: number
  taskNewTitle: string
}

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

    const taskToBeMarkedAsDone = updatedTask.find(task => task.id === id)

    if(!taskToBeMarkedAsDone)
    return

    taskToBeMarkedAsDone.done = !taskToBeMarkedAsDone.done
    setTasks(updatedTask)
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item','Tem certeza que você deseja remover esse item?',[
      {
          style: 'cancel',
          text: 'não'
      },
      {
        style: 'destructive',
        text: 'sim',
        onPress: () => {
          const updatedTask = tasks.filter(task => task.id !== id )

          setTasks(updatedTask)
        }
      }
    ])
  }

  function handleEditTask({taskId, taskNewTitle}: EditTaskArgs){
    const updatedTasks = tasks.map(task => ({...task}))

    const taskUpdated = updatedTasks.find(task => task.id === taskId)

    if(!taskUpdated)
      return

      taskUpdated.title = taskNewTitle

      setTasks(updatedTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
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
