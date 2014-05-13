var xlsx = require('node-xlsx');
var fs = require('fs');
// write
var obj = {"worksheets":[{"data":[["中文","英文","c"]]}]};
var file = xlsx.build(obj);

var buffer = xlsx.build({worksheets: [
  {"name":"第一周", "data":[
    ["A1", "B1"],
    [
      {"value":"中文","formatCode":"General"},
      {"value":"B2","formatCode":"General"}
    ]
  ]},
  {"name":"第二周", "data":[
    ["A1", "B1"],
    [
      {"value":"A2","formatCode":"General"},
      {"value":"B2","formatCode":"General"}
    ]
  ]}
]});

fs.writeFileSync('b.xlsx', buffer, 'binary');
