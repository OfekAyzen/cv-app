/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCandidate = /* GraphQL */ `
  query GetCandidate($id: ID!) {
    getCandidate(id: $id) {
      id
      first_name
      last_name
      location
      email
      phone_number
      gender
      education
      work_experience
      skills
      position
      certifications
      role
      Jobs {
        nextToken
        startedAt
        __typename
      }
      cognitoSub
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listCandidates = /* GraphQL */ `
  query ListCandidates(
    $filter: ModelCandidateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCandidates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        first_name
        last_name
        location
        email
        phone_number
        gender
        education
        work_experience
        skills
        position
        certifications
        role
        cognitoSub
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncCandidates = /* GraphQL */ `
  query SyncCandidates(
    $filter: ModelCandidateFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCandidates(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        first_name
        last_name
        location
        email
        phone_number
        gender
        education
        work_experience
        skills
        position
        certifications
        role
        cognitoSub
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getJobs = /* GraphQL */ `
  query GetJobs($id: ID!) {
    getJobs(id: $id) {
      id
      job_description
      qualifications
      job_title
      candidates {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listJobs = /* GraphQL */ `
  query ListJobs(
    $filter: ModelJobsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        job_description
        qualifications
        job_title
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncJobs = /* GraphQL */ `
  query SyncJobs(
    $filter: ModelJobsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncJobs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        job_description
        qualifications
        job_title
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getCandidateJobs = /* GraphQL */ `
  query GetCandidateJobs($id: ID!) {
    getCandidateJobs(id: $id) {
      id
      candidateId
      jobsId
      candidate {
        id
        first_name
        last_name
        location
        email
        phone_number
        gender
        education
        work_experience
        skills
        position
        certifications
        role
        cognitoSub
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      jobs {
        id
        job_description
        qualifications
        job_title
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listCandidateJobs = /* GraphQL */ `
  query ListCandidateJobs(
    $filter: ModelCandidateJobsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCandidateJobs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        candidateId
        jobsId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncCandidateJobs = /* GraphQL */ `
  query SyncCandidateJobs(
    $filter: ModelCandidateJobsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCandidateJobs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        candidateId
        jobsId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const candidateJobsByCandidateId = /* GraphQL */ `
  query CandidateJobsByCandidateId(
    $candidateId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCandidateJobsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    candidateJobsByCandidateId(
      candidateId: $candidateId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        candidateId
        jobsId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const candidateJobsByJobsId = /* GraphQL */ `
  query CandidateJobsByJobsId(
    $jobsId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCandidateJobsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    candidateJobsByJobsId(
      jobsId: $jobsId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        candidateId
        jobsId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
