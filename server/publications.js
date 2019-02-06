import { Articles, Comments } from '../both';
import { check } from 'meteor/check';

Meteor.publish('articles.list', function (skip, limit) {
    check(skip, Number);
    check(limit, Number);

    let articleCursor = Articles.find({}, { fields: { content: 0 }, sort: { createdAt: -1 }, skip: skip, limit: limit });

    // Récupération des id des auteurs des articles
    let arrayArticle = articleCursor.fetch();

    let arrayOwnerId = arrayArticle.map(article => article.ownerId); // ["id1", "id2", "id1"]
    let arrayUniqueOwnerId = Array.from(new Set(arrayOwnerId)); // ["id1", "id2"]

    // Permet de publier le 'count' d'articles
    Counts.publish(this, 'articlesCount', Articles.find({}));

    return [
        articleCursor,
        Meteor.users.find({ _id: arrayUniqueOwnerId }, { fields: { profile: 1 } })
    ];
});

Meteor.publish('article.single', function (articleId) {
    check(articleId, String);

    // Récupération des Cursors
    let articleCursor = Articles.find({ _id: articleId });
    let commentCursor = Comments.find({ articleId: articleId });

    // Récupération des id des auteurs des commentaires
    let arrayComment = commentCursor.fetch();
    let arrayOwnerId = arrayComment.map(comment => comment.ownerId);

    // On ajoute l'auteur de l'article
    let article = articleCursor.fetch().find(article => article._id === articleId);
    arrayOwnerId.push(article.ownerId);

    let arrayUniqueOwnerId = Array.from(new Set(arrayOwnerId));

    return [
        articleCursor,
        commentCursor,
        Meteor.users.find({ _id: { $in: arrayUniqueOwnerId } }, { fields: { profile: 1 } })
    ];
});