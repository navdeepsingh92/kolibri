import { ContentNodeKinds, LearningActivityKinds } from 'kolibri.coreVue.vuex.constants';
import commonCoreStrings from 'kolibri.coreVue.mixins.commonCoreStrings';

const coreString = commonCoreStrings.methods.coreString;

const DefaultActivitiesByKind = {
  [ContentNodeKinds.AUDIO]: LearningActivityKinds.LISTEN,
  [ContentNodeKinds.DOCUMENT]: LearningActivityKinds.READ,
  [ContentNodeKinds.VIDEO]: LearningActivityKinds.WATCH,
  [ContentNodeKinds.EXERCISE]: LearningActivityKinds.PRACTICE,
  [ContentNodeKinds.TOPIC]: LearningActivityKinds.TOPIC,
  [ContentNodeKinds.HTML5]: LearningActivityKinds.EXPLORE,
  [ContentNodeKinds.EXAM]: LearningActivityKinds.PRACTICE,
  [ContentNodeKinds.LESSON]: LearningActivityKinds.EXPLORE,
  [ContentNodeKinds.SLIDESHOW]: LearningActivityKinds.READ,
};

const activityToLabelMap = {
  [LearningActivityKinds.CREATE]: coreString('createActivity'),
  [LearningActivityKinds.LISTEN]: coreString('listenActivity'),
  [LearningActivityKinds.REFLECT]: coreString('reflectActivity'),
  [LearningActivityKinds.PRACTICE]: coreString('practiceActivity'),
  [LearningActivityKinds.READ]: coreString('readActivity'),
  [LearningActivityKinds.WATCH]: coreString('watchActivity'),
  [LearningActivityKinds.EXPLORE]: coreString('exploreActivity'),
  [LearningActivityKinds.TOPIC]: coreString('topicLabel'),
};

const activityToIconMap = {
  [LearningActivityKinds.CREATE]: 'createSolid',
  [LearningActivityKinds.LISTEN]: 'listenSolid',
  [LearningActivityKinds.REFLECT]: 'reflectSolid',
  [LearningActivityKinds.PRACTICE]: 'practiceSolid',
  [LearningActivityKinds.READ]: 'readSolid',
  [LearningActivityKinds.WATCH]: 'watchSolid',
  [LearningActivityKinds.EXPLORE]: 'interactSolid',
  [LearningActivityKinds.TOPIC]: 'topic',
};

// Utilities for working with learning activities
export default function useLearningActivities() {
  function iconForActivity(activity) {
    return activityToIconMap[activity];
  }

  function defaultActivityForResource(resource) {
    return DefaultActivitiesByKind[resource.kind];
  }

  function labelForActivity(activity) {
    return activityToLabelMap[activity] || '';
  }

  function defaultLabelForResource(resource) {
    const defaultActivity = DefaultActivitiesByKind[resource.kind];
    return labelForActivity(defaultActivity);
  }

  function defaultIconForResource(resource) {
    const defaultActivity = DefaultActivitiesByKind[resource.kind];
    return iconForActivity(defaultActivity);
  }

  return {
    labelForActivity,
    defaultActivityForResource,
    defaultIconForResource,
    defaultLabelForResource,
  };
}
