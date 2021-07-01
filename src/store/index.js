import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentIndex: 0,
    todos: [
      {
        icon: 'user',
        name: '个人任务',
        tasks: [
          {
            id: 1,
            title: '约会',
            date: new Date(),
            done: false,
            deleted: false
          },
          {
            id: 2,
            title: '健身',
            date: new Date(),
            done: true,
            deleted: false
          }
        ],
        colors: ['#ff6262', '#ffa947']
      },
      {
        icon: 'suitcase',
        name: '工作',
        tasks: [
          {
            id: 3,
            title: 'Design Sprint',
            date: new Date(),
            done: true,
            deleted: false
          },
          {
            id: 4,
            title: 'Icon Set Design for Mobile App',
            date: new Date(),
            done: false,
            deleted: false
          },
          {
            id: 5,
            title: 'HTML/CSS Study',
            date: new Date(),
            done: false,
            deleted: false
          },
          {
            id: 6,
            title: 'Weekly Report',
            date: new Date(),
            done: false,
            deleted: false
          },
          {
            id: 7,
            title: 'Design Meeting',
            date: new Date(),
            done: false,
            deleted: false
          },
          {
            title: 'Quick Prototyping',
            date: new Date('2019-09-16'),
            done: false,
            deleted: false
          },
          {
            id: 8,
            title: 'UX Conference',
            date: new Date('2019-09-16'),
            done: false,
            deleted: false
          }
        ],
        colors: ['#5b9df9', '#47bfff']
      },
      {
        icon: 'home',
        name: '家庭',
        tasks: [
          {
            id: 2,
            title: 'House Keeping',
            date: new Date(),
            done: true,
            deleted: false
          }
        ],
        colors: ['#2c7d59', '#3ba776']
      }
    ],

    selected: null,
    unselect: null,
    editing: null
  },
  getters:{
    currentTodo (state) {
      return state.todos[state.currentIndex]
    },
    todayTasks (state) {
      const tasks = []
      state.todos.forEach(todo => {
        todo.tasks.forEach(task => {
          if (task.date <= tomorrow && !task.done && !task.deleted) {
            tasks.push(task)
          }
        })
      })
      return tasks
    }
  },
  mutations: {
    toggleEditing (state) {
      //console.log(this.state.editing);
      if (state.editing && state.editing.text) {
        state.selected.todo.tasks.unshift({
          title: state.editing.text,
          date: new Date(),
          done: false,
          deleted: false
        })
      }
      state.editing = state.editing ? null : { text: ''}
     
    },
    selectTodo (state, selected) {
      state.unselect = null
      state.selected = selected
    },
    unselectTodo (state) {
      state.unselect = state.selected
      state.selected = null
    },
    nextTodo(state) {
      if(state.currentIndex < state.todos.length - 1) {
        state.currentIndex++
      }
    },
    prevTodo(state) {
      if(state.currentIndex > 0) {
        state.currentIndex--
      }
    },
    deleteTask(_, { task }) {
      task.deleted = true
    },

  },
  actions: {
  },
  modules: {
  }
})

export const now = new Date()
export const today = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate(),
  0,
  0,
  0
)
export const tomorrow = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate() + 1,
  0,
  0,
  0
)
