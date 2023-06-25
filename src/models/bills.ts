export type Bill = {
  city?: string;
  category?: string;
  year?: number;
  term?: string;
  number: number;
  title: string;
  link: string;
  representativeProposer?: string;
  proposer?: string;
  proposedDate?: string;
  committee?: string;
  committeeResult?: string;
  plenarySessionResult?: string;
};
