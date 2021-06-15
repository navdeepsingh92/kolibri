<template>

  <div>

    <MyClasses :items="myClasses" />
    <ResumableItems :items="resumable" :shortList="false" />
    <AssignedLessonsCards :items="myLessons" :recent="true" />
    <AssignedQuizzesCards :items="myQuizzes" :recent="true" />

  </div>

</template>


<script>

  import AssignedLessonsCards from '../classes/AssignedLessonsCards.vue';
  import AssignedQuizzesCards from '../classes/AssignedQuizzesCards.vue';
  import MyClasses from './MyClasses.vue';
  import ResumableItems from './ResumableItems.vue';
  import useClassAssignments from './useClassAssignments';
  import useRecommendedResources from './useRecommendedResources';

  export default {
    name: 'HomePage',
    components: {
      MyClasses,
      AssignedLessonsCards,
      AssignedQuizzesCards,
      ResumableItems,
    },
    setup() {
      const { myLessons, myQuizzes, myClasses } = useClassAssignments();
      const { resumable } = useRecommendedResources();
      return {
        myLessons,
        myQuizzes,
        myClasses,
        resumable,
      };
    },
    methods: {},
    $trs: {},
  };

</script>


<style lang="scss" scoped></style>
