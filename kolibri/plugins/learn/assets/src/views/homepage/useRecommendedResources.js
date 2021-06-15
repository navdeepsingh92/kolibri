import { ref, onBeforeMount } from 'kolibri.lib.vueCompositionApi';
import { get, set } from '@vueuse/core';
import { ContentNodeResource } from 'kolibri.resources';

const resumable = ref([]);

export default function useRecommendedResources() {
  function fetchResumable() {
    ContentNodeResource.fetchResume().then(collection => {
      set(resumable, collection);
    });
  }

  onBeforeMount(() => {
    fetchResumable();
  });
  return { resumable };
}
