const Content = require('../../models/Content')
const Tag = require('../../models/Tag')
const status = require('../../tools/statusCode')
Date.prototype.Format = function (fmt) { //author: meizz
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt
}
module.exports = async (req, res, next) => {
  try {
    let { contType, contTitle, contSummary, contBody, tags, stick } = req.query,
      dateTime = (new Date()).Format('yyyy-MM-dd hh:mm:ss');
    for (let item of tags.values()) {
      console.log(item)
      const hasTag = await Tag.findOne({
        tag: { '$regex': item, '$options': 'i' }
      })
      if (hasTag.toLowerCase() !== item.toLowerCase()) {
        var tag = new Tag({
          tag: item
        })
        tag.save()
      }
    }
    var content = new Content({
      categoryId: contType,
      title: contTitle,
      summary: contSummary,
      content: contBody,
      createTime: dateTime,
      stick: stick
    })
    resData = {
      resCode: status.success,
      resMsg: "添加成功"
    }
    content.save();
    return res.json(resData)
  } catch (err) {
    next(err);
  }
  return res.json(resData);
}