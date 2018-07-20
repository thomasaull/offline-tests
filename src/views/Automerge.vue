<template>

<div class="automerge">
  <button @click="getTodosFromServer">get Todos from Server</button>
  <button @click="getHistory">get History</button>
  <button @click="getChanges">get Changes</button>
  <button @click="sync">Sync</button>
  
</div>

</template>

<script>
import Automerge from 'automerge'
import cuid from 'cuid'
import axios from 'axios'

export default {
  name: 'Automerge',

  mounted() {
    this.initialState = Automerge.change(
      Automerge.init(),
      'initialState',
      doc => {
        doc.todos = []
      }
    )

    this.state = Automerge.merge(Automerge.init(), this.initialState)
  },

  methods: {
    getHistory() {
      console.log(Automerge.getHistory(this.state))
    },

    getChanges() {
      console.log(Automerge.getChanges(this.initialState, this.state))
    },

    getTodosFromServer() {
      axios.get('todo').then(response => {
        this.state = Automerge.change(
          this.state,
          'include todos from server',
          doc => {
            doc.todos = response.data.todos
          }
        )

        console.log(this.state)
      })
    },

    async sync() {
      const response = await axios.get('todo')
      const todos = response.data.todos

      let remoteState = Automerge.change(
        Automerge.init(),
        'remoteState',
        doc => {
          doc.todos = todos
        }
      )

      console.log(remoteState)

      this.state = Automerge.merge(remoteState, this.state)
      // const changes = JSON.stringify(
      //   Automerge.getChanges(this.initialState, this.state)
      // )

      // axios.post('todo', {
      //   changes: changes
      // })
    },

    doneChanged() {
      this.state = Automerge.change(this.state, 'change Done', doc => {
        doc.todos[0].done = false
      })
    },

    titleChanged(data) {
      this.state = Automerge.change(this.state, 'change Title', doc => {
        doc.todos[0].title = data.value
      })
    },

    newTodo(data) {
      this.state = Automerge.change(this.state, 'new Todo', doc => {
        doc.todos.push({
          id: cuid(),
          title: data.value,
          done: false
        })
      })
    }
  }
}
</script>

<style lang="scss">
.automerge {
}
</style>
