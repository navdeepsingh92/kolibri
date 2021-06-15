<template>

  <div role="img" :class="containerClass" class="thumbnail-container">
    <div v-if="hasThumbnail" :class="imageClass"></div>
    <GenericThumbnail v-else :item="item" />
    <slot></slot>
  </div>

</template>


<script>

  import GenericThumbnail from './GenericThumbnail.vue';

  // The thumbnail takes an `item` prop that can be a ContentNode,
  // Quiz, or Lesson and shows either the thumbnail or a generic graphic.
  // The size of the thumbnail should be controlled by its parent.
  // It has a default slot that can be used to place overlays
  export default {
    name: 'Thumbnail',
    components: {
      GenericThumbnail,
    },
    props: {
      rounded: {
        type: Boolean,
        default: true,
      },
      // `item` can be a ContentNode, Quiz, or Lesson
      item: {
        type: Object,
        required: true,
      },
    },
    computed: {
      hasThumbnail() {
        return this.item.thumbnail;
      },
      containerClass() {
        return this.$computedClass({
          borderRadius: this.rounded && '4px',
          overflow: 'hidden',
        });
      },
      imageClass() {
        return this.$computedClass({
          backgroundImage: `url(${this.item.thumbnail})`,
          backgroundColor: this.$themePalette.grey.v_200,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        });
      },
    },
  };

</script>


<style lang="scss" scoped>

  .thumbnail-container {
    > * {
      width: 100%;
      height: 100%;
    }
  }

</style>
