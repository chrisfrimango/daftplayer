<script setup>
import { onMounted } from "vue";

const { data: albums, refresh } = await useFetch(
  "http://localhost:3001/api/albums"
);

console.log(albums.value);

onMounted(() => {
  refresh();
});
</script>

<template>
  <div class="ml-9 mt-5 mr-9">
    <table class="w-3/6">
      <tbody>
        <!-- row 1 -->
        <tr class="text-white" v-for="(album, index) in albums" :key="index">
          <td class="pb-6">
            <nuxt-link :to="`/album/${album.albumTitle}`">
              <img
                :src="`${album.albumCoverUrl}`"
                class="w-40 h-40 rounded-lg object-cover hover:opacity-50 cursor-pointer"
              />
            </nuxt-link>
          </td>
          <td>
            <nuxt-link
              :to="`/album/${album.albumTitle}`"
              class="pl-2 capitalize hover:text-white active:text-white hover:scale-110 cursor-pointer"
            >
              {{ album.albumTitle }}
            </nuxt-link>
          </td>
          <td>
            {{ album.albumYear }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
