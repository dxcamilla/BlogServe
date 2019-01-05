var nodemailer = require("nodemailer");
var config = {
	host: "smtp.163.com",
	secureConnection: true,
	port: 465,
	auth:{
		user: 'dx_hlove@163.com',
		pass: 'love1314'
	}
}
var transporter = nodemailer.createTransport(config);
module.exports = function(mail){
	return transporter.sendMail(mail,function(err,info){
		if(err){
			return console.log(err);
		}
		console.log("mail sent: ",info.response);
	})
}