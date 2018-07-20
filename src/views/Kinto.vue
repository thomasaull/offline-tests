<template>

<div class="kinto">
  <button @click="sync">{{ syncLabel }}</button>
  <Todos :todos="todos" @doneChanged="doneChanged" @titleChanged="titleChanged" @newTodo="newTodo" @deleteTask="deleteTask"/>
</div>

</template>

<script>
import Kinto from 'kinto'
import Todos from '@/components/Todos.vue'

const syncOptions = {
  remote: 'https://kinto.dev.mozaws.net/v1',
  headers: { Authorization: 'Basic ' + btoa('thomasaull:tom') }
}

export default {
  name: 'Kinto',
  components: { Todos },
  data() {
    return {
      todos: [],
      syncLabel: 'Sync'
    }
  },

  mounted() {
    this.db = new Kinto()
    this.tasks = this.db.collection('tasks')

    // this.sync()
    this.updateTasks()
  },

  methods: {
    async updateTasks() {
      const response = await this.tasks.list()
      this.todos = response.data
    },

    async doneChanged({ id, value }) {
      const { data: task } = await this.tasks.get(id)
      task.done = value
      await this.tasks.update(task)
    },

    async titleChanged({ id, value }) {
      const { data: task } = await this.tasks.get(id)
      task.title = value
      await this.tasks.update(task)
    },

    newTodo(data) {
      this.tasks.create({
        title: data.value,
        done: false
      })

      this.updateTasks()
    },

    async deleteTask({ id }) {
      this.tasks.delete(id)
      this.updateTasks()
    },

    async sync() {
      this.syncLabel = 'Syncing…'
      const syncResponse = await this.tasks.sync(syncOptions)
      console.log(syncResponse)
      this.syncLabel = 'Sync'
      this.updateTasks()
    }
  }
}
</script>

<style lang="scss">
.kinto {
}
</style>
