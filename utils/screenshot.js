export default async function screenshot({ test, page, filename }) {
  // await new Promise(r => setTimeout(r, 100));
  // await test.info().attach(filename, {
  //     body: await page.screenshot({
  //         fullPage: true,
  //     }),
  //     contentType: "image/png",
  // });
  // --不明白调用scrrenshotNoTime为什么会执行，先注释掉
  // const now = Date.now();
  // console.log(filename);
  // await page.screenshot({
  //   path: `output/${filename
  //     .replaceAll("/", "|")
  //     .substring(0, 200)}-${now}.png`,
  //   fullPage: false,
  // });
  // await page.screenshot({
  //   path: `output/${filename
  //     .replaceAll("/", "|")
  //     .substring(0, 200)}-${now}-fullscreen.png`,
  //   fullPage: true,
  // });
}
