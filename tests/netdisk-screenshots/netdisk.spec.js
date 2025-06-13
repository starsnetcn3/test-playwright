const { test, expect } = require("@playwright/test");
import goToPage from "../../utils/goToPage";
import checkApi from "../../utils/checkApi";
import screenshotNoTime from "../../utils/screenshotNoTime";
import addCSV from "../../utils/addCSV";

let page;
test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async ({ browser }) => {
  await page.close();
});

test.describe.serial("netdisk screenshots", () => {
  test("netdisk photo", async () => {
    // 登陆界面
    await page.goto("login");
    await new Promise((r) => setTimeout(r, 2000));
    // await screenshotNoTime({
    //   test,
    //   page,
    //   filename: `a_1`,
    // });
    // addCSV([
    //   "Authentication",
    //   "Oauth2 mechanism with Email and Password as authentication methods for Login. Accounts can only be created by Admin.",
    //   "a_1",
    //   page.url(),
    // ]);

    await page.locator("input.input").nth(0).fill("admin");
    await page.locator("input.input").nth(1).fill("admin");
    await page.locator("input.button").first().click();
    await new Promise((r) => setTimeout(r, 4000));
    await screenshotNoTime({
      test,
      page,
      filename: `O01`,
    });
    addCSV([
      "Document and file management functions - Create and modify and delete documents and files",
      "O01",
      page.url(),
    ]);

    await screenshotNoTime({
      test,
      page,
      filename: `O02`,
    });
    addCSV([
      "Document and file management functions - Create and modify and delete documents and file categories",
      "O02",
      page.url(),
    ]);

    await screenshotNoTime({
      test,
      page,
      filename: `O07`,
    });
    addCSV([
      "Document and file management functions - Document and Archive Editing History",
      "O07",
      page.url(),
    ]);

    // Wait for Redirect
    await new Promise((r) => setTimeout(r, 4000));
    //   await page.context().storageState({ path: authFile });
    // await page.goto("https://tech.nas.starsnet.com.hk/files")
    // 语言设置
    await page.getByLabel("Settings").click();
    await new Promise((r) => setTimeout(r, 2000));
    // await screenshotNoTime({
    //   test,
    //   page,
    //   filename: `b_1`,
    // });
    // addCSV([
    //   "Profile Settings Management",
    //   "Language settings and Password settings. Allow selection of language preference including English/Traditional Chinese and Simplified Chinese.",
    //   "b_1",
    //   page.url(),
    // ]);
    // // 更改密码
    // await screenshotNoTime({
    //   test,
    //   page,
    //   filename: `b_2`,
    // });
    // addCSV([
    //   "Profile Settings Management",
    //   "Language settings and Password settings. Allow selection of language preference including English/Traditional Chinese and Simplified Chinese.",
    //   "b_2",
    //   page.url(),
    // ]);
    // 全局设置管理
    await page.locator('text="Global Settings"').click();
    await new Promise((r) => setTimeout(r, 2000));
    await screenshotNoTime({
      test,
      page,
      filename: `O08`,
      viewPage: true,
    });
    addCSV([
      "Document and file management functions - File and file rights management",
      "O08",
      page.url(),
    ]);
    // await screenshotNoTime({
    //   test,
    //   page,
    //   filename: `c_2`,
    //   viewPage: true,
    // });
    // addCSV([
    //   "Global Settings Management",
    //   " Define mount directory/scope/and language.",
    //   "c_2",
    //   page.url(),
    // ]);
    // await page.locator("select.input.input--block").first().click();
    // await screenshotNoTime({
    //   test,
    //   page,
    //   filename: `c_3`,
    //   viewPage: true,
    // });
    // addCSV([
    //   "Global Settings Management",
    //   "Define default permission settings for new users. Allow change of light and dark theme.",
    //   "c_3",
    //   page.url(),
    // ]);

    // 用户设置管理
    await page.locator('text="User Management"').click();
    await new Promise((r) => setTimeout(r, 2000));
    //  await page.getByRole("button", { name: "new" }).click()
    // await screenshotNoTime({
    //   test,
    //   page,
    //   filename: `d_1`,
    //   viewPage: true,
    // });
    // addCSV([
    //   "User Settings Management",
    //   "Overview of users/add new user/edit existing user’s permission and scope of access.",
    //   "d_1",
    //   page.url(),
    // ]);
    await page.locator('text="mode_edit"').first().click();

    await page.getByRole("button", { name: "Delete" }).click()
    // await screenshotNoTime({
    //   test,
    //   page,
    //   filename: `d_2`,
    //   viewPage: true,
    // });
    // addCSV([
    //   "User Settings Management",
    //   "Allow remove of existing user.",
    //   "d_2",
    //   page.url(),
    // ]);

    await page.getByRole("button", { name: "cancel" }).nth(1).click()
    // 共享设置管理
    await page.locator('text="Share Management"').click();
    await new Promise((r) => setTimeout(r, 2000));
    // await screenshotNoTime({
    //   test,
    //   page,
    //   filename: `e_1`,
    //   viewPage: true,
    // });
    // addCSV([
    //   "Share Settings Management",
    //   "Overview of all file paths being shared and the associated user.",
    //   "e_1",
    //   page.url(),
    // ]);
    // 删除分享连接
    // await page.locator('text="delete"').first().click();
    // await new Promise((r) => setTimeout(r, 3000));
    // await screenshotNoTime({
    //   test,
    //   page,
    //   filename: `e_3`,
    //   viewPage: true,
    // });
    // addCSV([
    //   "Share Settings Management",
    //   "Allow deletion of share link.",
    //   "e_3",
    //   page.url(),
    // ]);
    await page.goto("settings/shares")
    const link = await page.locator('a[href]').nth(5)
    // 获取 href 属性的值
    const hrefValue = await link.getAttribute('href');
    await page.goto(hrefValue)
    await expect(page.locator('text="call_to_action"').first()).toBeVisible();
    // await screenshotNoTime({
    //   test,
    //   page,
    //   filename: `e_4`,
    //   viewPage: true,
    // });
    // addCSV([
    //   "Share Settings Management",
    //   "Share link for guests to download selected files or folders. Generation of QR code for download link and scan.",
    //   "e_4",
    //   page.url(),
    // ]);
    // 分享链接
    await page.goto("files");
    await new Promise((r) => setTimeout(r, 2000));
    await page.getByLabel("testFile").click();
    await page.locator('text="share"').click();
    await page.locator("button.button.button--flat.button--blue").click()
    await new Promise((r) => setTimeout(r, 2000));
    await screenshotNoTime({
      test,
      page,
      filename: `O04`,
    });
    addCSV([
      "Document and file management functions - File and file encrypted sharing",
      "O04",
      page.url(),
    ]);
    // // 创建文件
    // await page.goto("files");
    // await page.getByLabel("New folder").click();
    // await new Promise((r) => setTimeout(r, 2000));
    // await screenshotNoTime({
    //   test,
    //   page,
    //   filename: `f_2`,
    // });
    // addCSV([
    //   "File Management",
    //   "Allow creation of folder and files. Allow multiple selection to perform actions.",
    //   "f_2",
    //   page.url(),
    // ]);
    // await page.getByRole("button", { name: "cancel" }).nth(0).click()
    // await page.locator('text="file_upload"').click();
    // await new Promise((r) => setTimeout(r, 2000));
    // await screenshotNoTime({
    //   test,
    //   page,
    //   filename: `f_3`,
    // });
    // addCSV([
    //   "File Management",
    //   "Allow Drag and Drop to Upload files from local devices/including PC and mobile. Allow Upload of files and folders at once.",
    //   "f_3",
    //   page.url(),
    // ]);
    // await page.goto("files");
    // await page.getByLabel("testFile").click();
    // await page.locator('text="forward"').click();
    // await new Promise((r) => setTimeout(r, 2000));
    // await screenshotNoTime({
    //   test,
    //   page,
    //   filename: `f_4`,
    // });
    // addCSV([
    //   "File Management",
    //   "Move and Copy folders and file from one location to another. Allow Deletion folders and files.",
    //   "f_4",
    //   page.url(),
    // ]);
    // await page.getByLabel("Cancel").click();
    // await page.locator('text="file_download"').click();
    // await new Promise((r) => setTimeout(r, 2000));
    // await screenshotNoTime({
    //   test,
    //   page,
    //   filename: `f_5`,
    // });
    // addCSV([
    //   "File Management",
    //   "Download of files and folders as .zip/.tar or .tar.gz.",
    //   "f_5",
    //   page.url(),
    // ]);
    // 预览
    await page.goto("files");
    await page.getByLabel("test.txt").dblclick();
    await new Promise((r) => setTimeout(r, 2000));
    await screenshotNoTime({
      test,
      page,
      filename: `O05`,
    });
    addCSV([
      "Document and file management functions - Document and file preview",
      "O05",
      page.url(),
    ]);


    // 代码编辑
    await page.goto("files");
    await page.getByLabel("test.html").dblclick();
    await new Promise((r) => setTimeout(r, 2000));
    await screenshotNoTime({
      test,
      page,
      filename: `O06`,
    });
    addCSV([
      "Document and file management functions - Collective editing of documents and archives",
      "O06",
      page.url(),
    ]);

    // await screenshotNoTime({
    //   test,
    //   page,
    //   filename: ``,
    // });
    // addCSV([
    //   "File EditorFile Editor",
    //   "Text and code editor support.",
    //   "h_1",
    //   page.url(),
    // ]);
    await page.locator('text="save"').click();
    await new Promise((r) => setTimeout(r, 1000));
    // await screenshotNoTime({
    //   test,
    //   page,
    //   filename: `h_2`,
    // });
    // addCSV([
    //   "File EditorFile Editor",
    //   "Allow saving files on the drive after editing.",
    //   "h_2",
    //   page.url(),
    // ]);
    // 登出
    await page.goto("files");
    await page.getByLabel("Search...").click();
    // await page.getByLabel("Logout").click();
    await new Promise((r) => setTimeout(r, 2000));
    await screenshotNoTime({
      test,
      page,
      filename: `O03`,
    });
    addCSV([
      "Document and file management functions - Search and record existing documents and files",
      "O03",
      page.url(),
    ]);

  });
});
