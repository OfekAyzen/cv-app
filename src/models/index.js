// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Candidate, Jobs, CandidateJobs } = initSchema(schema);

export {
  Candidate,
  Jobs,
  CandidateJobs
};