
/*
 * GET home page.
 */

var brand = 'HINOC Lab';
var Report = require('../model/report.js');

exports.index = function(req, res){
  res.redirect('/home');
}

exports.home = function(req, res){
  res.render('home', { title: 'Home', id: 'home', brand: brand })
};

exports.about = function(req, res){
  res.render('about', { title: 'About', id: 'about', brand: brand })
};

exports.report = function(req, res){
  Report.get("",function(err, reports) {
        if (err) {
          //req.flash('error', err);
          return res.redirect('/');
        }
        console.log(reports);
        res.render('report', { title: 'Report', id: 'report', brand: brand, allreport: reports})
      })

};

exports.getsubmit = function(req, res){
  res.render('submit', { title: 'Submit', id: 'submit', brand: brand })
};

exports.postsubmit = function(req, res){
  console.log(req.body);
  // 处理Post请求，将信息加入数据库
  var report = new Report(req.body.name, req.body.grade, req.body.time, {
      task :  req.body.task,
      complete : req.body.complete,
      issue : req.body.issue,
      progress :   req.body.progress,
      plan :  req.body.plan,
	    submittime: new Date()
  });
  report.save(function(err) {
    if (err) {
      console.log("error");
      return res.redirect('/');
    }
    console.log("success");
    res.redirect('report');
  });
};

