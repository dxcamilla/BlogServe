const Content = require('../../models/Content')
const Tag = require('../../models/Tag')
const status = require('../../tools/statusCode')
const format = require('../../tools/dateFormat')
module.exports = async (req, res, next) => {
  try {
    let { contType, contTitle, contSummary, contBody, tags = [], stick, creator, pulishStatus } = req.query,
      dateTime = (new Date()).Format('yyyy-MM-dd hh:mm:ss');
    if (tags.length !== 0) {
      for (let item of tags) {
        console.log(item)
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
    let pubTime = '';
    if (Number(pulishStatus) === 1) {
      pubTime = dateTime
    }
    var content = new Content({
      categoryId: contType,
      title: contTitle,
      summary: contSummary,
      content: contBody,
      creator: creator,
      updater: creator,
      createTime: dateTime,
      updateTime: dateTime,
      publishTime: pubTime,
      tags: tags,
      stick: stick,
      status: pulishStatus
    })
    const add = await content.save();
    console.log(add);
    resData = {
      resCode: status.success,
      resMsg: "添加成功"
    }
  } catch (err) {
    next(err);
  }
  return res.json(resData);
}