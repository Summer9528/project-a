import { useRef, useState, useEffect } from "react";
import { convertFileToHTML } from "../../utils";
const ResumeMaker = () => {
  const InputElRef = useRef<HTMLInputElement>(null);
  const [htmlStr, setHtmlStr] = useState("");

  const handleFileChange = async (e: Event) => {
    const res = await convertFileToHTML(e);
    console.log("res", res);
    setHtmlStr(res);
  };

  useEffect(() => {
    InputElRef.current?.addEventListener("change", handleFileChange);
    return () => {
      InputElRef.current?.removeEventListener("change", handleFileChange);
    };
  }, [InputElRef]);

  return (
    <div className="container">
      <input ref={InputElRef} type="file" />
      <div className="row" style={{ width: "100%" }}>
        <div className="span8">
          <div id="output" dangerouslySetInnerHTML={{ __html: htmlStr }}></div>
        </div>
      </div>
    </div>
  );
};
export default ResumeMaker;
