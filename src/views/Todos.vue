<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>{{ filterSense }}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <section>
          <form>
            <div class="form-group">
              内容
              <input
                type="text"
                class="form-control form-control-sm"
                required="required"
                v-model="todo.content"
                v-focus
              />
            </div>
            <button class="btn btn-primary btn-sm" @click="itemSave">
              新規追加
            </button>
          </form>
        </section>
      </div>
    </div>
    <div class="row pt-3">
      <div class="col">
        <section>
          <h2>一覧</h2>
          <Todos
            :todos="filteredSortedTodos"
            @oneUpdate="itemUpdate"
            @oneRemove="itemRemove"
          ></Todos>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Todos from "@/components/Todos.vue";

const STORAGE_KEY = "will-be-doing";
let todosRepository = {
  fetch: function() {
    let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || []);
    todos.forEach((todo, index) => {
      todo.id = index;
    });
    todosRepository.uid = todos.length;
    return todos;
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
  remove: function(index) {
    let todos = this.fetch();
    todos.splice(index, 1);
    this.save(todos);
  }
};

export default {
  name: "all",
  components: {
    Todos: Todos
  },
  data: function() {
    return {
      filterSense: "WillBeDoing",
      todos: [
        {
          id: 0,
          taste: this.$route.params.sense,
          content: "ダミー内容",
          star: 0,
          sense: "todo",
          created_at: "2019/10/01",
          created_by: "K",
          updated_at: "2019/10/25",
          updated_by: "A",
          deleted_at: null,
          deleted_by: null,
          done_at: "2019/11/01",
          done_by: ["A", "K"]
        }
      ],
      todo: {
        id: 0,
        taste: this.$route.params.sense,
        content: "",
        star: 0,
        sense: "",
        created_at: "",
        created_by: "",
        updated_at: "",
        updated_by: "",
        deleted_at: null,
        deleted_by: null,
        done_at: null,
        done_by: null
      }
    };
  },
  mounted() {
    this.todos = todosRepository.fetch();
  },
  watch: {
    todos: {
      handler: function(newTodos) {
        todosRepository.save(newTodos);
      },
      deep: true
    }
  },
  methods: {
    itemSave: function() {
      let content = this.todo.content && this.todo.content.trim();
      if (!content) {
        return;
      }
      let todo = {
        id: todosRepository.uid++,
        sense: this.$route.params.sense,
        content: content,
        star: 0,
        created_at: this.$dayjs().format("YYYY/MM/DD"),
        created_by: "K",
        updated_at: this.$dayjs().format("YYYY/MM/DD"),
        updated_by: "K",
        deleted_at: null,
        deleted_by: null,
        done_at: null,
        done_by: null
      };
      this.todos.push(todo);
      this.todo = {};
      return;
    },
    itemUpdate: function(id, user) {
      this.todos.forEach(todo => {
        if (todo.id === id) {
          todo.updated_at = this.$dayjs().format("YYYY/MM/DD");
          todo.updated_by = user;
        }
      });
      return;
    },
    itemRemove: function(id, user) {
      this.todos.forEach(todo => {
        if (todo.id === id) {
          todo.deleted_at = this.$dayjs().format("YYYY/MM/DD");
          todo.deleted_by = user;
          this.itemUpdate(id, user);
        }
      });
      return;
    }
  },
  computed: {
    filteredSortedTodos: function() {
      let todos = this.todos.filter(t => t.deleted_at === null);
      todos.sort(a => (a.done_at !== null ? 1 : -1));

      if (this.$route.params.sense === "all") {
        return todos;
      }
      return todos.filter(t => t.sense === this.$route.params.sense);
    }
  },
  directives: {
    focus: {
      update: function(el) {
        el.focus();
      }
    }
  }
};
</script>
