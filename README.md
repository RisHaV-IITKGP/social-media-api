# social-media-api

![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)
[![Maintenance](https://img.shields.io/badge/Maintained-yes-green.svg)](https://github.com/RisHaV-IITKGP/social-media-api)
[![Maintenance](https://img.shields.io/badge/Maintained-yes-green.svg)](https://social-media-api-8vix.onrender.com)

## Link to hosted app : [social-media-api](https://github.com/RisHaV-IITKGP/social-media-api)

## Dependencies

    express
    mongoose 
    dotenv 
    nodemon 
    helmet
    morgan 
    jwt

## List of API Endpoints

    POST /api/authenticate
        Input  : Email, password
        Output : JWT Token for the corresponding user

    GET /api/{userId}
        Output : returns user name, number of followers and followings

    PUT /api/follow/{userId}
        Input  : Current user's userId
        Output : Current user follows the given user

    PUT /api/unfollow/{userId}
        Input  : Current user's userId
        Output : Current user unfollows the given user

    POST /api/posts
        Input  : userId, Title, Description
        Output : postId, userId, title, description, creation time

    DELETE /api/posts/{postId}
        Input  : userId
        Output : mentioned post is deleted if creater is current user

    PUT /api/posts/like/{postId}
        Input  : userId
        Output : mentioned post is liked

    PUT /api/posts/dislike/{postId}
        Input  : userId
        Output : mentioned post is disliked

    PUT /api/posts/comment/{postId}
        Input  : commentBody
        Output : A comment with given body is added to the post
    
    PUT /api/posts/{postId}
        Output : returns corresponding post, with likes and comments

    PUT /api/posts/all_posts/all
        Output : returns all posts in the API


## Instructions to test the app locally :

* First clone the repository
  
      $ git clone
      $ cd social-media-api

* Install dependencies and run

      $ npm install
      $ npm run dev_start