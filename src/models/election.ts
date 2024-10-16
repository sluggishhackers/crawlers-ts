export type ServerSideGeneralElectionSido = {
  CODE: number;
  NAME: string;
};

export type ServerSideGeneralElectionSigungu = {
  CODE: number;
  NAME: string;
};

export type ServerSideGeneralElectionElectoralDistrict = {
  CODE: number;
  NAME: string;
};

export type ServerSideGeneralElectionCandidate = {
  address: string;
  number: number;
  order: number;
  job: string;
  electoralDistrict: string;
  name: string;
  nameHanja?: string;
  birthDate: string;
  age: number;
  party: string;
  photo: string;
  gender: string;
  educations: string[];
  careers: string[];
  criminalRecord: string;
  registerDate: string;
  property: number;
  militaryEnrollment: string;
  taxPayment: number;
  taxEvasionForLastFiveYears: number;
  taxEvasionForNow: number;
  numberOfCandidacies: string;
};
