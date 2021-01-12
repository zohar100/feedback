const mongoose = require("mongoose");
const Post = require("./models/post.model");

//Data for seeding the database
data = {
    posts: [
        {
            author: "5fe369f101344944bca578b4",
            body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
            comments: []
        },
        {
            author: "5fe369f101344944bca578b4",
            body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
            comments: []
        },
        {
            author: "5fe369f101344944bca578b4",
            body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
            comments: []
        },
        {
            author: "5fe36a1301344944bca578b5",
            body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
            comments: []
        },
        {
            author: "5fe36a1301344944bca578b5",
            body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
            comments: []
        },
        {
            author: "5fe36a1301344944bca578b5",
            body: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
            comments: []
        },
        {
            author: "5fe36a1301344944bca578b5",
            body: "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas",
            comments: []
        },
        {
            author: "5fe369df01344944bca578b3",
            body: "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae",
            comments: []
        },
        {
            author: "5fe369df01344944bca578b3",
            body: "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas",
            comments: []
        },
        {
            author: "5fe369df01344944bca578b3",
            body: "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error",
            comments: []
        },
        {
            author: "5fe369df01344944bca578b3",
            body: "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi",
            comments: []
        },
        {
            author: "5fe369df01344944bca578b3",
            body: "itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio",
            comments: []
        }
    ],
};

//function for seeding the database with the data
function seedDB() {
  //first remove all data from database
  Post.deleteMany()
        .then(() => {console.log('POSTS REMOVED SUCCESSFULLY')})
        .catch(err => {console.log(err)});
  //adding posts
  data.posts.map((post, index) => {
    Post.create(post, (err) => {
      if (err) {
        console.log(err);
      }
      else if (index === data.posts.length - 1) {
        console.log('ADD POSTS')
      }
    });
  });
}

module.exports = seedDB;