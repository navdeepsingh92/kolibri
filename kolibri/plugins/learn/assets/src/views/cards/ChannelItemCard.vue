<template>

  <CardLink :to="to" role="gridcell">
    <div class="channel-item">
      <div class="header" :style="headerStyle">
        <ActivityLabel
          :item="item"
          :color="iconColor"
        />
      </div>
      <Thumbnail :item="item" class="thumb" :rounded="false" />
      <div class="details" role="heading" aria-level="3" dir="auto">
        {{ item.title }}
      </div>
      <div class="actions">
        <!-- TODO put info button, and coach icon here -->
        <template v-if="item.is_leaf">
          <ProgressBar :progress="item.progress" class="prog-bar" />
        </template>
      </div>
    </div>
  </CardLink>

</template>


<script>

  import CardLink from './CardLink.vue';
  import Thumbnail from './Thumbnail.vue';
  import ActivityLabel from './ActivityLabel.vue';
  import ProgressBar from './ProgressBar.vue';

  export default {
    name: 'ChannelItemCard',
    components: {
      ActivityLabel,
      CardLink,
      Thumbnail,
      ProgressBar,
    },
    props: {
      to: {
        type: Object,
        required: true,
      },
      item: {
        type: Object,
        required: true,
      },
    },
    computed: {
      iconColor() {
        return this.item.is_leaf ? this.$themeTokens.text : this.$themeTokens.textInverted;
      },
      headerStyle() {
        if (!this.item.is_leaf) {
          return {
            backgroundColor: this.$themeTokens.topic,
            color: this.$themeTokens.textInverted,
          };
        }
        return {};
      },
    },
  };

</script>


<style lang="scss" scoped>

  .channel-item {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .header {
    $space: 16px;

    padding: 8px $space;
    margin-top: -$space;
    margin-right: -$space;
    margin-left: -$space;
    font-size: 13px;
  }

  .thumb {
    height: 160px;
    margin: 0 -16px;
  }

  .details {
    flex-grow: 1;
    min-height: 50px;
    padding: 16px 0;
    font-weight: bold;
  }

  .actions {
    display: flex;
    align-items: center;
    height: 20px;
  }

  .prog-bar {
    width: 66%;
  }

</style>
