<template>

  <div
    class="generic-thumbnail"
    :style="{ backgroundColor: $themePalette.grey.v_200 }"
  >
    <KIcon
      :icon="iconKind"
      :color="$themePalette.grey.v_500"
      :style="{ minHeight: '50%', minWidth: '50%' }"
    />
  </div>

</template>


<script>

  export default {
    name: 'GenericThumbnail',
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    computed: {
      iconKind() {
        if (this.item.is_leaf) {
          return this.item.kind;
        } else {
          return 'topic';
        }
      },
    },
  };

</script>


<style lang="scss" scoped>

  .generic-thumbnail {
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
