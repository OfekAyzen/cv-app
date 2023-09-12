/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCandidate = /* GraphQL */ `
  mutation CreateCandidate(
    $input: CreateCandidateInput!
    $condition: ModelCandidateConditionInput
  ) {
    createCandidate(input: $input, condition: $condition) {
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
      note
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateCandidate = /* GraphQL */ `
  mutation UpdateCandidate(
    $input: UpdateCandidateInput!
    $condition: ModelCandidateConditionInput
  ) {
    updateCandidate(input: $input, condition: $condition) {
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
      note
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteCandidate = /* GraphQL */ `
  mutation DeleteCandidate(
    $input: DeleteCandidateInput!
    $condition: ModelCandidateConditionInput
  ) {
    deleteCandidate(input: $input, condition: $condition) {
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
      note
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createJobs = /* GraphQL */ `
  mutation CreateJobs(
    $input: CreateJobsInput!
    $condition: ModelJobsConditionInput
  ) {
    createJobs(input: $input, condition: $condition) {
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
export const updateJobs = /* GraphQL */ `
  mutation UpdateJobs(
    $input: UpdateJobsInput!
    $condition: ModelJobsConditionInput
  ) {
    updateJobs(input: $input, condition: $condition) {
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
export const deleteJobs = /* GraphQL */ `
  mutation DeleteJobs(
    $input: DeleteJobsInput!
    $condition: ModelJobsConditionInput
  ) {
    deleteJobs(input: $input, condition: $condition) {
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
export const createCandidateJobs = /* GraphQL */ `
  mutation CreateCandidateJobs(
    $input: CreateCandidateJobsInput!
    $condition: ModelCandidateJobsConditionInput
  ) {
    createCandidateJobs(input: $input, condition: $condition) {
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
        note
        status
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
export const updateCandidateJobs = /* GraphQL */ `
  mutation UpdateCandidateJobs(
    $input: UpdateCandidateJobsInput!
    $condition: ModelCandidateJobsConditionInput
  ) {
    updateCandidateJobs(input: $input, condition: $condition) {
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
        note
        status
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
export const deleteCandidateJobs = /* GraphQL */ `
  mutation DeleteCandidateJobs(
    $input: DeleteCandidateJobsInput!
    $condition: ModelCandidateJobsConditionInput
  ) {
    deleteCandidateJobs(input: $input, condition: $condition) {
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
        note
        status
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
