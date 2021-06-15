<template>

  <AssignmentCard
    v-bind="{ classroomName, assignmentName, completedLabel, inProgressLabel, to: quizLink }"
  />

</template>


<script>

  import { computed } from 'kolibri.lib.vueCompositionApi';
  import { ClassesPageNames } from '../../constants';
  import useClassAssignments from '../homepage/useClassAssignments';
  import AssignmentCard from './AssignmentCard.vue';

  export default {
    name: 'QuizCard',
    components: {
      AssignmentCard,
    },
    setup(props) {
      const { getClassroomName } = useClassAssignments();
      return {
        assignmentName: computed(() => props.quiz.title || ''),
        classroomName: computed(() => getClassroomName(props.quiz.collection)),
        progress: computed(() => props.quiz.progress || {}),
      };
    },
    props: {
      quiz: {
        type: Object,
        required: true,
      },
    },
    computed: {
      inProgressLabel() {
        const { started, closed, answer_count } = this.progress;
        const { question_count } = this.quiz;
        if (started && !closed) {
          return this.$tr('questionsLeft', {
            questionsLeft: Math.max(0, question_count - answer_count),
          });
        }
        return '';
      },
      completedLabel() {
        const { score, closed } = this.progress;
        const { question_count } = this.quiz;
        if (closed) {
          let percentage = 0;
          const nCorrect = Number(score);
          if (nCorrect > 0) {
            percentage = Math.round(100 * (nCorrect / question_count));
          }
          return this.$tr('completedPercentLabel', { score: percentage });
        }
        return '';
      },
      quizLink() {
        if (this.progress.closed) {
          return {
            name: ClassesPageNames.EXAM_REPORT_VIEWER,
            params: {
              classId: this.quiz.collection,
              examId: this.quiz.id,
              questionNumber: 0,
              questionInteraction: 0,
            },
          };
        } else {
          return {
            name: ClassesPageNames.EXAM_VIEWER,
            params: {
              classId: this.quiz.collection,
              examId: this.quiz.id,
              questionNumber: 0,
            },
          };
        }
      },
    },
    $trs: {
      questionsLeft:
        '{questionsLeft, number, integer} {questionsLeft, plural, one {question} other {questions}} left',
      completedPercentLabel: {
        message: 'Score: {score, number, integer}%',
        context: 'A label shown to learners on a quiz card when the quiz is completed',
      },
    },
  };

</script>


<style lang="scss" scoped></style>
