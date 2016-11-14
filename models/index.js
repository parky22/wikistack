var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

function generateUrlTitle (title) {
  if (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    // Generates random 5 letter string
    return Math.random().toString(36).substring(2, 7);
  }
}

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {notEmpty: true}
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
},
{
    getterMethods   : {
    route       : function()  { return '/wiki/' + this.urlTitle }
    },

    setterMethods   : {
    route       : function(value) {
        //value = "/wiki/hi there fullstackers"
        var urlPieces = value.split('/wiki/');
        // urlPieces = ["", "hi there fullstackers"]
        this.setDataValue('urlTitle', generateUrlTitle(urlPieces[1]));
        }
    },
    hooks:{
          beforeValidate: function(page, options){
              //var title = page.getDataValue('title');
             //this.setDataValue('urlTitle', generateUrlTitle(title));
             console.log("inside beforeValidate: ", page.title);
             page.urlTitle = generateUrlTitle(page.title);
             console.log("page urltitle", page.urlTitle);
          },
          afterValidate: function(page, options){
             // console.log("inside aftervalidate");
          }
    }
});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        validate: {isEmail: true},
        allowNull: false
    }
});

module.exports = {
  Page: Page,
  User: User
};
