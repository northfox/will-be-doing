<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-dark justify-content-between">
      <router-link class="navbar-brand" to="/">Will-Be-Doing</router-link>
      <button class="btn btn-light" onclick="location.reload(true)">動作検証</button>
    </nav>
    <router-view class="pt-2" />
  </div>
</template>

<style>
#app {
  text-align: center;
  background-color: #fff;
}
</style>
