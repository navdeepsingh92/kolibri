<template>

  <div
    v-if="progress !== null && progress !== 0"
    class="progress-bar-wrapper"
    :style="{ backgroundColor: $themePalette.grey.v_200 }"
    role="progressbar"
    :aria-valuenow="progress * 100"
  >
    <div
      class="progress-bar"
      :style="{
        width: `${progress * 100}%`,
        backgroundColor: progress === 1 ?
          $themeTokens.mastered : (progress > 0 ? $themeTokens.progress : ''),
      }"
    >
    </div>
  </div>

</template>


<script>

  export default {
    name: 'ProgressBar',
    props: {
      progress: {
        type: Number,
        required: false,
        default: null,
      },
    },
  };

</script>


<style lang="scss" scoped>

  .progress-bar-wrapper {
    height: 4px;
    overflow: hidden;
    border-radius: 4px;
    opacity: 0.9;

    .progress-bar {
      height: 100%;
    }
  }

</style>
