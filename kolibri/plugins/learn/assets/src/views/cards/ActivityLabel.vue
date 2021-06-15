<template>

  <div class="activity-label">
    <!-- TODO Replace content kind icon with an activity icon -->
    <KLabeledIcon :iconAfter="item.kind" :label="defaultLabelForResource(item)" />
  </div>

</template>


<script>

  import useLearningActivities from './useLearningActivities';

  export default {
    name: 'ActivityLabel',
    setup() {
      const { defaultLabelForResource } = useLearningActivities();
      return {
        defaultLabelForResource,
      };
    },
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
  };

</script>


<style lang="scss" scoped>

  .activity-label {
    font-size: 12px;
    text-align: right;
  }

</style>
