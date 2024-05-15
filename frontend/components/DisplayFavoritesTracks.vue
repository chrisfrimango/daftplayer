<script setup>
const store = useDatabaseStore();
const getFavorites = async () => {
  const favorites = await $fetch("http://localhost:3001/api/favorite/all/true");
  return favorites;
};

const playlists = await $fetch("http://localhost:3001/api/playlists");
console.log(playlists);

const tracks = await $fetch("http://localhost:3001/api/tracksDetails");

const favorites = ref(await getFavorites());

const matchedTracksInfo = computed(() => {
  const tracksInfo = [];
  favorites.value.forEach((favorite) => {
    const matchingTrack = tracks.find(
      (track) => track.trackId === favorite.favoriteId
    );
    if (matchingTrack) {
      tracksInfo.push(matchingTrack);
      console.log("Matchande låt hittades för favoritId:", favorite.favoriteId);
    } else {
      console.log(
        "Ingen matchande låt hittades för favoritId:",
        favorite.favoriteId
      );
    }
  });
  console.log(tracksInfo);
  return tracksInfo;
});

const convertToMinutes = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

const toogleFavorites = async (trackId) => {
  console.log("TrackId:", trackId);
  try {
    const favorite = favorites.value.find(
      (favorite) => favorite.favoriteId === trackId
    );
    console.log(favorite);
    const bool = !favorite.favorite;
    console.log(bool);

    await $fetch(`http://localhost:3001/api/favorite/${trackId}/${bool}`, {
      method: "PUT",
      body: JSON.stringify({
        favoriteId: trackId,
        favorite: bool,
      }),
    });
    console.log(`Track ${trackId} favorited successfully.`);
    favorites.value = await getFavorites();
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
        <!-- row 1 -->
        <tr
          class="group text-white border-0 hover:bg-zinc-700 hover:bg-opacity-50"
          v-for="info in matchedTracksInfo"
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
            <svg
              class="h-5"
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <path
                fill="pink"
                d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z"
              ></path>
            </svg>
          </td>
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
                    "Remove from favorites"
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

<style scoped></style>
