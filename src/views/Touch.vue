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
                v-model="touch.content"
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
          <Touches :touches="touches" @oneUpdate="itemUpdate"></Touches>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Touches from "@/components/Touches.vue";

const STORAGE_KEY = "will-be-doing";
let touchesRepository = {
  fetch: function() {
    let touches = JSON.parse(localStorage.getItem(STORAGE_KEY) || []);
    touches.forEach((touch, index) => {
      touch.id = index;
    });
    touches.uid = touches.length;
    return touches;
  },
  save: function(touches) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(touches));
  },
  remove: function(index) {
    let touches = this.fetch();
    touches.splice(index, 1);
    this.save(touches);
  }
};

export default {
  name: "touches",
  components: {
    Touches
  },
  data: function() {
    return {
      filterSense: "触りたいもの",
      touches: [
        {
          id: 0,
          content: "内容",
          star: 0,
          sense: "touch",
          created_at: "2019/10/01",
          created_by: "K",
          updated_at: "2019/10/25",
          updated_by: "A",
          done_at: "2019/11/01",
          done_by: ["A", "K"]
        }
      ],
      touch: {
        id: 0,
        content: "",
        star: 0,
        sense: "",
        created_at: "",
        created_by: "",
        updated_at: "",
        updated_by: "",
        done_at: "",
        done_by: []
      }
    };
  },
  mounted() {
    this.touches = touchesRepository.fetch();
  },
  watch: {
    touches: {
      handler: function(newTouches) {
        touchesRepository.save(newTouches);
      },
      deep: true
    }
  },
  methods: {
    itemSave: function() {
      let touch = {
        id: this.touches.length,
        content: this.touch.content,
        star: 0,
        created_at: this.$dayjs().format("YYYY/MM/DD"),
        created_by: "K",
        updated_at: this.$dayjs().format("YYYY/MM/DD"),
        updated_by: "K",
        done_at: null,
        done_by: null
      };
      this.touches.push(touch);
      this.touch = {};
      return;
    },
    itemUpdate: function(id, user) {
      this.touches[id].updated_at = this.$dayjs().format("YYYY/MM/DD");
      this.touches[id].updated_by = user;
      return;
    }
  }
};
</script>
