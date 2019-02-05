import { Articles, Comments } from './collections';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
    insertArticle(article) {
        check(article, {
            title: String,
            content: String
        });

        let articleDoc = {
            title: article.title,
            content: article.content,
            createdAt: new Date(),
            ownerId: this.userId
        };

        return Articles.insert(articleDoc);
    },
    updateArticle(articleId, article) {
        check(articleId, String);
        check(article, {
            title: String,
            content: String
        });

        Articles.update({ _id: articleId }, { $set: { title: article.title, content: article.content } });
    },
    removeArticle(articleId) {
        check(articleId, String);

        Articles.remove({ _id: articleId });
    },
    insertComment(comment) {
        check(comment, {
            articleId: String,
            content: String
        })

        let commentDoc = {
            content: comment.content,
            articleId: comment.articleId,
            createdAt: new Date(),
            ownerId: this.userId
        }

        Comments.insert(commentDoc);
    }
});