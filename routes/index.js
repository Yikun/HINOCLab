
/*
 * GET home page.
 */
var crypto = require('crypto');


var brand = 'HINOC Lab';
var Report = require('../model/report.js');
var User = require('../model/user.js');

exports.index = function(req, res){
  res.redirect('/home');
}

exports.home = function(req, res){
  res.render('home', { title: 'Home', id: 'home', brand: brand , user: req.session.user})
};

exports.about = function(req, res){
  res.render('about', { title: 'About', id: 'about', brand: brand, user: req.session.user })
};

exports.report = function(req, res){
  Report.get("",function(err, reports) {
        if (err) {
          //req.flash('error', err);
          return res.redirect('/');
        }
        console.log(reports);
        res.render('report', { title: 'Report', id: 'report', brand: brand, allreport: reports, user: req.session.user})
      })

};

exports.getsubmit = function(req, res){
  res.render('submit', { title: 'Submit', id: 'submit', brand: brand, user: req.session.user })
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

  //app.get('/login', checkNotLogin);
  exports.getlogin = function(req, res) {
    res.redirect('/');
  };
  
  //app.post('/login', checkNotLogin);
  exports.postlogin = function(req, res) {
    //生成口令的散列值
    //var md5 = crypto.createHash('md5');
    //var password = md5.update(req.body.password).digest('base64');
    var password = req.body.password;
    User.get(req.body.name, req.body.grade, function(err, user) {
      if (!user) {
        //req.flash('error', '用戶不存在');
        console.log("用户不存在");
        return res.redirect('/xxx');
      }
      if (user.password != password) {
        //req.flash('error', '用戶口令錯誤');
        console.log("用户密码错误"+ user.password + "but nide:"+ password);
        return res.redirect('/xxx');
      }
      req.session.user = user;
      console.log(req.session);
      console.log("登陆成功");
      res.redirect('/');
    });
  };

  exports.logout = function(req, res) {
    req.session.user = null;
    //req.flash('success', '登出成功');
    res.redirect('/');
  };

  exports.modify = function(req, res) {
    var newUser = new User({
      name: req.body.name,
      grade: req.body.grade,
      password: req.body.password,
    });
    
    newUser.save(function(err) {
    req.session.user = newUser;
    res.redirect('/');
    });
  };