<template>
  <div class="todos">
    <div class="todos-list">
      <Todo 
        v-for="(todo, index) in todos" 
        :key="index" 
        :todo="todo"
        @doneChanged="data => {$emit('doneChanged', data)}"
        @titleChanged="data => {$emit('titleChanged', data)}"
        @deleteTask="data => {$emit('deleteTask', data)}"
      />
    </div>

    <div class="todo-new">
      <Todo
        :newTodoMode="true"
        :todo="{title: '', done: false}"
        @titleChanged="data => {$emit('newTodo', data)}"
      />
    </div>
  </div>
</template>

<script>
import Todo from '@/components/Todo'

export default {
  name: 'Todos',
  components: { Todo },
  props: {
    todos: { type: Array, default: () => [] }
  }
}
</script>
