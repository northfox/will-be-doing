<template>
  <div class="touches">
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
        <Touch
          :touch="touch"
          v-for="touch in touches"
          :key="touch.id"
          @itemIine="oneIine"
          @itemDone="oneDone"
          @itemRemove="oneRemove"
        ></Touch>
      </tbody>
    </table>
  </div>
</template>

<script>
import Touch from "@/components/Touch.vue";

export default {
  name: "Touches",
  components: {
    Touch
  },
  props: {
    touches: Array
  },
  methods: {
    oneIine: function(id) {
      this.touches[id].star += 1;
      this.$emit("oneUpdate", id, "whoami");
    },
    oneDone: function(id) {
      let doneBy = prompt("誰がやった？") || "";
      this.touches[id].done_at = this.$dayjs().format("YYYY/MM/DD");
      this.touches[id].done_by = doneBy;
      this.$emit("oneUpdate", id, doneBy);
    },
    oneRemove: function(id) {
      if (confirm("本当に削除する？")) {
        this.touches.splice(id, 1);
      }
    }
  }
};
</script>
