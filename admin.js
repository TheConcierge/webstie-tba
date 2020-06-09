const mongoose = require('mongoose');
const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')

require('dotenv').config();

require('./models/post.model');
const Post = mongoose.model('Post');

AdminBro.registerAdapter(AdminBroMongoose);

const ADMIN = {
    email: process.env.ADMINBRO_USER,
    password: process.env.ADMINBRO_PASS
}

const adminBro = new AdminBro({
    branding: {
        companyName: 'ryan BLOG'
    },
    resources: [
        {
            resource: Post,
            options: {}
        }
    ],
    rootPath: '/admin'
});

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    cookieName: process.env.ADMIN_COOKIE_NAME || 'not-default-username',
    cookiePassword: process.env.ADMIN_COOKIE_PAsS || 'not-default-password',
    authenticate: async(email, password) => {
        if (email == ADMIN.email && password == ADMIN.password) return ADMIN;
        return null;
    }
});

module.exports = router;
