
/*
 * GET home page.
 */
var crypto = require('crypto');
var fs = require('fs');

var brand = 'HINOC Lab';
var Report = require('../model/report.js');
var User = require('../model/user.js');

var settings = require('../settings');
var markdown = require( "markdown" ).markdown;
var md = require("node-markdown").Markdown;

exports.index = function(req, res){
  res.redirect('/home');
}

exports.home = function(req, res){
  if (req.session.user) {
    Report.get(req.session.user.name, function(err, reports) {
      if (err) {
        //req.flash('error', err);
        return res.redirect('/');
      }
      //console.log(reports);
      res.render('home', { title: 'Home', id: 'home', brand: brand, timelist: settings.timelist, currettime: settings.currenttime, allreport: reports, user: req.session.user})
    })
  } else {
    res.render('home', { title: 'Home', id: 'home', brand: brand, user: req.session.user})
  }
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
        //console.log(reports);
        res.render('report', { title: 'Report', id: 'report', brand: brand, allreport: reports, user: req.session.user})
      })

};

exports.getsubmit = function(req, res){
  res.render('submit', { title: 'Submit', id: 'submit', brand: brand, user: req.session.user })
};

exports.postsubmit = function(req, res){
  //console.log(req.body);
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
      console.log("save error");
      return res.redirect('/');
    }
    //console.log("success");
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

  exports.getdoc = function(req, res) {
    var path = [
        'doc/',
        req.params.author,
        '/',
        req.params.title,
        '.md'  
    ].join('');
    //mdcontent = markdown.toHTML(fs.readFileSync(path, 'utf8'));
    //console.log(req.params);
    mdcontent = md(fs.readFileSync(path, 'utf8'));
    res.render('doc', { docauthor:req.params.author, doctitle:req.params.title, content: mdcontent, title: 'Doc', id: 'doc', brand: brand, user: req.session.user })
  };

    exports.getdocindex = function(req, res) {
    mdcontent = md(fs.readFileSync('doc/index.md', 'utf8'));
    res.render('doc', { docauthor:'', doctitle: '文档目录', content: mdcontent, title: 'Doc', id: 'doc', brand: brand, user: req.session.user })
  };