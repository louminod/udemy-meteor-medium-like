import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';

export const Articles = new Mongo.Collection('articles');
export const Comments = new Mongo.Collection('comments');

export const articleUpsertSchema = new SimpleSchema({
    title: {
        type: String,
        max: 10
    },
    content: {
        type: String,
        max: 1500
    },
    id: {
        type: String,
        optional: true
    }
}, { check });

export const commentInsertSchema = new SimpleSchema({
    content: {
        type: String,
        min: 3,
        max: 500
    },
    articleId: {
        type: String
    }
}, { check });