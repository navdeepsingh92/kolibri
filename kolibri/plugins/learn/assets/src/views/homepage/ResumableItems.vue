<template>

  <section>
    <h2>
      <KLabeledIcon icon="forward" :label="header" />
    </h2>

    <CardGrid :gridType="1">
      <CardLink
        v-for="(resource, idx) in normalizedItems"
        :key="idx"
        :to="resourceLink(resource)"
        role="gridcell"
      >
        <div class="card-contents">
          <div class="card-row-1">
            <Thumbnail class="thumb" :item="resource" :small="true" />
            <ActivityLabel :item="resource" :iconAfter="true" />
          </div>

          <div class="card-row-2" dir="auto">
            <h3>
              {{ resource.title }}
            </h3>
          </div>
        </div>
      </CardLink>
    </CardGrid>
  </section>

</template>


<script>

  import CardGrid from '../cards/CardGrid.vue';
  import CardLink from '../cards/CardLink.vue';
  import Thumbnail from '../cards/Thumbnail.vue';
  import ActivityLabel from '../cards/ActivityLabel.vue';
  import { normalizeContentNode } from '../../modules/coreLearn/utils';

  export default {
    name: 'ResumableItems',
    components: {
      ActivityLabel,
      CardGrid,
      Thumbnail,
      CardLink,
    },
    props: {
      items: {
        type: Array,
        required: true,
      },
      shortList: {
        type: Boolean,
        default: false,
      },
      // If `true`, this will expect that `items` are part of a lesson, so that
      // the cards will show the class name above the title.
      // Otherwise the cards will show the topic name above the title.
      // The header will also differ.
      fromLessons: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      normalizedItems() {
        let items;
        items = this.items.map(normalizeContentNode);
        if (this.shortList) {
          return items.slice(0, 3);
        } else {
          return items;
        }
      },
      header() {
        return this.fromLessons
          ? this.$tr('continueLearningFromClassesHeader')
          : this.$tr('continueLearningOnYourOwnHeader');
      },
    },
    methods: {
      resourceLink(resource) {
        return {
          name: 'TOPICS_CONTENT',
          params: {
            id: resource.id,
          },
          query: {
            last: 'HOME',
          },
        };
      },
    },
    $trs: {
      continueLearningOnYourOwnHeader: 'Continue learning on your own',
      continueLearningFromClassesHeader: 'Continue learning from your classes',
    },
  };

</script>


<style lang="scss" scoped>

  .thumb {
    width: 105px;
    height: 60px;
  }

  .card-row-1 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

</style>
