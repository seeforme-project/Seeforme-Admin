/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getReport = /* GraphQL */ `query GetReport($id: ID!) {
  getReport(id: $id) {
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
` as GeneratedQuery<APITypes.GetReportQueryVariables, APITypes.GetReportQuery>;
export const listReports = /* GraphQL */ `query ListReports(
  $filter: ModelReportFilterInput
  $limit: Int
  $nextToken: String
) {
  listReports(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListReportsQueryVariables,
  APITypes.ListReportsQuery
>;
export const getVolunteer = /* GraphQL */ `query GetVolunteer($id: ID!) {
  getVolunteer(id: $id) {
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
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetVolunteerQueryVariables,
  APITypes.GetVolunteerQuery
>;
export const listVolunteers = /* GraphQL */ `query ListVolunteers(
  $filter: ModelVolunteerFilterInput
  $limit: Int
  $nextToken: String
) {
  listVolunteers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      owner
      name
      email
      gender
      isAvailableNow
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListVolunteersQueryVariables,
  APITypes.ListVolunteersQuery
>;
export const volunteersByOwnerAndId = /* GraphQL */ `query VolunteersByOwnerAndId(
  $owner: ID!
  $id: ModelIDKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelVolunteerFilterInput
  $limit: Int
  $nextToken: String
) {
  volunteersByOwnerAndId(
    owner: $owner
    id: $id
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      name
      email
      gender
      isAvailableNow
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.VolunteersByOwnerAndIdQueryVariables,
  APITypes.VolunteersByOwnerAndIdQuery
>;
export const getCall = /* GraphQL */ `query GetCall($id: ID!) {
  getCall(id: $id) {
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
` as GeneratedQuery<APITypes.GetCallQueryVariables, APITypes.GetCallQuery>;
export const listCalls = /* GraphQL */ `query ListCalls(
  $filter: ModelCallFilterInput
  $limit: Int
  $nextToken: String
) {
  listCalls(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListCallsQueryVariables, APITypes.ListCallsQuery>;
export const getBlindUser = /* GraphQL */ `query GetBlindUser($id: ID!) {
  getBlindUser(id: $id) {
    id
    trustedVolunteerIds
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetBlindUserQueryVariables,
  APITypes.GetBlindUserQuery
>;
export const listBlindUsers = /* GraphQL */ `query ListBlindUsers(
  $id: ID
  $filter: ModelBlindUserFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listBlindUsers(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      trustedVolunteerIds
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListBlindUsersQueryVariables,
  APITypes.ListBlindUsersQuery
>;
