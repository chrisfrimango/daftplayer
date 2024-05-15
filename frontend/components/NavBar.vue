<script setup>
const store = useDatabaseStore();
const { data: playlists, refresh } = await useFetch(
  "http://localhost:3001/api/playlists"
);

watch(
  () => store.playlist,
  () => {
    refresh();
  }
);
</script>

<template>
  <!-- använd invisble för att dölja menyn -->
  <div class="container h-full flex flex-col bg-secondary border-r-2 pl-6">
    <ul class="menu text-xl mt-8">
      <nuxt-link
        to="/"
        class="text-white mb-5 p-2 w-fit rounded active:text-gray-500 custom-effect"
        >Home</nuxt-link
      >
      <nuxt-link
        to="/allTracks"
        class="text-white mb-5 p-2 w-fit rounded active:text-gray-500 custom-effect"
        >Tracks</nuxt-link
      >

      <nuxt-link
        to="/favorites"
        class="text-white mb-5 p-2 w-fit rounded active:text-gray-500 custom-effect"
        >Favorites</nuxt-link
      >
      <nuxt-link
        to="/allAlbums"
        class="text-white mb-5 p-2 w-fit rounded active:text-gray-500 custom-effect"
        >Albums</nuxt-link
      >
      <nuxt-link
        to="/allPlaylists"
        class="text-white mb-5 p-2 w-fit rounded active:text-gray-500 custom-effect"
        >Playlists</nuxt-link
      >
    </ul>

    <div class="container flex flex-col h-full">
      <div class="flex flex-row w-full items-center pt-9 gap-3 mb-4">
        <h1 class="text-white text-2xl pl-2">My playlists</h1>

        <div class="menu">
          <nuxt-link to="/newPlaylist">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 512 512"
              class="hover:opacity-50 hover:stroke-pink-600 transform hover:scale-110"
            >
              <path
                fill="none"
                stroke="white"
                stroke-linecap="square"
                stroke-linejoin="round"
                stroke-width="32"
                d="M256 112v288m144-144H112"
              ></path>
            </svg>
          </nuxt-link>
        </div>
      </div>

      <ul class="menu w-fit text-zinc-300 p-0">
        <li v-for="(playlist, index) in playlists" :key="index">
          <nuxt-link
            :to="`/playlist/${playlist.playlistName}`"
            class="pl-2 mb-2 capitalize hover:text-pink-500 active:text-white hover:scale-110 cursor-pointer p-0 custom-effect2"
            >{{ playlist.playlistName }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.custom-effect:hover {
  /* -webkit-box-shadow: 0px 0px 105px 45px rgba(46, 63, 255, 0.9);
  -moz-box-shadow: 0px 0px 105px 45px rgba(46, 63, 255, 0.9);
  box-shadow: 0px 0px 105px 45px rgba(46, 63, 255, 0.9); */
  text-shadow: rgba(255, 255, 255, 1) 0px 0px 44px;

  text-decoration-line: underline;
  text-decoration-style: "solid";
  text-decoration-color: rgb(219, 47, 164);
  text-decoration-thickness: 10px;
}

.custom-effect2:hover {
  /* -webkit-box-shadow: 0px 0px 105px 45px rgba(46, 63, 255, 0.9);
  -moz-box-shadow: 0px 0px 105px 45px rgba(46, 63, 255, 0.9);
  box-shadow: 0px 0px 105px 45px rgba(46, 63, 255, 0.9); */
  text-shadow: rgba(255, 255, 255, 1) 0px 0px 44px;

  text-decoration-line: underline;
  text-decoration-style: "solid";
  text-decoration-color: rgb(219, 47, 164);
  text-decoration-thickness: 3px;
}
</style>
