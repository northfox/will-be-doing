<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="navbar-nav">
        <router-link class="navbar-brand" to="/">Will-Be-Doing</router-link>
        <router-link class="nav-link" exact-active-class="active" to="/touch"
          >触りたいもの</router-link
        >
        <router-link class="nav-link" exact-active-class="active" to="/taste"
          >食べたいもの</router-link
        >
        <router-link class="nav-link" exact-active-class="active" to="/hearing"
          >聴きたいもの</router-link
        >
        <router-link class="nav-link" exact-active-class="active" to="/eyesight"
          >見たいもの</router-link
        >
        <router-link class="nav-link" exact-active-class="active" to="/smell"
          >嗅ぎたいもの</router-link
        >
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  text-align: center;
}
</style>
