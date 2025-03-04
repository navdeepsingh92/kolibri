<template>

  <CoreBase
    :immersivePage="true"
    immersivePageIcon="back"
    :immersivePagePrimary="true"
    :primary="true"
    :toolbarTitle="currentGroup.name"
    :appBarTitle="currentGroup.name"
    :immersivePageRoute="$router.getRoute('GroupMembersPage')"
    :pageTitle="pageTitle"
  >
    <KPageContainer>
      <h1>
        {{ $tr('pageHeader', { className: currentGroup.name }) }}
      </h1>
      <form @submit.prevent="addSelectedUsersToGroup">
        <div class="actions-header">
          <FilterTextbox
            v-model.trim="filterInput"
            :placeholder="$tr('searchForUser')"
            @input="pageNum = 1"
          />
        </div>

        <h2>{{ $tr('userTableLabel') }}</h2>

        <UserTable
          v-model="selectedUsers"
          :users="visibleFilteredUsers"
          :selectable="true"
          :emptyMessage="emptyMessage"
          :infoDescriptor="$tr('learnerGroups')"
        >
          <template #info="userRow">
            <TruncatedItemList :items="getGroupsForLearner(userRow.user.id)" />
          </template>
        </UserTable>

        <nav class="pagination-nav">
          <span class="pagination-label">
            {{ $tr('pagination', {
              visibleStartRange,
              visibleEndRange,
              numFilteredUsers
            }) }}
          </span>
          <KButtonGroup style="margin-top: 8px;">
            <KIconButton
              icon="chevronLeft"
              :ariaLabel="$tr('previousResults')"
              :disabled="pageNum === 1"
              size="small"

              @click="goToPage(pageNum - 1)"
            />
            <KIconButton
              icon="chevronRight"
              :ariaLabel="$tr('nextResults')"
              :disabled="numPages === 0 || pageNum === numPages"
              size="small"

              @click="goToPage(pageNum + 1)"
            />
          </KButtonGroup>
        </nav>

        <div class="footer">
          <KButton
            :text="coreString('confirmAction')"
            :primary="true"
            type="submit"
            :disabled="selectedUsers.length === 0"
          />
        </div>
      </form>
    </KPageContainer>


  </CoreBase>

</template>


<script>

  import { mapActions, mapGetters, mapState } from 'vuex';
  import differenceWith from 'lodash/differenceWith';
  import responsiveWindowMixin from 'kolibri.coreVue.mixins.responsiveWindowMixin';
  import FilterTextbox from 'kolibri.coreVue.components.FilterTextbox';
  import commonCoreStrings from 'kolibri.coreVue.mixins.commonCoreStrings';
  import filterUsersByNames from 'kolibri.utils.filterUsersByNames';
  import commonCoach from '../../common';
  import UserTable from '../../../../../../facility/assets/src/views/UserTable';

  export default {
    name: 'GroupEnrollPage',
    components: {
      FilterTextbox,
      UserTable,
    },
    mixins: [responsiveWindowMixin, commonCoach, commonCoreStrings],
    data() {
      return {
        filterInput: '',
        perPage: 10,
        pageNum: 1,
        selectedUsers: [],
      };
    },
    computed: {
      ...mapState('groups', ['groups', 'classUsers']),
      ...mapGetters('classSummary', ['getGroupNamesForLearner']),
      pageTitle() {
        return this.$tr('pageHeader', { className: this.currentGroup.name });
      },
      currentGroupUsers() {
        if (this.currentGroup) {
          return this.currentGroup.users;
        }
        return [];
      },
      currentGroup() {
        return this.groups.find(g => g.id === this.$route.params.groupId) || {};
      },
      usersNotInClass() {
        return differenceWith(this.classUsers, this.currentGroupUsers, (a, b) => a.id === b.id);
      },
      sortedFilteredUsers() {
        return filterUsersByNames(this.usersNotInClass, this.filterInput);
      },
      numFilteredUsers() {
        return this.sortedFilteredUsers.length;
      },
      numPages() {
        return Math.ceil(this.numFilteredUsers / this.perPage);
      },
      startRange() {
        return (this.pageNum - 1) * this.perPage;
      },
      visibleStartRange() {
        return Math.min(this.startRange + 1, this.numFilteredUsers);
      },
      endRange() {
        return this.pageNum * this.perPage;
      },
      visibleEndRange() {
        return Math.min(this.endRange, this.numFilteredUsers);
      },
      visibleFilteredUsers() {
        return this.sortedFilteredUsers.slice(this.startRange, this.endRange);
      },
      emptyMessage() {
        if (this.classUsers.length === 0) {
          return this.coreString('noUsersExistLabel');
        }
        if (this.usersNotInClass.length === 0) {
          return this.$tr('allUsersAlready');
        }
        if (this.sortedFilteredUsers.length === 0 && this.filterInput !== '') {
          // TODO internationalize this
          return this.coreString('labelColonThenDetails', {
            label: this.$tr('noUsersMatch'),
            details: this.filterInput,
          });
        }

        return '';
      },
    },
    methods: {
      ...mapActions('groups', ['addUsersToGroup']),
      addSelectedUsersToGroup() {
        this.addUsersToGroup({
          groupId: this.currentGroup.id,
          userIds: this.selectedUsers,
        }).then(() => {
          this.$router.push(this.$router.getRoute('GroupMembersPage'), () => {
            this.showSnackbarNotification('learnersEnrolledNoCount', {
              count: this.selectedUsers.length,
            });
          });
        });
      },
      goToPage(page) {
        this.pageNum = page;
      },
      getGroupsForLearner(learnerId) {
        return this.getGroupNamesForLearner(learnerId);
      },
    },
    $trs: {
      pageHeader: {
        message: "Enroll learners into '{className}'",
        context: 'Describes title of page where the coach enrolls learners in a new group.',
      },
      searchForUser: {
        message: 'Search for a user',
        context: 'Text in the search field.',
      },
      userTableLabel: {
        message: 'User List',
        context: 'Indicates list of users that can be enrolled into a specific group.',
      },
      noUsersMatch: {
        message: 'No users match',
        context:
          'If no users match the search for users to enroll in a group, this message will display.',
      },
      previousResults: {
        message: 'Previous results',
        context:
          'Indicates previous page of results shown on the enroll learners page. This is not seen in the UI.\n',
      },
      nextResults: {
        message: 'Next results',
        context:
          'Indicates next page of results shown on the enroll learners page. This is not seen in the UI.',
      },
      allUsersAlready: {
        message: 'All users are already enrolled in this class',
        context:
          'Message that displays on group when all learners in a class have already been added to the group and there are no more to add.',
      },
      pagination: {
        message:
          '{ visibleStartRange, number } - { visibleEndRange, number } of { numFilteredUsers, number }',
        context: 'Indicates the pagination of the enroll users into a group page.',
      },
      learnerGroups: {
        message: 'Current groups',
        context: 'Indicates the groups that the learner is already part of.',
      },
    },
  };

</script>


<style lang="scss" scoped>

  .actions-header {
    margin-bottom: 8px;
  }

  .actions-header,
  .footer,
  .pagination-nav {
    text-align: right;
  }
  .pagination-nav {
    margin-bottom: 8px;
  }

  .pagination-label {
    position: relative;
    top: -2px;
    display: inline;
  }

</style>
