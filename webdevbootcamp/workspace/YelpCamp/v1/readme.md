#Refactor Mongoose Code
* Create a models directory
* Use Module.exports
* Require everything correctly

#Comment New/Create
*Discuss nested routes
*Add teh comment new and create routes
*Add the new comment form


Restful Routes

name        url         verb        desc
=================================
INDEX       /dogs       GET         Display a list of all dogs
NEW         /dogs/new   GET         Displays a form to make a new dog
CREATE      /dogs       POST        Add a new dog to DB
SHOW        /dogs/:id   GET         Shows info about one dog

INDEX       /campgrounds        GET
NEW         /campgrounds/new    
Create      /campgrounds
SHOW        /campgrounds:id

NEW         campgrounds/:id/comments/new       GET
CREATE      campgrounds/:id/comments           POST