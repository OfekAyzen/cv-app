import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerCandidate = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Candidate, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly location?: string | null;
  readonly email?: string | null;
  readonly phone_number: string;
  readonly gender?: string | null;
  readonly education?: string | null;
  readonly work_experience?: string | null;
  readonly skills?: string | null;
  readonly position?: string | null;
  readonly certifications?: string | null;
  readonly role?: string | null;
  readonly Jobs?: (CandidateJobs | null)[] | null;
  readonly cognitoSub?: string | null;
  readonly note?: string | null;
  readonly status?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCandidate = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Candidate, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly location?: string | null;
  readonly email?: string | null;
  readonly phone_number: string;
  readonly gender?: string | null;
  readonly education?: string | null;
  readonly work_experience?: string | null;
  readonly skills?: string | null;
  readonly position?: string | null;
  readonly certifications?: string | null;
  readonly role?: string | null;
  readonly Jobs: AsyncCollection<CandidateJobs>;
  readonly cognitoSub?: string | null;
  readonly note?: string | null;
  readonly status?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Candidate = LazyLoading extends LazyLoadingDisabled ? EagerCandidate : LazyCandidate

export declare const Candidate: (new (init: ModelInit<Candidate>) => Candidate) & {
  copyOf(source: Candidate, mutator: (draft: MutableModel<Candidate>) => MutableModel<Candidate> | void): Candidate;
}

type EagerJobs = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Jobs, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly job_description?: string | null;
  readonly qualifications?: string | null;
  readonly job_title?: string | null;
  readonly candidates?: (CandidateJobs | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyJobs = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Jobs, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly job_description?: string | null;
  readonly qualifications?: string | null;
  readonly job_title?: string | null;
  readonly candidates: AsyncCollection<CandidateJobs>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Jobs = LazyLoading extends LazyLoadingDisabled ? EagerJobs : LazyJobs

export declare const Jobs: (new (init: ModelInit<Jobs>) => Jobs) & {
  copyOf(source: Jobs, mutator: (draft: MutableModel<Jobs>) => MutableModel<Jobs> | void): Jobs;
}

type EagerCandidateJobs = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CandidateJobs, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly candidateId?: string | null;
  readonly jobsId?: string | null;
  readonly candidate: Candidate;
  readonly jobs: Jobs;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCandidateJobs = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CandidateJobs, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly candidateId?: string | null;
  readonly jobsId?: string | null;
  readonly candidate: AsyncItem<Candidate>;
  readonly jobs: AsyncItem<Jobs>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CandidateJobs = LazyLoading extends LazyLoadingDisabled ? EagerCandidateJobs : LazyCandidateJobs

export declare const CandidateJobs: (new (init: ModelInit<CandidateJobs>) => CandidateJobs) & {
  copyOf(source: CandidateJobs, mutator: (draft: MutableModel<CandidateJobs>) => MutableModel<CandidateJobs> | void): CandidateJobs;
}