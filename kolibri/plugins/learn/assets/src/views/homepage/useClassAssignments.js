import { ref, computed, onBeforeMount } from 'kolibri.lib.vueCompositionApi';
import { set, get } from '@vueuse/core';
import flatMap from 'lodash/flatMap';
import pick from 'lodash/pick';
import memoize from 'lodash/memoize';
import { LearnerClassroomResource } from '../../apiResources';

// The refs are defined in the outer scope so they can be use as a store
const classrooms = ref([]);
const timesFetched = ref(0);

export default function useClassAssignments() {
  function fetchClassrooms() {
    set(timesFetched, get(timesFetched) + 1);
    LearnerClassroomResource.fetchCollection().then(collection => {
      set(classrooms, collection);
    });
  }

  // A memoized function to get a classroom name
  const getClassroomName = memoize(id => {
    const match = get(myClasses).find(c => c.id === id);
    return match ? match.name : '';
  });

  const myClasses = computed(() => {
    return get(classrooms).map(c => pick(c, ['id', 'name']));
  });

  const myQuizzes = computed(() => {
    return flatMap(get(classrooms), c => c.assignments.exams);
  });

  const myLessons = computed(() => {
    return flatMap(get(classrooms), c => c.assignments.lessons);
  });

  onBeforeMount(() => {
    // HACK this is just a way to prevent calling this endpoint too often, for now
    if (get(timesFetched) === 0) {
      fetchClassrooms();
    }
  });

  return {
    fetchClassrooms,
    getClassroomName,
    classrooms,
    myClasses,
    myQuizzes,
    myLessons,
  };
}
