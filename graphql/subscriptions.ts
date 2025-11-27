/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateReport = /* GraphQL */ `subscription OnCreateReport($filter: ModelSubscriptionReportFilterInput) {
  onCreateReport(filter: $filter) {
    id
    callId
    reportedBy
    category
    description
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateReportSubscriptionVariables,
  APITypes.OnCreateReportSubscription
>;
export const onUpdateReport = /* GraphQL */ `subscription OnUpdateReport($filter: ModelSubscriptionReportFilterInput) {
  onUpdateReport(filter: $filter) {
    id
    callId
    reportedBy
    category
    description
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateReportSubscriptionVariables,
  APITypes.OnUpdateReportSubscription
>;
export const onDeleteReport = /* GraphQL */ `subscription OnDeleteReport($filter: ModelSubscriptionReportFilterInput) {
  onDeleteReport(filter: $filter) {
    id
    callId
    reportedBy
    category
    description
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteReportSubscriptionVariables,
  APITypes.OnDeleteReportSubscription
>;
export const onCreateNotification = /* GraphQL */ `subscription OnCreateNotification(
  $filter: ModelSubscriptionNotificationFilterInput
  $userId: String
) {
  onCreateNotification(filter: $filter, userId: $userId) {
    id
    userId
    title
    message
    type
    isRead
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateNotificationSubscriptionVariables,
  APITypes.OnCreateNotificationSubscription
>;
export const onUpdateNotification = /* GraphQL */ `subscription OnUpdateNotification(
  $filter: ModelSubscriptionNotificationFilterInput
  $userId: String
) {
  onUpdateNotification(filter: $filter, userId: $userId) {
    id
    userId
    title
    message
    type
    isRead
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateNotificationSubscriptionVariables,
  APITypes.OnUpdateNotificationSubscription
>;
export const onDeleteNotification = /* GraphQL */ `subscription OnDeleteNotification(
  $filter: ModelSubscriptionNotificationFilterInput
  $userId: String
) {
  onDeleteNotification(filter: $filter, userId: $userId) {
    id
    userId
    title
    message
    type
    isRead
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteNotificationSubscriptionVariables,
  APITypes.OnDeleteNotificationSubscription
>;
export const onCreateVolunteer = /* GraphQL */ `subscription OnCreateVolunteer(
  $filter: ModelSubscriptionVolunteerFilterInput
  $owner: String
) {
  onCreateVolunteer(filter: $filter, owner: $owner) {
    id
    owner
    name
    email
    gender
    isAvailableNow
    availabilitySchedule {
      day
      startTime
      endTime
      __typename
    }
    warningCount
    isBanned
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateVolunteerSubscriptionVariables,
  APITypes.OnCreateVolunteerSubscription
>;
export const onUpdateVolunteer = /* GraphQL */ `subscription OnUpdateVolunteer(
  $filter: ModelSubscriptionVolunteerFilterInput
  $owner: String
) {
  onUpdateVolunteer(filter: $filter, owner: $owner) {
    id
    owner
    name
    email
    gender
    isAvailableNow
    availabilitySchedule {
      day
      startTime
      endTime
      __typename
    }
    warningCount
    isBanned
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateVolunteerSubscriptionVariables,
  APITypes.OnUpdateVolunteerSubscription
>;
export const onDeleteVolunteer = /* GraphQL */ `subscription OnDeleteVolunteer(
  $filter: ModelSubscriptionVolunteerFilterInput
  $owner: String
) {
  onDeleteVolunteer(filter: $filter, owner: $owner) {
    id
    owner
    name
    email
    gender
    isAvailableNow
    availabilitySchedule {
      day
      startTime
      endTime
      __typename
    }
    warningCount
    isBanned
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteVolunteerSubscriptionVariables,
  APITypes.OnDeleteVolunteerSubscription
>;
export const onCreateCall = /* GraphQL */ `subscription OnCreateCall($filter: ModelSubscriptionCallFilterInput) {
  onCreateCall(filter: $filter) {
    id
    blindUserId
    blindUserName
    volunteerId
    volunteerName
    status
    meetingId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateCallSubscriptionVariables,
  APITypes.OnCreateCallSubscription
>;
export const onUpdateCall = /* GraphQL */ `subscription OnUpdateCall($filter: ModelSubscriptionCallFilterInput) {
  onUpdateCall(filter: $filter) {
    id
    blindUserId
    blindUserName
    volunteerId
    volunteerName
    status
    meetingId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateCallSubscriptionVariables,
  APITypes.OnUpdateCallSubscription
>;
export const onDeleteCall = /* GraphQL */ `subscription OnDeleteCall($filter: ModelSubscriptionCallFilterInput) {
  onDeleteCall(filter: $filter) {
    id
    blindUserId
    blindUserName
    volunteerId
    volunteerName
    status
    meetingId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteCallSubscriptionVariables,
  APITypes.OnDeleteCallSubscription
>;
export const onCreateBlindUser = /* GraphQL */ `subscription OnCreateBlindUser($filter: ModelSubscriptionBlindUserFilterInput) {
  onCreateBlindUser(filter: $filter) {
    id
    trustedVolunteerIds
    isBanned
    adminWarningMessage
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateBlindUserSubscriptionVariables,
  APITypes.OnCreateBlindUserSubscription
>;
export const onUpdateBlindUser = /* GraphQL */ `subscription OnUpdateBlindUser($filter: ModelSubscriptionBlindUserFilterInput) {
  onUpdateBlindUser(filter: $filter) {
    id
    trustedVolunteerIds
    isBanned
    adminWarningMessage
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateBlindUserSubscriptionVariables,
  APITypes.OnUpdateBlindUserSubscription
>;
export const onDeleteBlindUser = /* GraphQL */ `subscription OnDeleteBlindUser($filter: ModelSubscriptionBlindUserFilterInput) {
  onDeleteBlindUser(filter: $filter) {
    id
    trustedVolunteerIds
    isBanned
    adminWarningMessage
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteBlindUserSubscriptionVariables,
  APITypes.OnDeleteBlindUserSubscription
>;
