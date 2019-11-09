<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="navbar-nav">
        <router-link class="navbar-brand" to="/">Will-Be-Doing</router-link>
        <router-link
          class="nav-link"
          exact-active-class="active"
          to="/todos/all"
        >
          全部</router-link
        >
        <router-link
          class="nav-link"
          exact-active-class="active"
          to="/todos/touch"
        >
          触りたいもの</router-link
        >
        <router-link
          class="nav-link"
          exact-active-class="active"
          to="/todos/taste"
          >食べたいもの</router-link
        >
        <router-link
          class="nav-link"
          exact-active-class="active"
          to="/todos/hearing"
          >聴きたいもの</router-link
        >
        <router-link
          class="nav-link"
          exact-active-class="active"
          to="/todos/eyesight"
          >見たいもの</router-link
        >
        <router-link
          class="nav-link"
          exact-active-class="active"
          to="/todos/smell"
          >嗅ぎたいもの</router-link
        >
      </div>
    </nav>
    <router-view class="p-3" />
  </div>
</template>

<style>
#app {
  text-align: center;
  background-color: #fcfcfc;
}
</style>
