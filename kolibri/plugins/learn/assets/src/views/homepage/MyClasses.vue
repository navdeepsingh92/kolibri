<template>

  <div>
    <h2>
      <KLabeledIcon icon="classes" :label="$tr('yourClassesHeader')" />
    </h2>

    <CardGrid v-if="items.length > 0" :gridType="2">
      <CardLink
        v-for="c in items"
        :key="c.id"
        :to="classAssignmentsLink(c.id)"
      >
        {{ c.name }}
      </CardLink>
    </CardGrid>

    <p v-else>
      {{ $tr('noClasses') }}
    </p>

  </div>

</template>


<script>

  import { classAssignmentsLink } from '../classes/classPageLinks';
  import CardGrid from '../cards/CardGrid.vue';
  import CardLink from '../cards/CardLink.vue';

  export default {
    name: 'MyClasses',
    components: {
      CardGrid,
      CardLink,
    },
    props: {
      items: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        classAssignmentsLink,
      };
    },
    $trs: {
      yourClassesHeader: 'Your classes',
      noClasses: 'You are not enrolled in any classes',
    },
  };

</script>


<style lang="scss" scoped></style>
