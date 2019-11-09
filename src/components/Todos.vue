<template>
  <div class="todos">
    <table class="table table-sm table-bordered">
      <thead class="thead-light">
        <tr>
          <th
            :class="{ sorting: sortingObject === 'id' }"
            @click="setSortingObject('id')"
          >
            #
          </th>
          <th
            :class="{ sorting: sortingObject === 'content' }"
            class="todo-content"
            @click="setSortingObject('content')"
          >
            内容
          </th>
          <th
            :class="{ sorting: sortingObject === 'iine' }"
            @click="setSortingObject('iine')"
          >
            いいね
          </th>
          <th
            :class="{ sorting: sortingObject === 'priority' }"
            @click="setSortingObject('priority')"
          >
            優先度
          </th>
          <th>完了日</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <Todo
          :todo="todo"
          v-for="todo in todos"
          :key="todo.id"
          @update="todoUpdate"
          @itemRemove="todoRemove"
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
    todos: Array,
    sortingObject: String
  },
  methods: {
    todoUpdate: function(id) {
      // TODO Who is updatedBy
      this.$emit("oneUpdate", id, "whoami");
    },
    todoRemove: function(id) {
      if (confirm("本当に削除する？")) {
        // TODO Who is updatedBy
        this.$emit("oneRemove", id, "whoami");
      }
    },
    setSortingObject: function(object) {
      this.$emit("setSortingObject", object);
    }
  }
};
</script>

<style>
.todo-content {
  min-width: 200px;
}
.btn-content {
  max-width: 100px;
}
.sorting:after {
  content: "▼";
}
</style>
