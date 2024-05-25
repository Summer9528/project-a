import React, { useRef, useState, useEffect } from "react";
import { Button, Input, Radio, Switch, Card, DatePicker } from "antd";
import type { FormProps } from "antd";
import { Form, InputNumber, List, Space, Select } from "antd";
import dayjs from "dayjs";
import {
  PlusOutlined,
  MinusCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import ResumeShow from "./components/show";
import { DocumentCreator } from "@/utils/file-generator";
import { Packer } from "docx";
import { saveAs } from "file-saver";

const Resume = () => {
  const [wordBuffer, setWordBuffer] = useState<ArrayBuffer>();
  // 是否开启预览
  const [isPreview, setIsPreview] = useState(false);
  const downloadResume = () => {
    if (!wordBuffer) {
      return;
    }
    saveAs(
      new Blob([wordBuffer], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      })
    );
  };
  const toggleStatus = () => {
    setIsPreview(!isPreview);
  };
  const previewDocument = (data) => {
    console.log("data", data);

    const doc = new DocumentCreator(data);
    Packer.toBlob(doc.getDocument()).then((blob) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(blob);
      reader.onload = () => {
        const buffer = reader.result as ArrayBuffer;
        setWordBuffer(buffer);
        console.log(888);
      };
    });
  };
  const initialValues =(()=>{
    const data = localStorage.getItem('resumeData')?JSON.parse(localStorage.getItem('resumeData')!):{};
    data.educations.forEach(item=>{
      item.time=item.time.map(t=>dayjs(t))
      
    })
    
    return data
  })()
  console.log("initialValues", initialValues);
  
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values from form: ", values);
    localStorage.setItem('resumeData', JSON.stringify(values))
    const data = formatFormData(values);
    setIsPreview(true);
    previewDocument(data);
  };
  const formatFormData = (formData: any) => {
    const { baseInfo, educations, experiences } = formData;

    return {
      baseInfo: {
        name: baseInfo.name,
        age: baseInfo.age,
        gender: baseInfo.gender === "male" ? "男" : "女",
        email: baseInfo.email || "",
      },
      educations: (educations || []).map((item: any) => ({
        schoolName: item.schoolName,
        startDate: {
          year: item.time[0].$y,
          month: item.time[0].$M,
          day: item.time[0].$D,
        },
        endDate: {
          year: item.time[1].$y,
          month: item.time[1].$M,
          day: item.time[1].$D,
        },
        degree: item.degree,
        major: item.major,
      })),
      experiences: (experiences || []).map((item: any) => ({
        company: {
          name: item.companyName,
        },
        startDate: {
          year: item.time[0].$y,
          month: item.time[0].$M,
          day: item.time[0].$D,
        },
        endDate: {
          year: item.time[1].$y,
          month: item.time[1].$M,
          day: item.time[1].$D,
        },
        summary: item.summary,
      })),
    };
  };
  return (
    <div className="container box-border   py-20 h-full overflow-auto max-h-screen">
      <div className="header fixed top-0 left-0 right-0 h-20">
        <Button type="primary" onClick={() => downloadResume()}>
          导出简历
        </Button>
        {isPreview ? "1" : 2}
        <Switch
          checkedChildren="开启预览"
          unCheckedChildren="关闭预览"
          defaultChecked={false}
          onChange={() => toggleStatus()}
        />
      </div>
      <div className="content px-5 flex justify-between items-start">
        <div>
          <Form form={form} initialValues={initialValues} name="complex-form" onFinish={onFinish}>
            <Card size="small" title="基本信息">
              <Form.Item name={["baseInfo", "name"]} label="Name">
                <Input />
              </Form.Item>
              <Form.Item name={["baseInfo", "age"]} label="Age">
                <Input type="number" />
              </Form.Item>
              <Form.Item label="性别" name={["baseInfo", "gender"]}>
                <Radio.Group>
                  <Radio value="male">男</Radio>
                  <Radio value="female">女</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name={["baseInfo", "email"]} label="邮箱">
                <Input />
              </Form.Item>
            </Card>
            <Form.List name="educations">
              {(fields, { add, remove }) => (
                <div className="flex gap-x-[16px] flex-col mt-5">
                  {fields.map((field,index) => (
                    
                    <Card
                      size="small"
                      title={`教育经历 ${field.name + 1}`}
                      key={field.key}
                      extra={
                        <CloseOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      }
                    >
                      <Form.Item
                        label="学校名称"
                        name={[field.name, "schoolName"]}
                      >
                        
                        <Input />
                      </Form.Item>
                      <Form.Item label="时间" name={[field.name, "time"]}>
                        {/* <DatePicker.RangePicker  defaultValue={initialValues.educations[index].time}/> */}
                        <DatePicker.RangePicker />
                      </Form.Item>
                      <Form.Item label="学历" name={[field.name, "degree"]}>
                        <Select
                          options={[
                            { label: "小学", value: "小学" },
                            { label: "初中", value: "初中" },
                            { label: "高中", value: "高中" },
                            { label: "大专", value: "大专" },
                            { label: "本科", value: "本科" },
                            { label: "硕士", value: "硕士" },
                            { label: "博士", value: "博士" },
                          ]}
                        ></Select>
                      </Form.Item>
                      <Form.Item label="专业" name={[field.name, "major"]}>
                        <Input />
                      </Form.Item>
                    </Card>
                  ))}
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    className="mt-5"
                  >
                    + 教育经历
                  </Button>
                </div>
              )}
            </Form.List>
            <Form.List name="experiences">
              {(fields, { add, remove }) => (
                <div className="flex gap-x-[16px] flex-col mt-5">
                  {fields.map((field) => (
                    <Card
                      size="small"
                      title={`工作经历 ${field.name + 1}`}
                      key={field.key}
                      extra={
                        <CloseOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      }
                    >
                      <Form.Item
                        label="公司名称"
                        name={[field.name, "companyName"]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item label="工作时间" name={[field.name, "time"]}>
                        <DatePicker.RangePicker />
                      </Form.Item>
                      <Form.Item
                        label="工作内容"
                        name={[field.name, "summary"]}
                      >
                        <Input.TextArea rows={4} />
                      </Form.Item>
                    </Card>
                  ))}

                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    className="mt-5"
                  >
                    + 工作经历
                  </Button>
                </div>
              )}
            </Form.List>

            <Form.Item className="flex justify-center items-center mt-5">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="w-[500px]">
          {isPreview ? <ResumeShow wordBuffer={wordBuffer}></ResumeShow> : null}
        </div>
      </div>
    </div>
  );
};
export default Resume;
