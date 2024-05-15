<script setup>
const store = useDatabaseStore();
const tracks = await $fetch("http://localhost:3001/api/tracksDetails");

const playlists = await $fetch("http://localhost:3001/api/playlists");
console.log(playlists);

console.log(tracks);

const convertToMinutes = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

const getFavorites = async () => {
  const favorites = await $fetch("http://localhost:3001/api/favorite/all/true");
  return favorites;
};

const getAlbumTracksWithFavorites = async () => {
  const favorites = await getFavorites();
  return tracks.map((track) => {
    const favorite = favorites.find((fav) => fav.favoriteId === track.trackId);
    return { ...track, favorite: favorite ? favorite.favorite : false };
  });
};

// Använd sedan denna funktion för att få albumTracks med favoritinformation
const albumTracksWithFavorites = ref(await getAlbumTracksWithFavorites());
console.log(albumTracksWithFavorites);

const toogleFavorites = async (trackId) => {
  console.log("TrackId:", trackId);
  try {
    const favorites = await $fetch("http://localhost:3001/api/favorite");
    console.log(favorites);

    const favorite = favorites.find(
      (favorite) => favorite.favoriteId === trackId
    );
    console.log(favorite);
    const bool = !favorite.favorite;

    await $fetch(`http://localhost:3001/api/favorite/${trackId}/${bool}`, {
      method: "PUT",
      body: JSON.stringify({
        favoriteId: trackId,
        favorite: bool,
      }),
    });
    console.log(`Track ${trackId} favorited successfully.`);
    albumTracksWithFavorites.value = await getAlbumTracksWithFavorites();
  } catch (error) {
    console.error(error);
  }
};

const addTrackToPlaylist = async (trackId, playlistId) => {
  console.log("TrackId:", trackId);
  console.log("PlaylistId:", playlistId);
  try {
    const data = await $fetch(`http://localhost:3001/api/playlist`, {
      method: "POST",
      body: JSON.stringify({
        trackPlaylistT_id: trackId,
        trackPlaylistP_id: playlistId,
      }),
    });
    console.log(
      `Track ${trackId} added to playlist ${playlistId} successfully.`
    );
    store.playlist = !store.playlist;
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="container p-8">
    <table class="table">
      <!-- head -->
      <thead class="text-white">
        <tr class="border-0">
          <th class="invisible">play</th>
          <!-- <th class="invisible">Track</th> -->
          <th>Track</th>
          <th>Artist</th>
          <th>Album</th>
          <th class="invisible">Duration</th>
          <th class="invisible">favorite</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="group text-white border-0 hover:bg-zinc-700 hover:bg-opacity-50"
          v-for="info in albumTracksWithFavorites"
          :key="info.trackId"
        >
          <td>
            <label class="swap swap-rotate text-xl">
              <!-- this hidden checkbox controls the state -->
              <input type="checkbox" />

              <div class="swap-off">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  class="hover:scale-110 active:text-lime-300"
                >
                  <path
                    fill="none"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986z"
                  ></path>
                </svg>
              </div>
              <div class="swap-on">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  class="hover:text-lime-300 active:text-lime-300"
                >
                  <path
                    fill="currentColor"
                    d="M14 19V5h4v14zm-8 0V5h4v14z"
                  ></path>
                </svg>
              </div>
            </label>
          </td>
          <td>
            <div class="flex items-center gap-3 text-white">
              <div>
                <div class="font-bold">{{ info.trackName }}</div>
              </div>
            </div>
          </td>
          <td>{{ info.actName }}</td>
          <td>
            <nuxt-link
              class="hover:scale-125 font-semibold"
              :to="`/album/${info.albumTitle}`"
              >{{ info.albumTitle }}</nuxt-link
            >
          </td>
          <td>{{ convertToMinutes(info.trackLength) }}</td>

          <td>
            <div class="dropdown dropdown-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 16 16"
                tabindex="0"
                role="button"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M3 9.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M9.5 8a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m5 0a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"
                  clipRule="evenodd"
                ></path>
              </svg>

              <ul
                tabindex="0"
                class="dropdown-content z-[1] menu p-2 shadow bg-secondary text-white rounded-box w-52"
              >
                <li>
                  <a @click="toogleFavorites(info.trackId)">{{
                    info.favorite ? "Remove from favorites" : "Add to favorites"
                  }}</a>
                </li>
                <li>
                  <details closed>
                    <summary>Add to playlist</summary>
                    <ul>
                      <li
                        v-for="playlist in playlists"
                        :key="playlist.playlistId"
                      >
                        <a
                          @click="
                            addTrackToPlaylist(
                              info.trackId,
                              playlist.playlistId
                            )
                          "
                          >{{ playlist.playlistName }}</a
                        >
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
::-webkit-scrollbar-thumb {
  background: #888; /* Färg på scrollbaren */
  border-radius: 5px; /* Rundade hörn på scrollbaren */
}
</style>
