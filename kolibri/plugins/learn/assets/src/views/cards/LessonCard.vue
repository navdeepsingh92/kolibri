<template>

  <AssignmentCard
    v-bind="{ classroomName, assignmentName, completedLabel, inProgressLabel, to: lessonLink }"
  />

</template>


<script>

  import { computed } from 'kolibri.lib.vueCompositionApi';
  import commonCoreStrings from 'kolibri.coreVue.mixins.commonCoreStrings';
  import { ClassesPageNames } from '../../constants';
  import useClassAssignments from '../homepage/useClassAssignments';
  import AssignmentCard from './AssignmentCard.vue';

  export default {
    name: 'LessonCard',
    components: {
      AssignmentCard,
    },
    mixins: [commonCoreStrings],
    setup(props) {
      const { getClassroomName } = useClassAssignments();
      return {
        assignmentName: computed(() => props.lesson.title || ''),
        classroomName: computed(() => getClassroomName(props.lesson.collection)),
        progress: computed(() => props.lesson.progress || {}),
      };
    },
    props: {
      lesson: {
        type: Object,
        required: true,
      },
    },
    computed: {
      lessonProgress() {
        const { resource_progress, total_resources } = this.progress;
        if (resource_progress * total_resources === 0) {
          return NaN;
        } else {
          return resource_progress - total_resources;
        }
      },
      inProgressLabel() {
        return this.lessonProgress < 0 ? this.coreString('inProgressLabel') : '';
      },
      completedLabel() {
        return this.lessonProgress >= 0 ? this.coreString('completedLabel') : '';
      },
      lessonLink() {
        return {
          name: ClassesPageNames.LESSON_PLAYLIST,
          params: {
            classId: this.lesson.collection,
            lessonId: this.lesson.id,
          },
        };
      },
    },
  };

</script>


<style lang="scss" scoped></style>
