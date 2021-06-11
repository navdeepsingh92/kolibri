<template>

  <div class="activity-label">
    <KLabeledIcon
      v-if="item.thumbnail"
      v-bind="iconProps"
    />
    <span v-else>
      {{ defaultLabelForResource(item) }}
    </span>
  </div>

</template>


<script>

  import useLearningActivities from './useLearningActivities';

  export default {
    name: 'ActivityLabel',
    setup() {
      const { defaultLabelForResource, defaultIconForResource } = useLearningActivities();
      return {
        defaultIconForResource,
        defaultLabelForResource,
      };
    },
    props: {
      item: {
        type: Object,
        required: true,
      },
      color: {
        type: String,
        required: false,
        default: null,
      },
      iconAfter: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      iconProps() {
        const iconProp = this.iconAfter ? 'iconAfter' : 'icon';
        // TODO Replace content kind icon with learning activity icon
        return {
          label: this.defaultLabelForResource(this.item),
          [iconProp]: this.defaultIconForResource(this.item),
          color: this.color || this.$themeTokens.text,
        };
      },
    },
  };

</script>


<style lang="scss" scoped>

  .activity-label {
    font-size: 12px;
  }

</style>
