<template>
  <div class="touches">
    <table class="table table-sm table-bordered">
      <thead class="thead-light">
        <tr>
          <th>#</th>
          <th>タイトル</th>
          <th>内容</th>
          <th>いいね数</th>
          <th>完了日</th>
          <th>完了者</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <Touch :touch="touch" v-for="touch in touches" :key="touch.id"></Touch>
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
  }
};
</script>
