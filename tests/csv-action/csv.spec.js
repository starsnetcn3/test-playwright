import { test, expect } from "@playwright/test";
const fs = require("fs");

const csvFilePath = "./output/a_output.csv";
const csvHeader = "";

test.describe("csv action", () => {
  test("reset output.csv", () => {
    fs.writeFile(csvFilePath, csvHeader, (err) => {
      if (err) {
        console.error("写入文件时出错:", err);
      }
    });
  });
});
