import { type JonStatus } from "./enum";

// 基本信息
export interface IBaseInfo {
  name: string;
  gender: string;
  age: number;
  email: string;
  phone?: string;
}

// 教育经历
export interface IEducation {
  // 学校
  schoolName: string;
  // 专业
  major: string;
  // 学历
  degree: string;
  // 在校时间
  startDate: {
    year: number;
    month?: number;
    day?: number;
  };
  endDate: {
    year: number;
    month?: number;
    day?: number;
  };
}
// 求职意向
export interface IJobIntention {
  // 意向岗位
  intention: string;
  // 意向城市
  city: string;
  // 期望薪资
  salary?: string;
  // 求职类型
  jobType?: string; //社招或校招
  // 求职状态
  jobStatus?: JonStatus; // 离职-随时到岗；在职-月内到岗；在职-考虑机会
}
// 工作经验
export interface IExperience{
  // 公司名称
  companyName: string;
  // 公司行业
  companyIndustry?: string;
  // 职位
  job: string;
  // 工作内容
  jobContent: string;
  // 工作时间
  startDate: {
    year: number;
    month: number;
  };
  endDate?: {
    year: number;
    month: number;
  }
  isCurrent: boolean; // 是否是当前工作
}

// 项目经验
export interface IProjectExperience {
  // 项目名称
  projectName: string;
  // 公司名称
  companyName: string;
  // 项目描述
  projectDescription: string;
  // 项目时间
  projectTime: string;
  // 项目职责
  projectDuty: string;
  // 项目技术栈
  projectTechnologyStack: string;
  // 项目难点
  projectDifficulties?: string;
  // 项目难点解决方案
  projectDifficultiesSolution?: string;
}
export interface IResumeData {
  // 基本信息
  baseInfo: IBaseInfo;
  // 求职意向
  jobIntention: IJobIntention;
  // 教育经历
  educations: IEducation;
  // 工作经历
  experiences: IExperience[];
  // 项目经历
  projectExperience: IProjectExperience[];
  // 自我评价
  selfEvaluation: string;
}
