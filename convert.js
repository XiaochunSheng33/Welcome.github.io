const xlsx = require('xlsx');
const fs = require('fs');

// 读取Excel文件
const workbook = xlsx.readFile('SDG_11-2-1.xlsx');
const sheet_name_list = workbook.SheetNames;
const worksheet = workbook.Sheets[sheet_name_list[0]]; // 选择第一个表单

// 将Excel数据转换为JSON
const jsonData = xlsx.utils.sheet_to_json(worksheet);

// 创建数据
let data = [];

// 将数据格式化为所需结构
jsonData.forEach(row => {
  const latitude = row['latitude'];
  const longitude = row['longitude'];
  const magnitude = row['magni2ude1'];

  if (latitude && longitude && magnitude) {
    data.push(latitude, longitude, magnitude);
  }
});

// 包装成目标格式
const formattedData = [
  [
    "1990",data
  ]
];

// 将JSON数据写入文件（在一行上）
fs.writeFileSync('data.json', JSON.stringify(formattedData));

// 提示成功
console.log('JSON文件已生成');