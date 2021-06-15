<template>

  <section>
    <h2 style="display: inline-block">
      <KLabeledIcon icon="lesson" :label="header" />
    </h2>

    <CardGrid v-if="items.length > 0" :gridType="1">
      <LessonCard
        v-for="lesson in visibleItems"
        :key="lesson.id"
        :lesson="lesson"
      />
    </CardGrid>

    <p v-else>
      {{ $tr('noLessonsMessage') }}
    </p>
  </section>

</template>


<script>

  import LessonCard from '../cards/LessonCard.vue';
  import CardGrid from '../cards/CardGrid.vue';

  export default {
    name: 'AssignedLessonsCards',
    components: {
      CardGrid,
      LessonCard,
    },
    props: {
      items: {
        type: Array,
        required: true,
      },
      // If true, this will filter and sort items, plus show a "Recent lessons" header
      recent: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      visibleItems() {
        if (this.recent) {
          return this.items.slice(0, 3);
        } else {
          return this.items;
        }
      },
      header() {
        return this.recent ? this.$tr('recentLessonsHeader') : this.$tr('yourLessonsHeader');
      },
    },
    $trs: {
      yourLessonsHeader: 'Your lessons',
      recentLessonsHeader: 'Recent lessons',
      noLessonsMessage: 'You have no lessons assigned',
    },
  };

</script>


<style lang="scss" scoped></style>
