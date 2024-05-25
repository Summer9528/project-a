import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun,
} from "docx";
import mammoth from "mammoth";
import type {
  IBaseInfo,
  IJobIntention,
  IEducation,
  IExperience,
  IProjectExperience,
} from "@/pages/resume/types/interface";

export class DocumentCreator {
  document: Document;
  constructor({ baseInfo, educations, experiences }) {
    this.document = new Document({
      sections: [
        {
          children: [
            ...this.createBaseInfo(baseInfo),
            this.createHeading("教育经历"),
            ...this.createEducations(educations),
            this.createHeading("工作经历"),
            ...this.createExperiences(experiences),
          ],
        },
      ],
    });
  }

  public createHeading(text: string): Paragraph {
    return new Paragraph({
      heading: HeadingLevel.HEADING_1,
      text: text,
      thematicBreak: true,
    });
  }
  public createBaseInfo(baseInfo: IBaseInfo): [Paragraph, Paragraph] {
    const p0 = new Paragraph({
      heading: HeadingLevel.HEADING_1,
      text: baseInfo.name,
    });
    const p1 = new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: `年龄：${baseInfo.age}岁`,
        }),
        new TextRun(`性别：${baseInfo.gender}`),
        new TextRun({
          text:`邮箱：${baseInfo.email}`,
          break:1
        }),
      ],
    });
    return [p0, p1];
  }
  public createJobIntention(jobIntention: IJobIntention): Paragraph {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      text: jobIntention.intention,
    });
  }
  public createEducations(educations: IEducation[]): Paragraph[] {
    return educations
      .map((education) => {
        const arr: Paragraph[] = [];
        arr.push(
          this.createInstitutionHeader(
            education.schoolName,
            `${education.startDate.year} - ${education.endDate.year}`
          )
        );
        arr.push(
          this.createRoleText(`${education.major} - ${education.degree}`)
        );
        // const bulletPoints = this.splitParagraphIntoBullets(education.notes);
        // bulletPoints.forEach((bulletPoint) => {
        //   arr.push(this.createBullet(bulletPoint));
        // })
        return arr;
      })
      .reduce((prev, curr) => prev.concat(curr), []);
  }
  public createExperiences(experiences: IExperience[]): Paragraph[] {
    return experiences
      .map((experience) => {
        const arr: Paragraph[] = [];
        arr.push(
          this.createInstitutionHeader(
            experience.companyName,
            this.createWorkDateText(
              experience.startDate,
              experience.endDate,
              experience.isCurrent
            )
          )
        );
        // arr.push(this.createRoleText(experience.jobContent));
        return arr;
      })
      .reduce((prev, curr) => prev.concat(curr), []);
  }
  public createWorkDateText(
    startDate: any,
    endDate: any,
    isCurrent: boolean
  ): string {
    const startDateText =
      this.getMonthFromInt(startDate.month) + "." + startDate.year;
    const endDateText = isCurrent
      ? "至今"
      : this.getMonthFromInt(endDate.month) + "." + endDate.year;
    return `${startDateText} - ${endDateText}`;
  }
  public getMonthFromInt(value: number): string {
    switch (value) {
      case 1:
        return "Jan";
      case 2:
        return "Feb";
      case 3:
        return "Mar";
      case 4:
        return "Apr";
      case 5:
        return "May";
      case 6:
        return "Jun";
      case 7:
        return "Jul";
      case 8:
        return "Aug";
      case 9:
        return "Sept";
      case 10:
        return "Oct";
      case 11:
        return "Nov";
      case 12:
        return "Dec";
      default:
        return "N/A";
    }
  }
  public createInstitutionHeader(institutionName: string, dateText): Paragraph {
    return new Paragraph({
      alignment:AlignmentType.DISTRIBUTE,
      // tabStops: [
      //   {
      //     type: TabStopType.LEFT,
      //     position: TabStopPosition.MAX,
      //   },
      //   {
      //     type: TabStopType.RIGHT,
      //     position: TabStopPosition.MAX,
      //   }
      // ],
      children: [
        new TextRun({
          text: institutionName,
          bold: true,
          rightToLeft: true,
        }),
        new TextRun({
          text: `\t${dateText}`,
          bold: true,
        }),
      ],
    });
  }
  public createRoleText(roleText: string): Paragraph {
    return new Paragraph({
      children: [
        new TextRun({
          text: roleText,
          italics: true,
        }),
      ],
    });
  }
  public createBullet(text: string): Paragraph {
    return new Paragraph({
      text: text,
      bullet: {
        level: 0,
      },
    });
  }
  public splitParagraphIntoBullets(text: string): string[] {
    return text.split("\n\n");
  }
  public getDocument(): Document {
    return this.document;
  }
}
// ----
/**
 * @description 将一个.docx文件转换成HTML字符串
 */
export const convertWordToHTML = (wordBuffer: ArrayBuffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    mammoth
      .convertToHtml({
        arrayBuffer: wordBuffer,
      })
      .then((res) => {
        const htmlStr = res.value
          .replace(//g, "")
          .replace("<h1>", '<h1 style="text-align: center;">')
          .replace(/<table>/g, '<table style="border-collapse: collapse;">')
          .replace(/<tr>/g, '<tr style="height: 30px;">')
          .replace(/<td>/g, '<td style="border: 1px solid pink;">')
          .replace(/<p>/g, '<p style="text-indent: 2em;">');
        resolve(htmlStr);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
