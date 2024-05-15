<script setup>
const store = useDatabaseStore();
const { data: tracks } = await useFetch("http://localhost:3001/api/tracks");

const props = defineProps({
  playlistTitle: String,
});

const convertToMinutes = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

const addTrackToPlaylist = async (_trackId) => {
  const playlists = await $fetch("http://localhost:3001/api/playlists");
  console.log(playlists);

  const playlist = playlists.find(
    (playlist) => playlist.playlistName === props.playlistTitle
  );

  console.log(playlist);
  console.log(props.playlistTitle);
  console.log(_trackId);

  try {
    const data = await $fetch(`http://localhost:3001/api/playlist`, {
      method: "POST",
      body: {
        trackPlaylistT_id: _trackId,
        trackPlaylistP_id: playlist.playlistId,
      },
    });
    store.playlist = !store.playlist;
    console.log("posted");
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="container p-8">
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead class="text-white">
          <tr class="border-0">
            <th>Track</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Duration</th>
            <th class="invisible">favorite</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr
            class="group text-white border-0 hover:bg-zinc-700 hover:bg-opacity-50"
            v-for="(track, index) in tracks"
            :key="index"
          >
            <td>
              <div class="flex items-center gap-3 text-white">
                <div>
                  <div class="font-bold">{{ track.trackName }}</div>
                </div>
              </div>
            </td>
            <td>{{ track.actName }}</td>
            <td>
              <nuxt-link
                class="hover:scale-125 font-semibold"
                :to="`/album/${track.albumTitle}`"
                >{{ track.albumTitle }}</nuxt-link
              >
            </td>
            <td>{{ convertToMinutes(track.trackLength) }}</td>
            <td>
              <button
                class="btn btn-outline btn-primary"
                @click="addTrackToPlaylist(track.trackId)"
              >
                Add to Playlist
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
