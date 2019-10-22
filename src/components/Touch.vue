<template>
  <tr>
    <td>{{ touch.id }}</td>
    <td>{{ touch.content }}</td>
    <td>
      <svg
        class="i-heart"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="32"
        height="32"
        fill="none"
        stroke="currentcolor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        @click="iine(touch.id)"
      >
        <path
          d="M4 16 C1 12 2 6 7 4 12 2 15 6 16 8 17 6 21 2 26 4 31 6 31 12 28 16 25 20 16 28 16 28 16 28 7 20 4 16 Z"
        />
      </svg>
      {{ touch.star }}
    </td>
    <td>{{ touch.done_at }}</td>
    <td>{{ touch.done_by }}</td>
    <td>
      <button class="btn btn-sm btn-success" @click="done(touch.id)">
        Done
      </button>
    </td>
    <td>
      <button class="btn btn-sm btn-danger" @click="remove(touch.id)">
        Delete
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "Touch",
  props: {
    touch: Object
  },
  methods: {
    iine: function(id) {
      this.$emit("itemIine", id);
    },
    done: function(id) {
      this.$emit("itemDone", id);
    },
    remove: function(id) {
      this.$emit("itemRemove", id);
    }
  }
};
</script>

<style>
.i-heart:hover {
  color: #faaaaa;
}
</style>
