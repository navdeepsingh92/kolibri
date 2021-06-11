<template>

  <div
    class="generic-thumbnail"
    :style="{ backgroundColor: $themePalette.grey.v_200 }"
  >
    <KIcon
      :icon="iconKind"
      :color="$themePalette.grey.v_500"
      class="icon"
      :class="{ 'icon-small': small }"
    />
  </div>

</template>


<script>

  import useLearningActivities from './useLearningActivities';

  export default {
    name: 'GenericThumbnail',
    setup() {
      const { defaultIconForResource } = useLearningActivities();
      return { defaultIconForResource };
    },
    props: {
      item: {
        type: Object,
        required: true,
      },
      small: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      iconKind() {
        if (this.item.is_leaf) {
          return this.defaultIconForResource(this.item);
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

  .icon {
    min-width: 56px;
    min-height: 56px;
    opacity: 0.5;
  }

  .icon-small {
    min-width: 24px;
    min-height: small;
  }

</style>
