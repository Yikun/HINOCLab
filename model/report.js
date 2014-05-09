var mongodb = require('./db');

function Report(name, grade, time, Report) {
  this.name = name;
  this.grade = grade;
  this.time = time;
  this.report = Report;
};
module.exports = Report;

Report.prototype.save = function save(callback) {
  // 存入 Mongodb 的report
  var report = this.report;
  var name =this.name;
  var grade=this.grade;
  var time= this.time;
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    // 读取report
    db.collection('report', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      // 若存在则更新，若不存在则增加
      collection.update({"name": name, "grade":grade, "time": time}, {$set: {"report" : report}}, {upsert:true}, function(err, report) {
        mongodb.close();
        callback(err, report);
      });
    });
  });
};

Report.get = function get(name, callback) {
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    // 讀取 posts 集合
    db.collection('report', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      // 查找 user 屬性爲 username 的文檔，如果 username 是 null 則匹配全部
      var query = {};
      if (name) {
        query.name = name;
      }
      collection.find(query).sort({time: -1}).toArray(function(err, docs) {
        mongodb.close();
        if (err) {
          callback(err, null);
        }
        // 封裝 posts 爲 Post 對象
        var reports = [];
        docs.forEach(function(doc, index) {
          var report = new Report(doc.name, doc.grade, doc.time, doc.report);
          reports.push(report);
        });
        //console.log(reports);
        callback(null, reports);
      });
    });
  });
};