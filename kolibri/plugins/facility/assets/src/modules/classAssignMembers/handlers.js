import ConditionalPromise from 'kolibri.lib.conditionalPromise';
import samePageCheckGenerator from 'kolibri.utils.samePageCheckGenerator';
import { ClassroomResource, FacilityUserResource } from 'kolibri.resources';
import { UserKinds } from 'kolibri.coreVue.vuex.constants';
import { _userState } from '../mappers';

export function showLearnerClassEnrollmentPage(store, toRoute) {
  const { id, facility_id } = toRoute.params;
  store.dispatch('preparePage');
  // all users in facility
  const userPromise = FacilityUserResource.fetchCollection({
    getParams: {
      member_of: facility_id || store.getters.activeFacilityId,
      page_size: 30,
      page: 1,
      exclude_member_of: id,
    },
  });
  // current class
  const classPromise = ClassroomResource.fetchModel({ id });
  // users in current class
  const classUsersPromise = FacilityUserResource.fetchCollection({
    getParams: {
      member_of: id,
      page_size: 30,
      page: 1,
    },
    force: true,
  });

  return ConditionalPromise.all([userPromise, classPromise, classUsersPromise]).only(
    samePageCheckGenerator(store),
    ([facilityUsers, classroom, classUsers]) => {
      store.commit('classAssignMembers/SET_STATE', {
        facilityUsers: facilityUsers.results.map(_userState),
        classUsers: classUsers.results.map(_userState),
        totalPageNumber: facilityUsers.total_pages,
        totalLearners: facilityUsers.count,
        class: classroom,
        modalShown: false,
      });
      store.commit('CORE_SET_PAGE_LOADING', false);
    },
    error => {
      store.dispatch('handleApiError', error);
    }
  );
}

const eligibleRoles = [
  UserKinds.ASSIGNABLE_COACH,
  UserKinds.COACH,
  UserKinds.ADMIN,
  UserKinds.SUPERUSER,
];

export function showCoachClassAssignmentPage(store, toRoute) {
  const { id, facility_id } = toRoute.params;
  store.commit('CORE_SET_PAGE_LOADING', true);
  const facilityId = facility_id || store.getters.activeFacilityId;
  // all users in facility
  const userPromise = FacilityUserResource.fetchCollection({
    getParams: { member_of: facilityId },
  });
  // current class
  const classPromise = ClassroomResource.fetchModel({ id, force: true });

  return ConditionalPromise.all([userPromise, classPromise]).only(
    samePageCheckGenerator(store),
    ([facilityUsers, classroom]) => {
      let filteredFacilityUsers = facilityUsers
        .filter(user => {
          // filter out users who are not eligible to be coaches
          return user.roles.some(({ kind }) => eligibleRoles.includes(kind));
        })
        .map(_userState);
      store.commit('classAssignMembers/SET_STATE', {
        // facilityUsers now only contains users that are eligible for coachdom
        // TODO rename
        facilityUsers: filteredFacilityUsers,
        classUsers: classroom.coaches.map(_userState),
        totalCoaches: filteredFacilityUsers.length,
        class: classroom,
        modalShown: false,
      });
      store.commit('CORE_SET_PAGE_LOADING', false);
    },
    error => {
      store.dispatch('handleApiError', error);
    }
  );
}
