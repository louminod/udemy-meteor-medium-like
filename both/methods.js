import { Articles, Comments } from './collections';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
    insertArticle(article) {
        let articleDoc = {
            title: article.title,
            content: article.content,
            createdAt: new Date(),
            ownerId: this.userId
        };

        return Articles.insert(articleDoc);
    },
    updateArticle(articleId, article) {
        Articles.update({ _id: articleId }, { $set: { title: article.title, content: article.content } });
    },
    removeArticle(articleId) {
        Articles.remove({ _id: articleId });
    },
    insertComment(comment) {
        let commentDoc = {
            content: comment.content,
            articleId: comment.articleId,
            createdAt: new Date(),
            ownerId: this.userId
        }

        Comments.insert(commentDoc);
    }
});