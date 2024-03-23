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
      orderNumber: 0,
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
      property: 0,
      militaryEnrollment: "",
      taxPayment: 0,
      taxEvasionForLastFiveYears: 0,
      taxEvasionForNow: 0,
      numberOfCandidacies: "",
    };

    const columns = $(row).find("td");

    columns.each((index, col) => {
      switch (index) {
        case 0:
          candidate.electoralDistrict = $(col).text().trim();
          break;
        case 1:
          candidate.photo = `http://info.nec.go.kr${
            $(col).find("input").attr("src") || ""
          }`;
          break;
        case 2:
          candidate.orderNumber = +$(col).text().trim();
          break;
        case 3:
          candidate.party = $(col).text().trim();
          break;
        case 4: {
          candidate.name = $(col).find("a").text().trim();
          const regex = /\((.+)\)/;
          const nameHanjaResult = regex.exec(candidate.name);
          if (nameHanjaResult) {
            candidate.nameHanja = nameHanjaResult[1];
          }

          break;
        }
        case 5:
          candidate.gender = $(col).text().trim();
          break;
        case 6:
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
        case 7:
          candidate.address = $(col).text().trim();
          break;
        case 8:
          candidate.job = $(col).text().trim();
          break;
        case 9:
          candidate.educations = $(col)
            .text()
            .trim()
            .split("\n")
            .map((education) => education.trim());
          break;
        case 10:
          candidate.careers = $(col)
            .text()
            .trim()
            .split("\n")
            .map((education) => education.trim());
          break;
        case 11:
          candidate.property = +$(col).text().trim().replace(/,/g, "");
          break;
        case 12:
          candidate.militaryEnrollment = $(col).text().trim();
          break;
        case 13:
          candidate.taxPayment = +$(col).text().trim().replace(/,/g, "");
          break;
        case 14:
          candidate.taxEvasionForLastFiveYears = +$(col)
            .text()
            .trim()
            .replace(/,/g, "");
        case 15:
          candidate.taxEvasionForNow = +$(col).text().trim().replace(/,/g, "");
          break;
        case 16:
          candidate.criminalRecord = $(col).text().trim();
          break;
        case 17:
          candidate.numberOfCandidacies = $(col).text().trim();
          break;
      }
    });

    candidates.push(candidate);
  });

  return candidates;
};
