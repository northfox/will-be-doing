<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="navbar-nav">
        <router-link class="navbar-brand" to="/">Will-Be-Doing</router-link>
      </div>
    </nav>
    <router-view class="pt-4" />
  </div>
</template>

<style>
#app {
  text-align: center;
  background-color: #fcfcfc;
}
</style>
