
/*
 * GET home page.
 */

var brand = 'HINOC Lab';

exports.index = function(req, res){
  res.redirect('/home');
}

exports.home = function(req, res){
  res.render('home', { title: 'Home', id: 'home', brand: brand })
};

exports.about = function(req, res){
  res.render('about', { title: 'About', id: 'about', brand: brand })
};

exports.submit = function(req, res){
  // res.render('submit', { title: 'submit', id: 'submit', brand: brand })
  console.log(req.body);
  // 处理Post请求，将信息加入数据库
};