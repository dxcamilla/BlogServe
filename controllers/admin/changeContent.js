const Content = require('../../models/Content')
const Tag = require('../../models/Tag')
const status = require('../../tools/statusCode')
module.exports = async (req, res, next) => {
  try {
    let { contId, contType, contTitle, contSummary, contBody, tags = [], stick } = req.query;
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