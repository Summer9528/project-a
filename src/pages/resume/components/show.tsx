import React, { useRef } from "react";
import { renderAsync } from "docx-preview";
import { useAsyncEffect } from "ahooks";
const ResumeShow: React.FC<{ wordBuffer?: ArrayBuffer }> = ({ wordBuffer }) => {
  const viewRef = useRef<HTMLDivElement>(null);
  useAsyncEffect(async () => {
    if (!(wordBuffer && viewRef.current)) return;
    console.log("ResumeShow-effect");
    try {
      await renderAsync(wordBuffer, viewRef.current);
    } catch (error) {
      console.error(error);
    }
  }, [wordBuffer]);

  return (
    <div className=" bg-[#def1ef] border-[1px] border-solid border-black  fixed right-0 top-0  overflow-auto">
      <div ref={viewRef} className="h-[700px]"></div>
    </div>
  );
};
export default ResumeShow;
