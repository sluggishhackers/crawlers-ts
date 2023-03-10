export type LocalCommittee = {
  id?: number;
  category: string;
  title: string;
  roles: string;
  createdDate: string; // YYYY-MM-DD
  department: string;
  code: string;
};

export enum PositionsForSexRatio {
  "wichok" = "wichok",
  "dangyeon" = "dangyeon",
  "immyeong" = "immyeong",
  "gonggae" = "gonggae",
}

export type LocalCommitteeDetail = {
  code: string;
  category: string;
  title: string;
  department: string;
  reference: string;
  basis: string;
  purpose: string;
  roles: string;
  createdDate: string | null; // YYYY-MM-DD
  revocatedDate: string | null;
  status: string;
  sexRatio_civilServant_wichok_male: number;
  sexRatio_civilServant_wichok_female: number;
  sexRatio_civilServant_dangyeon_male: number;
  sexRatio_civilServant_dangyeon_female: number;
  sexRatio_civilServant_immyeong_male: number;
  sexRatio_civilServant_immyeong_female: number;
  sexRatio_civilServant_gonggae_male: number;
  sexRatio_civilServant_gonggae_female: number;
  sexRatio_civilian_sido_wichok_male: number;
  sexRatio_civilian_sido_wichok_female: number;
  sexRatio_civilian_sido_dangyeon_male: number;
  sexRatio_civilian_sido_dangyeon_female: number;
  sexRatio_civilian_sido_immyeong_male: number;
  sexRatio_civilian_sido_immyeong_female: number;
  sexRatio_civilian_sido_gonggae_male: number;
  sexRatio_civilian_sido_gonggae_female: number;

  sexRatio_civilian_recommendation_wichok_male: number;
  sexRatio_civilian_recommendation_wichok_female: number;
  sexRatio_civilian_recommendation_dangyeon_male: number;
  sexRatio_civilian_recommendation_dangyeon_female: number;
  sexRatio_civilian_recommendation_immyeong_male: number;
  sexRatio_civilian_recommendation_immyeong_female: number;
  sexRatio_civilian_recommendation_gonggae_male: number;
  sexRatio_civilian_recommendation_gonggae_female: number;

  sexRatio_civilian_citizen_wichok_male: number;
  sexRatio_civilian_citizen_wichok_female: number;
  sexRatio_civilian_citizen_dangyeon_male: number;
  sexRatio_civilian_citizen_dangyeon_female: number;
  sexRatio_civilian_citizen_immyeong_male: number;
  sexRatio_civilian_citizen_immyeong_female: number;
  sexRatio_civilian_citizen_gonggae_male: number;
  sexRatio_civilian_citizen_gonggae_female: number;
  operations: {
    year: number;
    holdingCount: number;
    budget: number;
    expenditure: number;
  }[];
};
