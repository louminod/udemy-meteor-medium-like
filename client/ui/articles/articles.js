import { Articles } from '../../../both';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './articles.html';

Template.article_create_form.events({
    'submit .js-create-article'(event, instance) {
        event.preventDefault();

        const title = event.target.title.value;
        const content = event.target.content.value;

        let articleDoc = {
            title: title,
            content: content,
            createdAt: new Date(),
            ownerId: Meteor.userId()
        };

        console.log(articleDoc);

        Articles.insert(articleDoc);

        event.target.title.value = '';
        event.target.content.value = '';
    }
});

Template.article_list.helpers({
    articles() {
        return Articles.find().fetch();
    }
});

Template.article_page.helpers({
    article() {
        return Articles.findOne({ _id: FlowRouter.getParam('articleId') });
    }
});