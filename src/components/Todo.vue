<template>
  <tr :class="{ done: todo.done_at !== null }">
    <td>{{ todo.id }}</td>
    <td class="todo-content" @click="isContentEditable = true">
      <span v-if="isContentEditable">
        <input
          type="text"
          class="form-control form-control-sm"
          v-model="todo.content"
          @blur="isContentEditable = false"
          @keypress.enter="isContentEditable = false"
          v-focus
        />
      </span>
      <span v-else>{{ todo.content }}</span>
    </td>
    <td>
      <svg
        class="i-heart"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="32"
        height="32"
        fill="none"
        stroke="#febbbb"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1"
        @click="iine(todo.id)"
      >
        <path
          d="M4 16 C1 12 2 6 7 4 12 2 15 6 16 8 17 6 21 2 26 4 31 6 31 12 28 16 25 20 16 28 16 28 16 28 7 20 4 16 Z"
        />
      </svg>
      {{ todo.iine }}
    </td>
    <td>
      <svg
        class="i-star"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="32"
        height="32"
        fill="none"
        stroke="#f0d000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1"
        @click="prioritize(todo.id)"
      >
        <path d="M16 2 L20 12 30 12 22 19 25 30 16 23 7 30 10 19 2 12 12 12 Z" />
      </svg>
      {{ todo.priority }}
    </td>
    <td class="btn-content">
      <button class="btn btn-sm btn-outline-success" @click="done(todo.id)">Done</button>
      <button class="btn btn-sm btn-outline-danger ml-1" @click="remove(todo.id)">Delete</button>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'Todo',
  props: {
    todo: Object
  },
  data: function() {
    return {
      isContentEditable: false
    }
  },
  methods: {
    iine: function(id) {
      this.todo.iine++
      this.$emit('update', id)
    },
    prioritize: function(id) {
      this.todo.priority++
      this.$emit('update', id)
    },
    done: function(id) {
      let doneBy = prompt('誰がやった？') || 'anonymous'
      this.todo.done_at = this.$dayjs().format(this.$constsnts.dateFormat)
      this.todo.done_by = doneBy
      this.$emit('update', id)
    },
    remove: function(id) {
      this.$emit('itemRemove', id)
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      }
    }
  }
}
</script>

<style scoped>
.i-heart:hover {
  fill: #faaaaa;
}
.i-star:hover {
  fill: #ffdd00;
}
.done {
  color: lightgray;
  text-decoration: line-through;
}
</style>
