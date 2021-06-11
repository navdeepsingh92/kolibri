<template>

  <CardLink :to="to" role="gridcell">
    <div class="channel-item">
      <div class="header" :class="headerClass">
        <KLabeledIcon icon="topic" :color="$themeTokens.textInverted" label="Topic" />
      </div>
      <Thumbnail :item="item" class="thumb" :rounded="false" />
      <div class="details">
        {{ item.title }}
      </div>
      <div class="actions">
        <!-- TODO put "Last viewed", info button, and coach icon here -->
      </div>
    </div>
  </CardLink>

</template>


<script>

  import CardLink from './CardLink.vue';
  import Thumbnail from './Thumbnail.vue';

  export default {
    name: 'ChannelTopicCard',
    components: {
      CardLink,
      Thumbnail,
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
      headerClass() {
        return this.$computedClass({
          backgroundColor: this.$themeTokens.topic,
          color: this.$themeTokens.textInverted,
        });
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
  }

  .thumb {
    height: 160px;
    margin: 0 -16px;
  }

  .details {
    min-height: 100px;
    padding-top: 16px;
    font-weight: bold;
  }

</style>
