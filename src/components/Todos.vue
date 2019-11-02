<template>
  <div class="todos">
    <table class="table table-sm table-bordered">
      <thead class="thead-light">
        <tr>
          <th>#</th>
          <th>内容</th>
          <th>いいね数</th>
          <th>完了日</th>
          <th>完了者</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <Todo
          :todo="todo"
          v-for="todo in todos"
          :key="todo.id"
          @update="todoUpdate"
          @itemRemove="oneRemove"
        ></Todo>
      </tbody>
    </table>
  </div>
</template>

<script>
import Todo from "@/components/Todo.vue";

export default {
  name: "Todos",
  components: {
    Todo
  },
  props: {
    todos: Array
  },
  methods: {
    todoUpdate: function(id) {
      // TODO Who is updatedBy
      this.$emit("oneUpdate", id, "whoami");
    },
    oneRemove: function(id) {
      if (confirm("本当に削除する？")) {
        this.todos.splice(id, 1);
      }
    }
  }
};
</script>
