/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createVolunteer = /* GraphQL */ `mutation CreateVolunteer(
  $input: CreateVolunteerInput!
  $condition: ModelVolunteerConditionInput
) {
  createVolunteer(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateVolunteerMutationVariables,
  APITypes.CreateVolunteerMutation
>;
export const updateVolunteer = /* GraphQL */ `mutation UpdateVolunteer(
  $input: UpdateVolunteerInput!
  $condition: ModelVolunteerConditionInput
) {
  updateVolunteer(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateVolunteerMutationVariables,
  APITypes.UpdateVolunteerMutation
>;
export const deleteVolunteer = /* GraphQL */ `mutation DeleteVolunteer(
  $input: DeleteVolunteerInput!
  $condition: ModelVolunteerConditionInput
) {
  deleteVolunteer(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteVolunteerMutationVariables,
  APITypes.DeleteVolunteerMutation
>;
export const deleteCall = /* GraphQL */ `mutation DeleteCall(
  $input: DeleteCallInput!
  $condition: ModelCallConditionInput
) {
  deleteCall(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteCallMutationVariables,
  APITypes.DeleteCallMutation
>;
export const updateReport = /* GraphQL */ `mutation UpdateReport(
  $input: UpdateReportInput!
  $condition: ModelReportConditionInput
) {
  updateReport(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateReportMutationVariables,
  APITypes.UpdateReportMutation
>;
export const deleteReport = /* GraphQL */ `mutation DeleteReport(
  $input: DeleteReportInput!
  $condition: ModelReportConditionInput
) {
  deleteReport(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteReportMutationVariables,
  APITypes.DeleteReportMutation
>;
export const deleteBlindUser = /* GraphQL */ `mutation DeleteBlindUser(
  $input: DeleteBlindUserInput!
  $condition: ModelBlindUserConditionInput
) {
  deleteBlindUser(input: $input, condition: $condition) {
    id
    trustedVolunteerIds
    isBanned
    adminWarningMessage
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteBlindUserMutationVariables,
  APITypes.DeleteBlindUserMutation
>;
export const createNotification = /* GraphQL */ `mutation CreateNotification(
  $input: CreateNotificationInput!
  $condition: ModelNotificationConditionInput
) {
  createNotification(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateNotificationMutationVariables,
  APITypes.CreateNotificationMutation
>;
export const updateNotification = /* GraphQL */ `mutation UpdateNotification(
  $input: UpdateNotificationInput!
  $condition: ModelNotificationConditionInput
) {
  updateNotification(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateNotificationMutationVariables,
  APITypes.UpdateNotificationMutation
>;
export const deleteNotification = /* GraphQL */ `mutation DeleteNotification(
  $input: DeleteNotificationInput!
  $condition: ModelNotificationConditionInput
) {
  deleteNotification(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteNotificationMutationVariables,
  APITypes.DeleteNotificationMutation
>;
export const createCall = /* GraphQL */ `mutation CreateCall(
  $input: CreateCallInput!
  $condition: ModelCallConditionInput
) {
  createCall(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateCallMutationVariables,
  APITypes.CreateCallMutation
>;
export const updateCall = /* GraphQL */ `mutation UpdateCall(
  $input: UpdateCallInput!
  $condition: ModelCallConditionInput
) {
  updateCall(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateCallMutationVariables,
  APITypes.UpdateCallMutation
>;
export const createReport = /* GraphQL */ `mutation CreateReport(
  $input: CreateReportInput!
  $condition: ModelReportConditionInput
) {
  createReport(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateReportMutationVariables,
  APITypes.CreateReportMutation
>;
export const createBlindUser = /* GraphQL */ `mutation CreateBlindUser(
  $input: CreateBlindUserInput!
  $condition: ModelBlindUserConditionInput
) {
  createBlindUser(input: $input, condition: $condition) {
    id
    trustedVolunteerIds
    isBanned
    adminWarningMessage
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateBlindUserMutationVariables,
  APITypes.CreateBlindUserMutation
>;
export const updateBlindUser = /* GraphQL */ `mutation UpdateBlindUser(
  $input: UpdateBlindUserInput!
  $condition: ModelBlindUserConditionInput
) {
  updateBlindUser(input: $input, condition: $condition) {
    id
    trustedVolunteerIds
    isBanned
    adminWarningMessage
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateBlindUserMutationVariables,
  APITypes.UpdateBlindUserMutation
>;
