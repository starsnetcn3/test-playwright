export default async function screenshot({
  test,
  page,
  filename,
  viewPage = false,
}) {
  // await new Promise(r => setTimeout(r, 100));

  // await test.info().attach(filename, {
  //     body: await page.screenshot({
  //         fullPage: true,
  //     }),
  //     contentType: "image/png",
  // });

  // 打印视口
  if (viewPage) {
    await page.screenshot({
      path: `output/${filename}.png`,
      fullPage: false,
    });
    return;
  }

  await page.screenshot({
    path: `output/${filename}.png`,
    fullPage: true,
  });
}
