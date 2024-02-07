import { load } from "cheerio";
import { PrpslDetail } from "@/models/prpsl";
import { ServerSideGeneralElectionCandidate } from "@/models/election";

export const generalElectionCandidates = (
  html: string
): ServerSideGeneralElectionCandidate[] => {
  const $ = load(html);
  const rows = $("table#table01 tbody tr");
  const candidates: ServerSideGeneralElectionCandidate[] = [];

  rows.each((_index, row) => {
    let candidate: ServerSideGeneralElectionCandidate = {
      address: "",
      job: "",
      electoralDistrict: "",
      name: "",
      nameHanja: "",
      birthDate: "",
      age: 0,
      party: "",
      photo: "",
      gender: "",
      educations: [],
      careers: [],
      criminalRecord: "",
      registerDate: "",
    };

    const columns = $(row).find("td");

    columns.each((index, col) => {
      switch (index) {
        case 0:
          candidate.electoralDistrict = $(col).text().trim();
          break;
        case 1:
          candidate.party = $(col).text().trim();
          break;
        case 2:
          candidate.photo = `http://info.nec.go.kr${
            $(col).find("input").attr("src") || ""
          }`;
          break;
        case 3: {
          candidate.name = $(col).find("a").text().trim();
          const regex = /\((.+)\)/;
          const nameHanjaResult = regex.exec(candidate.name);
          if (nameHanjaResult) {
            candidate.nameHanja = nameHanjaResult[1];
          }

          break;
        }
        case 4:
          candidate.gender = $(col).text().trim();
          break;
        case 5:
          const regexForBirth = /\d{4}.\d{2}.\d{2}/;
          const birthResult = regexForBirth.exec($(col).text().trim());
          if (birthResult) {
            candidate.birthDate = birthResult[0].replaceAll(".", "-");
          }

          const regex = /\((\d+)세\)/;
          const ageResult = regex.exec($(col).text().trim());
          if (ageResult) {
            candidate.age = +ageResult[1];
          }
          break;
        case 6:
          candidate.address = $(col).text().trim();
          break;
        case 7:
          candidate.job = $(col).text().trim();
          break;
        case 8:
          candidate.educations = $(col)
            .text()
            .trim()
            .split("\n")
            .map((education) => education.trim());
          break;
        case 9:
          candidate.careers = $(col)
            .text()
            .trim()
            .split("\n")
            .map((education) => education.trim());
          break;
        case 10:
          candidate.criminalRecord = $(col).text().trim();
          break;
        case 11:
          candidate.registerDate = $(col).text().trim();
          break;
      }
    });

    candidates.push(candidate);
  });

  return candidates;
};
