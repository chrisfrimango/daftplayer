<script setup></script>

<template>
  <div class="flex flex-col h-full items-center pt-2">
    <div class="img-container relative">
      <img class="rounded opacity-75" src="/frontimg.svg" alt="" />
      <h1
        class="text-5xl p-1 uppercase w-fit text-nowrap text-white absolute inset-unset top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 custom-effect"
      >
        Daft Punk player
      </h1>
    </div>
  </div>
</template>

<style scoped>
.custom-effect {
  text-shadow: rgba(255, 255, 255, 1) 0px 0px 20px;
  text-shadow: rgba(242, 111, 155, 0.66) -6px -5px 10px;
  -webkit-box-shadow: 0px 0px 105px 45px rgba(45, 255, 196, 0.9);
  -moz-box-shadow: 0px 0px 105px 45px rgba(45, 255, 196, 0.9);
  box-shadow: 0px 0px 105px 45px rgba(45, 255, 196, 0.9);
}
</style>
