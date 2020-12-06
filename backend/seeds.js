const mongoose = require("mongoose");
const Post = require("./models/post.model");
const User = require("./models/user.model")

//Data for seeding the database
data = {
    posts: [
        {
            author: "5fc25d226163421bb062e3bb",
            title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
            author: "5fc25d546163421bb062e3bc",
            title: "qui est esse",
            body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
        },
        {
            author: "5fc25d226163421bb062e3bb",
            title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
            body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
        },
        {
            author: "5fc25d546163421bb062e3bc",
            title: "eum et est occaecati",
            body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
        },
        {
            author: "5fc25d226163421bb062e3bb",
            title: "nesciunt quas odio",
            body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
        },
        {
            author: "5fc25d546163421bb062e3bc",
            title: "dolorem eum magni eos aperiam quia",
            body: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"
        },
        {
            author: "5fc25d226163421bb062e3bb",
            title: "magnam facilis autem",
            body: "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas"
        },
        {
            author: "5fc25d546163421bb062e3bc",
            title: "dolorem dolore est ipsam",
            body: "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae"
        },
        {
            author: "5fc25d226163421bb062e3bb",
            title: "nesciunt iure omnis dolorem tempora et accusantium",
            body: "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas"
        },
        {
            author: "5fc25d546163421bb062e3bc",
            title: "optio molestias id quia eum",
            body: "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error"
        },
        {
            author: "5fc25d226163421bb062e3bb",
            title: "et ea vero quia laudantium autem",
            body: "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi"
        },
        {
            author: "5fc25d546163421bb062e3bc",
            title: "in quibusdam tempore odit est dolorem",
            body: "itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio"
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