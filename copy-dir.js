const fs = require("fs-extra");

// Danh sách các thư mục cần sao chép
const listFolderCopy = [
  {
    sourceDirectory: "views",
    targetDirectory: "dist/views"
  },
  {
    sourceDirectory: "public",
    targetDirectory: "dist/public"
  }
];

// Thực hiện sao chép từng thư mục trong danh sách
listFolderCopy.forEach(item => {
  fs.copy(item.sourceDirectory, item.targetDirectory, (err) => {
    if (err) {
      console.error(`❌ Lỗi sao chép thư mục ${item.sourceDirectory}:`, err);
    } else {
      console.log(`✅ Sao chép thành công thư mục ${item.sourceDirectory} -> ${item.targetDirectory}`);
    }
  });
});
