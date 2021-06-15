<template>

  <div role="img" :class="containerClass">
    <div
      v-if="hasThumbnail"
      class="inside-thumbnail-container"
      :class="imageClass"
      :style="imageStyle"
    ></div>
    <GenericThumbnail
      v-else
      class="inside-thumbnail-container"
      :item="item"
      :small="$attrs.small"
    />
    <slot></slot>
    <span v-if="cornerLabel" class="corner-label">
      {{ cornerLabel }}
    </span>
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
      // Used to display the duration of the activity (e.g. "short activity", "5 minutes")
      cornerLabel: {
        type: String,
        required: false,
        default: null,
      },
    },
    computed: {
      hasThumbnail() {
        return Boolean(this.item.thumbnail);
      },
      containerClass() {
        const sizeClass = this.$attrs.small ? 'thumbnail-container-small' : 'thumbnail-container';
        return [sizeClass, this.containerComputedClass];
      },
      containerComputedClass() {
        return this.$computedClass({
          borderRadius: this.rounded && '4px',
          overflow: 'hidden',
        });
      },
      imageStyle() {
        return {
          backgroundImage: `url(${this.item.thumbnail})`,
        };
      },
      imageClass() {
        return this.$computedClass({
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
    position: relative;
    // aspect ratio hack
    height: 0;
    padding-top: 56.25%;

    .inside-thumbnail-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .corner-label {
      bottom: 8px;
      left: 8px;
      padding: 8px;
      font-size: 12px;
    }
  }

  .thumbnail-container-small {
    position: relative;
    width: 150px;
    height: 80px;

    .inside-thumbnail-container {
      width: 100%;
      height: 100%;
    }

    .corner-label {
      bottom: 6px;
      left: 6px;
      padding: 4px;
      font-size: 10px;
    }
  }

  .corner-label {
    position: absolute;
    color: white;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 4px;
  }

</style>
