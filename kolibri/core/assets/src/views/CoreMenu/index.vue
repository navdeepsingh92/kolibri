<template>

  <div tabindex="0" @keyup.esc="$emit('close')">
    <ul
      role="menu"
      class="ui-menu"
      :class="classes"
    >
      <!-- if anything in the dropdown menu has an icon, then we are
        going to add padding to make all the items align -->
      <div
        v-if="$slots.header"
        class="ui-menu-header"
        :style="{ color: $themeTokens.text }"
      >
        <slot name="header"></slot>
      </div>

      <FocusTrap
        ref="focusTrap"
        :disabled="!containFocus"
        :firstEl="firstFocusableEl"
        :lastEl="lastFocusableEl"
      >
        <slot name="options"></slot>
      </FocusTrap>

      <div
        v-if="$slots.footer"
        class="ui-menu-footer"
        :style="{ color: $themeTokens.text }"
      >
        <slot name="footer"></slot>
      </div>
    </ul>
  </div>

</template>


<script>

  import last from 'lodash/last';
  import FocusTrap from 'kolibri.coreVue.components.FocusTrap';

  export default {
    name: 'CoreMenu',
    components: {
      FocusTrap,
    },
    props: {
      // Whether to show if links are currently active
      showActive: {
        type: Boolean,
        default: true,
      },
      hasSecondaryText: {
        type: Boolean,
        default: false,
      },
      containFocus: {
        type: Boolean,
        default: false,
      },
      raised: {
        type: Boolean,
        default: false,
      },
      isOpen: {
        type: Boolean,
        default: false,
      },
    },
    provide() {
      return {
        showActive: this.showActive,
      };
    },
    data() {
      return {
        firstFocusableEl: null,
        lastFocusableEl: null,
      };
    },
    computed: {
      classes() {
        return {
          'is-raised': this.raised,
          'has-secondary-text': this.hasSecondaryText,
        };
      },
    },
    watch: {
      isOpen(val) {
        if (val === false) {
          this.$refs.focusTrap.reset();
        }
      },
    },
    mounted() {
      // make sure that all child components have been mounted
      // before attempting to access their elements
      this.$nextTick(() => {
        this.firstFocusableEl = this.$el.querySelector('.core-menu-option');
        this.lastFocusableEl = last(this.$el.querySelectorAll('.core-menu-option'));
      });
    },
  };

</script>


<style lang="scss" scoped>

  @import '~kolibri-design-system/lib/styles/definitions';
  .ui-menu-header {
    padding: 1rem 1rem 1rem 1.2rem;
    font-size: 0.9375rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }
  .ui-menu-footer {
    padding: 1rem 1rem 0 1.2rem;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
  }

</style>
