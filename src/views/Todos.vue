<template>
  <div class="container">
    <div class="row mb-2">
      <div class="col">
        <section>
          <form class="input-group">
            <div class="input-group-prepend">
              <select id="filteringSense" class="custom-select" v-model="filterSense">
                <option value="all">全部</option>
                <option value="touch">触りたい</option>
                <option value="taste">食べたい</option>
                <option value="hearing">聴きたい</option>
                <option value="eyesight">見たい</option>
                <option value="smell">嗅ぎたい</option>
              </select>
            </div>
            <input
              id="content"
              type="text"
              class="form-control form-control"
              required="required"
              v-model="todo.content"
              v-focus
            />
            <div class="input-group-append">
              <button class="btn btn-primary" @click="itemSave">追加</button>
            </div>
          </form>
        </section>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <section>
          <Todos
            :todos="filteredSortedTodos"
            :sortingObject="sortingObject"
            :isSortingDesc="isSortingDesc"
            @oneUpdate="itemUpdate"
            @oneRemove="itemRemove"
            @setSortingObject="setSortingObject"
          ></Todos>
        </section>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button class="btn btn-sm btn-secondary" @click="saveBackup">バックアップに保存</button>
        <button class="btn btn-sm btn-outline-secondary m-2" @click="loadBackup">バックアップの読み込み</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Todos from '@/components/Todos.vue'

const STORAGE_KEY = 'will-be-doing'
let todosRepository = {
  fetch: function() {
    let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach((todo, index) => {
      todo.id = index
    })
    todosRepository.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  },
  remove: function(index) {
    let todos = this.fetch()
    todos.splice(index, 1)
    this.save(todos)
  }
}

const filterSenses = [
  { label: '全部', value: 'all' },
  { label: '触りたいもの', value: 'touch' },
  { label: '食べたいもの', value: 'taste' },
  { label: '聴きたいもの', value: 'hearing' },
  { label: '見たいもの', value: 'eyesight' },
  { label: '嗅ぎたいもの', value: 'smell' }
]

export default {
  name: 'all',
  components: {
    Todos: Todos
  },
  data: function() {
    return {
      filterSense: 'all',
      sortingObject: 'id',
      isSortingDesc: true,
      todos: [],
      todo: {
        id: 0,
        taste: this.$route.params.sense,
        content: '',
        iine: 0,
        priority: 0,
        sense: '',
        created_at: '',
        created_by: '',
        updated_at: '',
        updated_by: '',
        deleted_at: null,
        deleted_by: null,
        done_at: null,
        done_by: null
      }
    }
  },
  mounted() {
    this.todos = todosRepository.fetch()
  },
  watch: {
    todos: {
      handler: function(newTodos) {
        todosRepository.save(newTodos)
      },
      deep: true
    }
  },
  methods: {
    itemSave: function() {
      let content = this.todo.content && this.todo.content.trim()
      if (!content) {
        return
      }
      let todo = {
        id: todosRepository.uid++,
        sense: this.filterSense,
        content: content,
        iine: 0,
        priority: 0,
        created_at: this.$dayjs().format(this.$constsnts.dateFormat),
        created_by: 'K',
        updated_at: this.$dayjs().format(this.$constsnts.dateFormat),
        updated_by: 'K',
        deleted_at: null,
        deleted_by: null,
        done_at: null,
        done_by: null
      }
      this.todos.push(todo)
      this.todo = {}
      return
    },
    itemUpdate: function(id, user) {
      this.todos.forEach((todo) => {
        if (todo.id === id) {
          todo.updated_at = this.$dayjs().format(this.$constsnts.dateFormat)
          todo.updated_by = user
        }
      })
      return
    },
    itemRemove: function(id, user) {
      this.todos.forEach((todo) => {
        if (todo.id === id) {
          todo.deleted_at = this.$dayjs().format(this.$constsnts.dateFormat)
          todo.deleted_by = user
          this.itemUpdate(id, user)
        }
      })
      return
    },
    setSortingObject: function(object) {
      if (this.sortingObject === object) {
        this.isSortingDesc = !this.isSortingDesc
      }
      this.sortingObject = object
    },
    saveBackup: function() {
      let keyword = prompt('読み込み時に使うキーワードを登録してください。')
      this.$axios
        .post(`/app/will_be_doing/api/v1/backups/${keyword}`, this.todos)
        .then(() => {
          alert(`バックアップが成功しました。 [keyword: ${keyword}]`)
        })
        .catch((err) => {
          alert(`バックアップに失敗しました。 [error: ${err}]`)
        })
    },
    loadBackup: function() {
      let keyword = prompt('バックアップ時のキーワードを指定してください。')
      this.$axios
        .get(`/app/will_be_doing/api/v1/backups/${keyword}`)
        .then((result) => {
          this.todos = result.data
        })
        .catch((err) => {
          alert(`バックアップに失敗しました。 [error: ${err}]`)
        })
    }
  },
  computed: {
    filteredSortedTodos: function() {
      let todos = this.todos.filter((t) => t.deleted_at === null)
      todos.sort((a) => (a.done_at !== null ? 1 : -1))
      todos = todos
        .filter((t) => t.done_at === null)
        .sort((a, b) => {
          if (this.isSortingDesc) {
            return a[this.sortingObject] < b[this.sortingObject] ? 1 : -1
          } else {
            return a[this.sortingObject] > b[this.sortingObject] ? 1 : -1
          }
        })
        .concat(todos.filter((t) => t.done_at !== null))

      if (this.filterSense === 'all') {
        return todos
      }
      return todos.filter((t) => t.sense === filterSenses.find((s) => s.value === this.filterSense).value)
    }
  },
  directives: {
    focus: {
      update: function(el) {
        el.focus()
      }
    }
  }
}
</script>
