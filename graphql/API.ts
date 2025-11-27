/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateVolunteerInput = {
  id?: string | null,
  owner?: string | null,
  name: string,
  email: string,
  gender: string,
  isAvailableNow?: boolean | null,
  availabilitySchedule?: Array< AvailabilitySlotInput | null > | null,
  warningCount?: number | null,
  isBanned?: boolean | null,
};

export type AvailabilitySlotInput = {
  day: string,
  startTime: string,
  endTime: string,
};

export type ModelVolunteerConditionInput = {
  owner?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  gender?: ModelStringInput | null,
  isAvailableNow?: ModelBooleanInput | null,
  warningCount?: ModelIntInput | null,
  isBanned?: ModelBooleanInput | null,
  and?: Array< ModelVolunteerConditionInput | null > | null,
  or?: Array< ModelVolunteerConditionInput | null > | null,
  not?: ModelVolunteerConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Volunteer = {
  __typename: "Volunteer",
  id: string,
  owner?: string | null,
  name: string,
  email: string,
  gender: string,
  isAvailableNow?: boolean | null,
  availabilitySchedule?:  Array<AvailabilitySlot | null > | null,
  warningCount?: number | null,
  isBanned?: boolean | null,
  createdAt: string,
  updatedAt: string,
};

export type AvailabilitySlot = {
  __typename: "AvailabilitySlot",
  day: string,
  startTime: string,
  endTime: string,
};

export type UpdateVolunteerInput = {
  id: string,
  owner?: string | null,
  name?: string | null,
  email?: string | null,
  gender?: string | null,
  isAvailableNow?: boolean | null,
  availabilitySchedule?: Array< AvailabilitySlotInput | null > | null,
  warningCount?: number | null,
  isBanned?: boolean | null,
};

export type DeleteVolunteerInput = {
  id: string,
};

export type DeleteCallInput = {
  id: string,
};

export type ModelCallConditionInput = {
  blindUserId?: ModelIDInput | null,
  blindUserName?: ModelStringInput | null,
  volunteerId?: ModelIDInput | null,
  volunteerName?: ModelStringInput | null,
  status?: ModelCallStatusInput | null,
  meetingId?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCallConditionInput | null > | null,
  or?: Array< ModelCallConditionInput | null > | null,
  not?: ModelCallConditionInput | null,
};

export type ModelCallStatusInput = {
  eq?: CallStatus | null,
  ne?: CallStatus | null,
};

export enum CallStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}


export type Call = {
  __typename: "Call",
  id: string,
  blindUserId: string,
  blindUserName: string,
  volunteerId?: string | null,
  volunteerName?: string | null,
  status: CallStatus,
  meetingId: string,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type UpdateReportInput = {
  id: string,
  callId?: string | null,
  reportedBy?: string | null,
  category?: ReportCategory | null,
  description?: string | null,
  status?: ReportStatus | null,
  createdAt?: string | null,
};

export enum ReportCategory {
  GOOD_EXPERIENCE = "GOOD_EXPERIENCE",
  CONNECTION_ISSUES = "CONNECTION_ISSUES",
  INAPPROPRIATE_BEHAVIOR = "INAPPROPRIATE_BEHAVIOR",
  SAFETY_CONCERN = "SAFETY_CONCERN",
  OTHER = "OTHER",
}


export enum ReportStatus {
  OPEN = "OPEN",
  RESOLVED = "RESOLVED",
}


export type ModelReportConditionInput = {
  callId?: ModelIDInput | null,
  reportedBy?: ModelStringInput | null,
  category?: ModelReportCategoryInput | null,
  description?: ModelStringInput | null,
  status?: ModelReportStatusInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelReportConditionInput | null > | null,
  or?: Array< ModelReportConditionInput | null > | null,
  not?: ModelReportConditionInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelReportCategoryInput = {
  eq?: ReportCategory | null,
  ne?: ReportCategory | null,
};

export type ModelReportStatusInput = {
  eq?: ReportStatus | null,
  ne?: ReportStatus | null,
};

export type Report = {
  __typename: "Report",
  id: string,
  callId: string,
  reportedBy: string,
  category: ReportCategory,
  description?: string | null,
  status: ReportStatus,
  createdAt?: string | null,
  updatedAt: string,
};

export type DeleteReportInput = {
  id: string,
};

export type DeleteBlindUserInput = {
  id: string,
};

export type ModelBlindUserConditionInput = {
  trustedVolunteerIds?: ModelStringInput | null,
  isBanned?: ModelBooleanInput | null,
  adminWarningMessage?: ModelStringInput | null,
  and?: Array< ModelBlindUserConditionInput | null > | null,
  or?: Array< ModelBlindUserConditionInput | null > | null,
  not?: ModelBlindUserConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type BlindUser = {
  __typename: "BlindUser",
  id: string,
  trustedVolunteerIds?: Array< string | null > | null,
  isBanned?: boolean | null,
  adminWarningMessage?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type CreateNotificationInput = {
  id?: string | null,
  userId: string,
  title: string,
  message: string,
  type: NotificationType,
  isRead?: boolean | null,
  createdAt?: string | null,
};

export enum NotificationType {
  WARNING = "WARNING",
  INFO = "INFO",
  BAN_NOTICE = "BAN_NOTICE",
}


export type ModelNotificationConditionInput = {
  userId?: ModelIDInput | null,
  title?: ModelStringInput | null,
  message?: ModelStringInput | null,
  type?: ModelNotificationTypeInput | null,
  isRead?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelNotificationConditionInput | null > | null,
  or?: Array< ModelNotificationConditionInput | null > | null,
  not?: ModelNotificationConditionInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelNotificationTypeInput = {
  eq?: NotificationType | null,
  ne?: NotificationType | null,
};

export type Notification = {
  __typename: "Notification",
  id: string,
  userId: string,
  title: string,
  message: string,
  type: NotificationType,
  isRead?: boolean | null,
  createdAt?: string | null,
  updatedAt: string,
};

export type UpdateNotificationInput = {
  id: string,
  userId?: string | null,
  title?: string | null,
  message?: string | null,
  type?: NotificationType | null,
  isRead?: boolean | null,
  createdAt?: string | null,
};

export type DeleteNotificationInput = {
  id: string,
};

export type CreateCallInput = {
  id?: string | null,
  blindUserId: string,
  blindUserName: string,
  volunteerId?: string | null,
  volunteerName?: string | null,
  status: CallStatus,
  meetingId: string,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type UpdateCallInput = {
  id: string,
  blindUserId?: string | null,
  blindUserName?: string | null,
  volunteerId?: string | null,
  volunteerName?: string | null,
  status?: CallStatus | null,
  meetingId?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type CreateReportInput = {
  id?: string | null,
  callId: string,
  reportedBy: string,
  category: ReportCategory,
  description?: string | null,
  status: ReportStatus,
  createdAt?: string | null,
};

export type CreateBlindUserInput = {
  id?: string | null,
  trustedVolunteerIds?: Array< string | null > | null,
  isBanned?: boolean | null,
  adminWarningMessage?: string | null,
};

export type UpdateBlindUserInput = {
  id: string,
  trustedVolunteerIds?: Array< string | null > | null,
  isBanned?: boolean | null,
  adminWarningMessage?: string | null,
};

export type ModelReportFilterInput = {
  id?: ModelIDInput | null,
  callId?: ModelIDInput | null,
  reportedBy?: ModelStringInput | null,
  category?: ModelReportCategoryInput | null,
  description?: ModelStringInput | null,
  status?: ModelReportStatusInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelReportFilterInput | null > | null,
  or?: Array< ModelReportFilterInput | null > | null,
  not?: ModelReportFilterInput | null,
};

export type ModelReportConnection = {
  __typename: "ModelReportConnection",
  items:  Array<Report | null >,
  nextToken?: string | null,
};

export type ModelNotificationFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  title?: ModelStringInput | null,
  message?: ModelStringInput | null,
  type?: ModelNotificationTypeInput | null,
  isRead?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelNotificationFilterInput | null > | null,
  or?: Array< ModelNotificationFilterInput | null > | null,
  not?: ModelNotificationFilterInput | null,
};

export type ModelNotificationConnection = {
  __typename: "ModelNotificationConnection",
  items:  Array<Notification | null >,
  nextToken?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelVolunteerFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  gender?: ModelStringInput | null,
  isAvailableNow?: ModelBooleanInput | null,
  warningCount?: ModelIntInput | null,
  isBanned?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelVolunteerFilterInput | null > | null,
  or?: Array< ModelVolunteerFilterInput | null > | null,
  not?: ModelVolunteerFilterInput | null,
};

export type ModelVolunteerConnection = {
  __typename: "ModelVolunteerConnection",
  items:  Array<Volunteer | null >,
  nextToken?: string | null,
};

export type ModelIDKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelCallFilterInput = {
  id?: ModelIDInput | null,
  blindUserId?: ModelIDInput | null,
  blindUserName?: ModelStringInput | null,
  volunteerId?: ModelIDInput | null,
  volunteerName?: ModelStringInput | null,
  status?: ModelCallStatusInput | null,
  meetingId?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCallFilterInput | null > | null,
  or?: Array< ModelCallFilterInput | null > | null,
  not?: ModelCallFilterInput | null,
};

export type ModelCallConnection = {
  __typename: "ModelCallConnection",
  items:  Array<Call | null >,
  nextToken?: string | null,
};

export type ModelBlindUserFilterInput = {
  id?: ModelIDInput | null,
  trustedVolunteerIds?: ModelStringInput | null,
  isBanned?: ModelBooleanInput | null,
  adminWarningMessage?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelBlindUserFilterInput | null > | null,
  or?: Array< ModelBlindUserFilterInput | null > | null,
  not?: ModelBlindUserFilterInput | null,
};

export type ModelBlindUserConnection = {
  __typename: "ModelBlindUserConnection",
  items:  Array<BlindUser | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionReportFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  callId?: ModelSubscriptionIDInput | null,
  reportedBy?: ModelSubscriptionStringInput | null,
  category?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionReportFilterInput | null > | null,
  or?: Array< ModelSubscriptionReportFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionNotificationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  message?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  isRead?: ModelSubscriptionBooleanInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionNotificationFilterInput | null > | null,
  or?: Array< ModelSubscriptionNotificationFilterInput | null > | null,
  userId?: ModelStringInput | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionVolunteerFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  gender?: ModelSubscriptionStringInput | null,
  isAvailableNow?: ModelSubscriptionBooleanInput | null,
  warningCount?: ModelSubscriptionIntInput | null,
  isBanned?: ModelSubscriptionBooleanInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionVolunteerFilterInput | null > | null,
  or?: Array< ModelSubscriptionVolunteerFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionCallFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  blindUserId?: ModelSubscriptionIDInput | null,
  blindUserName?: ModelSubscriptionStringInput | null,
  volunteerId?: ModelSubscriptionIDInput | null,
  volunteerName?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  meetingId?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCallFilterInput | null > | null,
  or?: Array< ModelSubscriptionCallFilterInput | null > | null,
};

export type ModelSubscriptionBlindUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  trustedVolunteerIds?: ModelSubscriptionStringInput | null,
  isBanned?: ModelSubscriptionBooleanInput | null,
  adminWarningMessage?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionBlindUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionBlindUserFilterInput | null > | null,
};

export type CreateVolunteerMutationVariables = {
  input: CreateVolunteerInput,
  condition?: ModelVolunteerConditionInput | null,
};

export type CreateVolunteerMutation = {
  createVolunteer?:  {
    __typename: "Volunteer",
    id: string,
    owner?: string | null,
    name: string,
    email: string,
    gender: string,
    isAvailableNow?: boolean | null,
    availabilitySchedule?:  Array< {
      __typename: "AvailabilitySlot",
      day: string,
      startTime: string,
      endTime: string,
    } | null > | null,
    warningCount?: number | null,
    isBanned?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateVolunteerMutationVariables = {
  input: UpdateVolunteerInput,
  condition?: ModelVolunteerConditionInput | null,
};

export type UpdateVolunteerMutation = {
  updateVolunteer?:  {
    __typename: "Volunteer",
    id: string,
    owner?: string | null,
    name: string,
    email: string,
    gender: string,
    isAvailableNow?: boolean | null,
    availabilitySchedule?:  Array< {
      __typename: "AvailabilitySlot",
      day: string,
      startTime: string,
      endTime: string,
    } | null > | null,
    warningCount?: number | null,
    isBanned?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteVolunteerMutationVariables = {
  input: DeleteVolunteerInput,
  condition?: ModelVolunteerConditionInput | null,
};

export type DeleteVolunteerMutation = {
  deleteVolunteer?:  {
    __typename: "Volunteer",
    id: string,
    owner?: string | null,
    name: string,
    email: string,
    gender: string,
    isAvailableNow?: boolean | null,
    availabilitySchedule?:  Array< {
      __typename: "AvailabilitySlot",
      day: string,
      startTime: string,
      endTime: string,
    } | null > | null,
    warningCount?: number | null,
    isBanned?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCallMutationVariables = {
  input: DeleteCallInput,
  condition?: ModelCallConditionInput | null,
};

export type DeleteCallMutation = {
  deleteCall?:  {
    __typename: "Call",
    id: string,
    blindUserId: string,
    blindUserName: string,
    volunteerId?: string | null,
    volunteerName?: string | null,
    status: CallStatus,
    meetingId: string,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type UpdateReportMutationVariables = {
  input: UpdateReportInput,
  condition?: ModelReportConditionInput | null,
};

export type UpdateReportMutation = {
  updateReport?:  {
    __typename: "Report",
    id: string,
    callId: string,
    reportedBy: string,
    category: ReportCategory,
    description?: string | null,
    status: ReportStatus,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteReportMutationVariables = {
  input: DeleteReportInput,
  condition?: ModelReportConditionInput | null,
};

export type DeleteReportMutation = {
  deleteReport?:  {
    __typename: "Report",
    id: string,
    callId: string,
    reportedBy: string,
    category: ReportCategory,
    description?: string | null,
    status: ReportStatus,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteBlindUserMutationVariables = {
  input: DeleteBlindUserInput,
  condition?: ModelBlindUserConditionInput | null,
};

export type DeleteBlindUserMutation = {
  deleteBlindUser?:  {
    __typename: "BlindUser",
    id: string,
    trustedVolunteerIds?: Array< string | null > | null,
    isBanned?: boolean | null,
    adminWarningMessage?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateNotificationMutationVariables = {
  input: CreateNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type CreateNotificationMutation = {
  createNotification?:  {
    __typename: "Notification",
    id: string,
    userId: string,
    title: string,
    message: string,
    type: NotificationType,
    isRead?: boolean | null,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateNotificationMutationVariables = {
  input: UpdateNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type UpdateNotificationMutation = {
  updateNotification?:  {
    __typename: "Notification",
    id: string,
    userId: string,
    title: string,
    message: string,
    type: NotificationType,
    isRead?: boolean | null,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteNotificationMutationVariables = {
  input: DeleteNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type DeleteNotificationMutation = {
  deleteNotification?:  {
    __typename: "Notification",
    id: string,
    userId: string,
    title: string,
    message: string,
    type: NotificationType,
    isRead?: boolean | null,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateCallMutationVariables = {
  input: CreateCallInput,
  condition?: ModelCallConditionInput | null,
};

export type CreateCallMutation = {
  createCall?:  {
    __typename: "Call",
    id: string,
    blindUserId: string,
    blindUserName: string,
    volunteerId?: string | null,
    volunteerName?: string | null,
    status: CallStatus,
    meetingId: string,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type UpdateCallMutationVariables = {
  input: UpdateCallInput,
  condition?: ModelCallConditionInput | null,
};

export type UpdateCallMutation = {
  updateCall?:  {
    __typename: "Call",
    id: string,
    blindUserId: string,
    blindUserName: string,
    volunteerId?: string | null,
    volunteerName?: string | null,
    status: CallStatus,
    meetingId: string,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type CreateReportMutationVariables = {
  input: CreateReportInput,
  condition?: ModelReportConditionInput | null,
};

export type CreateReportMutation = {
  createReport?:  {
    __typename: "Report",
    id: string,
    callId: string,
    reportedBy: string,
    category: ReportCategory,
    description?: string | null,
    status: ReportStatus,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateBlindUserMutationVariables = {
  input: CreateBlindUserInput,
  condition?: ModelBlindUserConditionInput | null,
};

export type CreateBlindUserMutation = {
  createBlindUser?:  {
    __typename: "BlindUser",
    id: string,
    trustedVolunteerIds?: Array< string | null > | null,
    isBanned?: boolean | null,
    adminWarningMessage?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateBlindUserMutationVariables = {
  input: UpdateBlindUserInput,
  condition?: ModelBlindUserConditionInput | null,
};

export type UpdateBlindUserMutation = {
  updateBlindUser?:  {
    __typename: "BlindUser",
    id: string,
    trustedVolunteerIds?: Array< string | null > | null,
    isBanned?: boolean | null,
    adminWarningMessage?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetReportQueryVariables = {
  id: string,
};

export type GetReportQuery = {
  getReport?:  {
    __typename: "Report",
    id: string,
    callId: string,
    reportedBy: string,
    category: ReportCategory,
    description?: string | null,
    status: ReportStatus,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type ListReportsQueryVariables = {
  filter?: ModelReportFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListReportsQuery = {
  listReports?:  {
    __typename: "ModelReportConnection",
    items:  Array< {
      __typename: "Report",
      id: string,
      callId: string,
      reportedBy: string,
      category: ReportCategory,
      description?: string | null,
      status: ReportStatus,
      createdAt?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetNotificationQueryVariables = {
  id: string,
};

export type GetNotificationQuery = {
  getNotification?:  {
    __typename: "Notification",
    id: string,
    userId: string,
    title: string,
    message: string,
    type: NotificationType,
    isRead?: boolean | null,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type ListNotificationsQueryVariables = {
  filter?: ModelNotificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNotificationsQuery = {
  listNotifications?:  {
    __typename: "ModelNotificationConnection",
    items:  Array< {
      __typename: "Notification",
      id: string,
      userId: string,
      title: string,
      message: string,
      type: NotificationType,
      isRead?: boolean | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type NotificationsByUserIdQueryVariables = {
  userId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelNotificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type NotificationsByUserIdQuery = {
  notificationsByUserId?:  {
    __typename: "ModelNotificationConnection",
    items:  Array< {
      __typename: "Notification",
      id: string,
      userId: string,
      title: string,
      message: string,
      type: NotificationType,
      isRead?: boolean | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetVolunteerQueryVariables = {
  id: string,
};

export type GetVolunteerQuery = {
  getVolunteer?:  {
    __typename: "Volunteer",
    id: string,
    owner?: string | null,
    name: string,
    email: string,
    gender: string,
    isAvailableNow?: boolean | null,
    availabilitySchedule?:  Array< {
      __typename: "AvailabilitySlot",
      day: string,
      startTime: string,
      endTime: string,
    } | null > | null,
    warningCount?: number | null,
    isBanned?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListVolunteersQueryVariables = {
  filter?: ModelVolunteerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListVolunteersQuery = {
  listVolunteers?:  {
    __typename: "ModelVolunteerConnection",
    items:  Array< {
      __typename: "Volunteer",
      id: string,
      owner?: string | null,
      name: string,
      email: string,
      gender: string,
      isAvailableNow?: boolean | null,
      warningCount?: number | null,
      isBanned?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type VolunteersByOwnerAndIdQueryVariables = {
  owner: string,
  id?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelVolunteerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type VolunteersByOwnerAndIdQuery = {
  volunteersByOwnerAndId?:  {
    __typename: "ModelVolunteerConnection",
    items:  Array< {
      __typename: "Volunteer",
      id: string,
      owner?: string | null,
      name: string,
      email: string,
      gender: string,
      isAvailableNow?: boolean | null,
      warningCount?: number | null,
      isBanned?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCallQueryVariables = {
  id: string,
};

export type GetCallQuery = {
  getCall?:  {
    __typename: "Call",
    id: string,
    blindUserId: string,
    blindUserName: string,
    volunteerId?: string | null,
    volunteerName?: string | null,
    status: CallStatus,
    meetingId: string,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type ListCallsQueryVariables = {
  filter?: ModelCallFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCallsQuery = {
  listCalls?:  {
    __typename: "ModelCallConnection",
    items:  Array< {
      __typename: "Call",
      id: string,
      blindUserId: string,
      blindUserName: string,
      volunteerId?: string | null,
      volunteerName?: string | null,
      status: CallStatus,
      meetingId: string,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetBlindUserQueryVariables = {
  id: string,
};

export type GetBlindUserQuery = {
  getBlindUser?:  {
    __typename: "BlindUser",
    id: string,
    trustedVolunteerIds?: Array< string | null > | null,
    isBanned?: boolean | null,
    adminWarningMessage?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListBlindUsersQueryVariables = {
  id?: string | null,
  filter?: ModelBlindUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListBlindUsersQuery = {
  listBlindUsers?:  {
    __typename: "ModelBlindUserConnection",
    items:  Array< {
      __typename: "BlindUser",
      id: string,
      trustedVolunteerIds?: Array< string | null > | null,
      isBanned?: boolean | null,
      adminWarningMessage?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateReportSubscriptionVariables = {
  filter?: ModelSubscriptionReportFilterInput | null,
};

export type OnCreateReportSubscription = {
  onCreateReport?:  {
    __typename: "Report",
    id: string,
    callId: string,
    reportedBy: string,
    category: ReportCategory,
    description?: string | null,
    status: ReportStatus,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateReportSubscriptionVariables = {
  filter?: ModelSubscriptionReportFilterInput | null,
};

export type OnUpdateReportSubscription = {
  onUpdateReport?:  {
    __typename: "Report",
    id: string,
    callId: string,
    reportedBy: string,
    category: ReportCategory,
    description?: string | null,
    status: ReportStatus,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteReportSubscriptionVariables = {
  filter?: ModelSubscriptionReportFilterInput | null,
};

export type OnDeleteReportSubscription = {
  onDeleteReport?:  {
    __typename: "Report",
    id: string,
    callId: string,
    reportedBy: string,
    category: ReportCategory,
    description?: string | null,
    status: ReportStatus,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null,
  userId?: string | null,
};

export type OnCreateNotificationSubscription = {
  onCreateNotification?:  {
    __typename: "Notification",
    id: string,
    userId: string,
    title: string,
    message: string,
    type: NotificationType,
    isRead?: boolean | null,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null,
  userId?: string | null,
};

export type OnUpdateNotificationSubscription = {
  onUpdateNotification?:  {
    __typename: "Notification",
    id: string,
    userId: string,
    title: string,
    message: string,
    type: NotificationType,
    isRead?: boolean | null,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null,
  userId?: string | null,
};

export type OnDeleteNotificationSubscription = {
  onDeleteNotification?:  {
    __typename: "Notification",
    id: string,
    userId: string,
    title: string,
    message: string,
    type: NotificationType,
    isRead?: boolean | null,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateVolunteerSubscriptionVariables = {
  filter?: ModelSubscriptionVolunteerFilterInput | null,
  owner?: string | null,
};

export type OnCreateVolunteerSubscription = {
  onCreateVolunteer?:  {
    __typename: "Volunteer",
    id: string,
    owner?: string | null,
    name: string,
    email: string,
    gender: string,
    isAvailableNow?: boolean | null,
    availabilitySchedule?:  Array< {
      __typename: "AvailabilitySlot",
      day: string,
      startTime: string,
      endTime: string,
    } | null > | null,
    warningCount?: number | null,
    isBanned?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateVolunteerSubscriptionVariables = {
  filter?: ModelSubscriptionVolunteerFilterInput | null,
  owner?: string | null,
};

export type OnUpdateVolunteerSubscription = {
  onUpdateVolunteer?:  {
    __typename: "Volunteer",
    id: string,
    owner?: string | null,
    name: string,
    email: string,
    gender: string,
    isAvailableNow?: boolean | null,
    availabilitySchedule?:  Array< {
      __typename: "AvailabilitySlot",
      day: string,
      startTime: string,
      endTime: string,
    } | null > | null,
    warningCount?: number | null,
    isBanned?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteVolunteerSubscriptionVariables = {
  filter?: ModelSubscriptionVolunteerFilterInput | null,
  owner?: string | null,
};

export type OnDeleteVolunteerSubscription = {
  onDeleteVolunteer?:  {
    __typename: "Volunteer",
    id: string,
    owner?: string | null,
    name: string,
    email: string,
    gender: string,
    isAvailableNow?: boolean | null,
    availabilitySchedule?:  Array< {
      __typename: "AvailabilitySlot",
      day: string,
      startTime: string,
      endTime: string,
    } | null > | null,
    warningCount?: number | null,
    isBanned?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCallSubscriptionVariables = {
  filter?: ModelSubscriptionCallFilterInput | null,
};

export type OnCreateCallSubscription = {
  onCreateCall?:  {
    __typename: "Call",
    id: string,
    blindUserId: string,
    blindUserName: string,
    volunteerId?: string | null,
    volunteerName?: string | null,
    status: CallStatus,
    meetingId: string,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateCallSubscriptionVariables = {
  filter?: ModelSubscriptionCallFilterInput | null,
};

export type OnUpdateCallSubscription = {
  onUpdateCall?:  {
    __typename: "Call",
    id: string,
    blindUserId: string,
    blindUserName: string,
    volunteerId?: string | null,
    volunteerName?: string | null,
    status: CallStatus,
    meetingId: string,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteCallSubscriptionVariables = {
  filter?: ModelSubscriptionCallFilterInput | null,
};

export type OnDeleteCallSubscription = {
  onDeleteCall?:  {
    __typename: "Call",
    id: string,
    blindUserId: string,
    blindUserName: string,
    volunteerId?: string | null,
    volunteerName?: string | null,
    status: CallStatus,
    meetingId: string,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateBlindUserSubscriptionVariables = {
  filter?: ModelSubscriptionBlindUserFilterInput | null,
};

export type OnCreateBlindUserSubscription = {
  onCreateBlindUser?:  {
    __typename: "BlindUser",
    id: string,
    trustedVolunteerIds?: Array< string | null > | null,
    isBanned?: boolean | null,
    adminWarningMessage?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateBlindUserSubscriptionVariables = {
  filter?: ModelSubscriptionBlindUserFilterInput | null,
};

export type OnUpdateBlindUserSubscription = {
  onUpdateBlindUser?:  {
    __typename: "BlindUser",
    id: string,
    trustedVolunteerIds?: Array< string | null > | null,
    isBanned?: boolean | null,
    adminWarningMessage?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteBlindUserSubscriptionVariables = {
  filter?: ModelSubscriptionBlindUserFilterInput | null,
};

export type OnDeleteBlindUserSubscription = {
  onDeleteBlindUser?:  {
    __typename: "BlindUser",
    id: string,
    trustedVolunteerIds?: Array< string | null > | null,
    isBanned?: boolean | null,
    adminWarningMessage?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
