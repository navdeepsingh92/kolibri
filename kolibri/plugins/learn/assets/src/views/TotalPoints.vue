<template>

  <div v-if="isUserLoggedIn" ref="icon" class="points-wrapper">
    <div class="icon-wrapper" :style="{ backgroundColor: $themeTokens.surface }">
      <PointsIcon class="icon" />
    </div>
    <div v-show="!windowIsSmall" class="description">
      {{ $formatNumber(totalPoints) }}
    </div>
    <KTooltip
      reference="icon"
      :refs="$refs"
    >
      {{ $tr('pointsTooltip', { points: totalPoints }) }}
    </KTooltip>
  </div>

</template>


<script>

  import { mapGetters, mapActions } from 'vuex';
  import responsiveWindowMixin from 'kolibri.coreVue.mixins.responsiveWindowMixin';
  import PointsIcon from 'kolibri.coreVue.components.PointsIcon';

  export default {
    name: 'TotalPoints',
    components: {
      PointsIcon,
    },
    mixins: [responsiveWindowMixin],
    computed: {
      ...mapGetters(['totalPoints', 'currentUserId', 'isUserLoggedIn']),
    },
    watch: {
      currentUserId() {
        this.fetchPoints();
      },
    },
    created() {
      this.fetchPoints();
    },
    methods: {
      ...mapActions(['fetchPoints']),
    },
    $trs: {
      pointsTooltip: {
        message: 'You earned { points, number } points',
        context:
          'Notification indicating how many point a leaner has earned for competing an exercise.',
      },
    },
  };

</script>


<style lang="scss" scoped>

  .icon-wrapper {
    display: inline-block;
    width: 32px;
    height: 32px;
    text-align: center;
    // Aligns the round background with its siblings
    vertical-align: middle;
    border-radius: 100%;
  }

  .icon {
    margin-top: 4px;
  }

  .description {
    display: inline-block;
    margin-left: 8px;
    font-size: 14px;
  }

</style>
