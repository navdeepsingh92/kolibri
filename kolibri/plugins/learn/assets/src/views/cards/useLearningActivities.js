import { ContentNodeKinds, LearningActivities } from 'kolibri.coreVue.vuex.constants';
import commonCoreStrings from 'kolibri.coreVue.mixins.commonCoreStrings';

const coreString = commonCoreStrings.methods.coreString;

const DefaultActivitiesByKind = {
  [ContentNodeKinds.AUDIO]: LearningActivities.LISTEN,
  [ContentNodeKinds.DOCUMENT]: LearningActivities.READ,
  [ContentNodeKinds.VIDEO]: LearningActivities.WATCH,
  [ContentNodeKinds.EXERCISE]: LearningActivities.PRACTICE,
  [ContentNodeKinds.TOPIC]: LearningActivities.TOPIC,
  [ContentNodeKinds.HTML5]: LearningActivities.EXPLORE,
  [ContentNodeKinds.EXAM]: LearningActivities.PRACTICE,
  [ContentNodeKinds.LESSON]: LearningActivities.EXPLORE,
  [ContentNodeKinds.SLIDESHOW]: LearningActivities.READ,
};

const activityToLabelMap = {
  [LearningActivities.CREATE]: coreString('createActivity'),
  [LearningActivities.LISTEN]: coreString('listenActivity'),
  [LearningActivities.REFLECT]: coreString('reflectActivity'),
  [LearningActivities.PRACTICE]: coreString('practiceActivity'),
  [LearningActivities.READ]: coreString('readActivity'),
  [LearningActivities.WATCH]: coreString('watchActivity'),
  [LearningActivities.EXPLORE]: coreString('exploreActivity'),
  [LearningActivities.TOPIC]: coreString('topicLabel'),
};

// Utilities for working with learning activities
export default function useLearningActivities() {
  function labelForActivity(activity) {
    return activityToLabelMap[activity] || '';
  }

  function defaultLabelForResource(resource) {
    const defaultActivity = DefaultActivitiesByKind[resource.kind];
    return labelForActivity(defaultActivity);
  }

  return {
    labelForActivity,
    defaultLabelForResource,
  };
}
