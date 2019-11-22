<template>
  <div class="todos">
    <table class="table table-sm table-bordered">
      <thead class="thead-light">
        <tr>
          <th
            :class="{
              sortingAsc: sortingObject === 'id' && !isSortingDesc,
              sortingDesc: sortingObject === 'id' && isSortingDesc
            }"
            @click="setSortingObject('id')"
          >
            #
          </th>
          <th
            :class="{
              sortingAsc: sortingObject === 'content' && !isSortingDesc,
              sortingDesc: sortingObject === 'content' && isSortingDesc
            }"
            class="todo-content"
            @click="setSortingObject('content')"
          >
            内容
          </th>
          <th
            :class="{
              sortingAsc: sortingObject === 'iine' && !isSortingDesc,
              sortingDesc: sortingObject === 'iine' && isSortingDesc
            }"
            @click="setSortingObject('iine')"
          >
            いいね
          </th>
          <th
            :class="{
              sortingAsc: sortingObject === 'priority' && !isSortingDesc,
              sortingDesc: sortingObject === 'priority' && isSortingDesc
            }"
            @click="setSortingObject('priority')"
          >
            優先度
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <Todo :todo="todo" v-for="todo in todos" :key="todo.id" @update="todoUpdate" @itemRemove="todoRemove"></Todo>
      </tbody>
    </table>
  </div>
</template>

<script>
import Todo from '@/components/Todo.vue'

export default {
  name: 'Todos',
  components: {
    Todo
  },
  props: {
    todos: Array,
    sortingObject: String,
    isSortingDesc: Boolean
  },
  methods: {
    todoUpdate: function(id) {
      // TODO Who is updatedBy
      this.$emit('oneUpdate', id, 'whoami')
    },
    todoRemove: function(id) {
      if (confirm('本当に削除する？')) {
        // TODO Who is updatedBy
        this.$emit('oneRemove', id, 'whoami')
      }
    },
    setSortingObject: function(object) {
      this.$emit('setSortingObject', object)
    }
  }
}
</script>

<style>
.todo-content {
  min-width: 150px;
  max-width: 550px;
  word-break: break-word;
}
.btn-content {
  max-width: 100px;
}
.sortingDesc:after {
  content: '▼';
}
.sortingAsc:after {
  content: '▲';
}
</style>
