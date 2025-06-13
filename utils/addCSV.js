const fs = require("fs");
export default function csvAdd(data) {
  data[0] = '"' + data[0] + '"';
  // 将数据转换为 CSV 格式
  const csvContent = data.join(",") + "\n"; // 将数组转换为以逗号分隔的字符串
  // 写入 CSV 文件
  fs.appendFile("./output/a_output.csv", csvContent, (err) => {
    if (err) {
      console.error("写入文件时出错:", err);
    }
  });
}
