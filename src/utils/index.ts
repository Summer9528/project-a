import mammoth from "mammoth";

export const convertFileToHTML = (event: Event): Promise<string> => {
  const file = (event.target as HTMLInputElement).files![0];
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  return new Promise((resolve, reject) => {
    reader.onload = function (e) {
      const res = mammoth
        .convertToHtml({
          arrayBuffer: e.target!.result as ArrayBuffer,
        })
        .then(displayHtmlStr);
      resolve(res);
    };
    reader.onerror = function (e) {
      reject(e.target!.error);
    };
  });
};
const displayHtmlStr = (result: any) => {
  const html = result.value
    .replace(//g, "")
    .replace("<h1>", '<h1 style="text-align: center;">')
    .replace(/<table>/g, '<table style="border-collapse: collapse;">')
    .replace(/<tr>/g, '<tr style="height: 30px;">')
    .replace(/<td>/g, '<td style="border: 1px solid pink;">')
    .replace(/<p>/g, '<p style="text-indent: 2em;">');
  return html;
};
