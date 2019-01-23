const Content = require('../../models/Content')
const Tag = require('../../models/Tag')
const status = require('../../tools/statusCode')
const format = require('../../tools/dateFormat')
module.exports = async (req, res, next) => {
  try {
    let { contId, contType, contTitle, contSummary, contBody, tags = [], stick, updater } = req.query;
    let updateTime = (new Date()).Format('yyyy-MM-dd hh:mm:ss');
    console.log(contId, contType, contTitle, contSummary, contBody, tags, stick)
    if (tags.length !== 0) {
      for (let item of tags) {
        const hasTag = await Tag.findOne({
          tag: { '$regex': item, '$options': 'i' }
        })
        if (!hasTag || hasTag.tag.toLowerCase() !== item.toLowerCase()) {
          var tag = new Tag({
            tag: item
          })
          tag.save()
        }
      }
    }
    const data = await Content.update({
      _id: contId
    }, {
        categoryId: contType,
        title: contTitle,
        summary: contSummary,
        content: contBody,
        updater: updater,
        updateTime: updateTime,
        tags: tags,
        stick: stick
      });
    resData = {
      resCode: status.success,
      resMsg: "修改成功"
    }
  } catch (err) {
    next(err);
  }
  return res.json(resData);
}