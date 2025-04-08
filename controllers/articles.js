const Article = require("../models/article");
const NotFoundError = require("../utils/errors/NotFoundError");
const BadRequestError = require("../utils/errors/BadRequestError");
const ForbiddenError = require("../utils/errors/ForbiddenError");

const getArticles = (req, res, next) => {
  const currentUser = req.user._id;
  Article.find({ owner: currentUser })
    .then((article) => res.status(200).send({ data: article }))
    .catch((err) => {
      next(err);
    });
};

const createArticle = (req, res, next) => {
  const { keyword, title, description, publishedAt, source, url, urlToImage } =
    req.body;
  const owner = req.user._id;
  Article.create({
    keyword,
    title,
    description,
    publishedAt,
    source,
    url,
    urlToImage,
    owner,
  })
    .then((article) => res.status(201).send({ data: article }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  Article.findOne({ _id: articleId })
    .orFail()
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        return next(
          new ForbiddenError("Invalid permissions to delete article")
        );
      }
      return Article.deleteOne({ _id: articleId })
        .orFail()
        .then(() => res.status(200).send({ data: article }))
        .catch((err) => next(err));
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Requested resource not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid data"));
      }
      return next(err);
    });
};

module.exports = { getArticles, createArticle, deleteArticle };
