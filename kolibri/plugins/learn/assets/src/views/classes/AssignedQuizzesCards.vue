<template>

  <section>
    <h2>
      <KLabeledIcon icon="quiz" :label="header" />
    </h2>

    <CardGrid v-if="visibleItems.length > 0" :gridType="1">
      <QuizCard
        v-for="quiz in visibleItems"
        :key="quiz.id"
        :quiz="quiz"
      />
    </CardGrid>
    <p v-else>
      {{ $tr('noQuizzesMessage') }}
    </p>

  </section>

</template>


<script>

  import QuizCard from '../cards/QuizCard.vue';
  import CardGrid from '../cards/CardGrid.vue';

  export default {
    name: 'AssignedQuizzesCards',
    components: {
      CardGrid,
      QuizCard,
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
        let visible = this.items.filter(quiz => {
          if (!quiz.active) {
            return false;
          } else if (quiz.archive) {
            // Closed (archived) quizzes only show if the learner started/submitted
            return quiz.progress.started || quiz.progress.closed;
          } else {
            return true;
          }
        });
        if (this.recent) {
          return visible.slice(0, 3);
        } else {
          return visible;
        }
      },
      header() {
        return this.recent ? this.$tr('recentQuizzesHeader') : this.$tr('yourQuizzesHeader');
      },
    },
    $trs: {
      yourQuizzesHeader: 'Your quizzes',
      recentQuizzesHeader: 'Recent quizzes',
      noQuizzesMessage: 'You have no quizzes assigned',
    },
  };

</script>


<style lang="scss" scoped></style>
