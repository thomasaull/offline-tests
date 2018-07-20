<template>

<div class="todo">
  <input type="checkbox" :checked="todo.done" @change="checkbox" v-if="!newTodoMode"/>
  <div class="todo-title" v-if="!newTodoMode">{{ todo.title }}</div>
  <input class="todo-input" type="text" name="title" :value="todo.title" ref="title" :placeholder="newTodoMode ? 'New Todo' : undefined"/>
  <button @click="title">Speichern</button>
  <button @click="deleteTask" v-if="!newTodoMode">Delete</button>
</div>

</template>

<script>
export default {
  name: 'Todo',

  props: {
    todo: { type: Object, required: true },
    newTodoMode: { type: Boolean, default: false }
  },

  methods: {
    checkbox(event) {
      this.$emit('doneChanged', {
        value: event.target.checked,
        id: this.todo.id
      })
    },

    title() {
      this.$emit('titleChanged', {
        value: this.$refs.title.value,
        id: this.todo.id
      })
    },

    deleteTask() {
      this.$emit('deleteTask', {
        id: this.todo.id
      })
    }
  }
}
</script>
<style lang="scss">
.todo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
}

.todo-title {
  font-size: 13px;
  margin-left: 5px;
}

.todo-input {
  min-width: 400px;
  margin-left: 20px;
  margin-right: 5px;
}
</style>
