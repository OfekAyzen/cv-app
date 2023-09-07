/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCandidate = /* GraphQL */ `
  subscription OnCreateCandidate(
    $filter: ModelSubscriptionCandidateFilterInput
  ) {
    onCreateCandidate(filter: $filter) {
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
export const onUpdateCandidate = /* GraphQL */ `
  subscription OnUpdateCandidate(
    $filter: ModelSubscriptionCandidateFilterInput
  ) {
    onUpdateCandidate(filter: $filter) {
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
export const onDeleteCandidate = /* GraphQL */ `
  subscription OnDeleteCandidate(
    $filter: ModelSubscriptionCandidateFilterInput
  ) {
    onDeleteCandidate(filter: $filter) {
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
export const onCreateJobs = /* GraphQL */ `
  subscription OnCreateJobs($filter: ModelSubscriptionJobsFilterInput) {
    onCreateJobs(filter: $filter) {
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
export const onUpdateJobs = /* GraphQL */ `
  subscription OnUpdateJobs($filter: ModelSubscriptionJobsFilterInput) {
    onUpdateJobs(filter: $filter) {
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
export const onDeleteJobs = /* GraphQL */ `
  subscription OnDeleteJobs($filter: ModelSubscriptionJobsFilterInput) {
    onDeleteJobs(filter: $filter) {
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
export const onCreateCandidateJobs = /* GraphQL */ `
  subscription OnCreateCandidateJobs(
    $filter: ModelSubscriptionCandidateJobsFilterInput
  ) {
    onCreateCandidateJobs(filter: $filter) {
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
export const onUpdateCandidateJobs = /* GraphQL */ `
  subscription OnUpdateCandidateJobs(
    $filter: ModelSubscriptionCandidateJobsFilterInput
  ) {
    onUpdateCandidateJobs(filter: $filter) {
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
export const onDeleteCandidateJobs = /* GraphQL */ `
  subscription OnDeleteCandidateJobs(
    $filter: ModelSubscriptionCandidateJobsFilterInput
  ) {
    onDeleteCandidateJobs(filter: $filter) {
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
