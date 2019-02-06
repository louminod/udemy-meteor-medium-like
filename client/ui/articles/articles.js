import { Articles } from '../../../both';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './articles.html';

const NB_ARTICLE_IN_PAGE = 5;

Template.article_create_form.events({
    'submit .js-create-article'(event, instance) {
        event.preventDefault();

        const title = event.target.title.value;
        const content = event.target.content.value;

        Meteor.call('insertArticle', { title: title, content: content }, function (err, res) {
            if (!err) {
                event.target.title.value = '';
                event.target.content.value = '';

                FlowRouter.go('/article/:articleId', { articleId: res })
            }
        });
    }
});

Template.article_list.onCreated(function () {
    this.autorun(() => {
        // Le + convertit en nombre
    let currentPage = +FlowRouter.getParam('page') || 1;
    let skip = (currentPage - 1) * NB_ARTICLE_IN_PAGE;

    this.subscribe('articles.list', skip, NB_ARTICLE_IN_PAGE);
    });
});

Template.article_list.helpers({
    articles() {
        return Articles.find({}, { sort: { createdAt: -1 } }).fetch();
    },
    pages() {
        let articlesCount = Counts.get('articlesCount');
        let pagesCount = Math.ceil(articlesCount / NB_ARTICLE_IN_PAGE);

        // Le + convertit en nombre
        let currentPage = +FlowRouter.getParam('page') || 1;

        let pages = [];
        for (let i = 1; i < pagesCount; i++) {
            pages.push({ index: i, active: i === currentPage });
        }

        return pages;
    }
});

Template.article_page.onCreated(function () {
    this.subscribe('article.single', FlowRouter.getParam('articleId'));
});

Template.article_page.helpers({
    article() {
        return Articles.findOne({ _id: FlowRouter.getParam('articleId') });
    }
});

Template.article_edit_form.helpers({
    article() {
        return Articles.findOne({ _id: FlowRouter.getParam('articleId') });
    }
});

Template.article_edit_form.events({
    'submit .js-edit-article'(event, instance) {
        event.preventDefault();

        const title = event.target.title.value;
        const content = event.target.content.value;

        Meteor.call('updateArticle', { id: FlowRouter.getParam('articleId'), title: title, content: content }, function (err, res) {
            if (!err) FlowRouter.go('/article/:articleId', { articleId: FlowRouter.getParam('articleId') });
        });
    },
    'click .js-delete-article'(event, instance) {
        Meteor.call('removeArticle', FlowRouter.getParam('articleId'), function (err, res) {
            if (!err) FlowRouter.go('/');
        });
    }
});