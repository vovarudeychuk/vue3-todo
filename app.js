const App = {
  data: () => ({
    title: 'To-do',
    placeholderApp: 'Type somesing',
    inputValue: '',
    minLiterals: 6,
    tasks: [
      { name: 'first task', updating: false, checked: true, id: 3231 },
      { name: 'task', updating: false, checked: false, id: 22323 },
    ],
    isDone: { all: false, isFinish: false },
  }),
  methods: {
    addTodo(event) {
      if (this.inputValue.length >= this.minLiterals) {
        this.tasks.push({
          name: this.capitalize(this.inputValue),
          checked: false,
          id: Date.now(),
        })
        this.inputValue = ''
        event.target.offsetParent.childNodes[0].focus()
      }
    },
    removeTodo(i) {
      this.tasks.splice(i, 1)
    },
    renameTodo(i) {
      this.tasks.filter((a) => a.id === i)[0].updating = true
      this.$nextTick(() => {
        // .focus()
        this.moveCursorToEnd(this.$refs['field-' + i])
      })
    },
    onSave(event, i) {
      this.tasks.filter((a) => a.id === i)[0].updating = false
      if (event) {
        event.preventDefault()
        event.target.blur()
      }

      this.tasks.filter((a) => a.id === i)[0].name = this.capitalize(
        this.$refs['field-' + i].outerText
      ).trim()
    },
    moveCursorToEnd(el) {
      el.focus()
      if (
        typeof window.getSelection != 'undefined' &&
        typeof document.createRange != 'undefined'
      ) {
        let range = document.createRange()
        range.selectNodeContents(el)
        range.collapse(false)
        let sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
      } else if (typeof document.body.createTextRange != 'undefined') {
        let textRange = document.body.createTextRange()
        textRange.moveToElementText(el)
        textRange.collapse(false)
        textRange.select()
      }
    },
    capitalize(s) {
      if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
    },
  },
}

const app = Vue.createApp(App)

app.mount('#app')
