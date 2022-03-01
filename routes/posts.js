const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const postsRouter = require("express").Router();
const request = require("request");

postsRouter.get("/:tag/:sortBy?/:direction?", async (req, res) => {
  let { tag, sortBy, direction } = req.params;
  const sortByParams = ["id", "reads", "likes", "popularity", undefined];
  const directionParams = ["asc", "desc", undefined];

  if (!sortByParams.includes(sortBy)) {
    return res.status(400).send({
      error: "sortBy parameter is invalid",
    });
  }
  if (!directionParams.includes(direction)) {
    return res.status(400).send({
      error: "sortBy parameter is invalid",
    });
  }

  if (tag.includes(",")) {
    try {
      let tagURLs = [];
      let tagArray = tag.split(",");
      tagArray.forEach((tag) => {
        tagURLs.push(
          `https://api.hatchways.io/assessment/blog/posts?tag=${tag}&sortBy=${sortBy}&direction=${direction}`
        );
      });

      let requestAsync = function (url) {
        return new Promise((resolve, reject) => {
          let req = request(url, (err, response, body) => {
            if (err) return reject(err, response, body);
            resolve(JSON.parse(body));
          });
        });
      };

      let getParallelURLData = async function () {
        try {
          let data = await Promise.all(tagURLs.map(requestAsync));
          let combinedArray = [];
          for (let i = 0; i < data.length; i++) {
            let tagsData = data[i].posts;
            for (let j = 0; j < tagsData.length; j++) {
              combinedArray.push(tagsData[j]);
            }
          }

          function getUniquePosts(array, key) {
            return [
              ...new Map(array.map((item) => [item[key], item])).values(),
            ];
          }

          let filteredArray = getUniquePosts(combinedArray, "id");

          if (sortBy) {
            if (direction === "desc") {
              filteredArray = filteredArray.sort((a, b) =>
                b[sortBy] > a[sortBy] ? 1 : -1
              );
            } else {
              filteredArray = filteredArray.sort((a, b) =>
                b[sortBy] < a[sortBy] ? 1 : -1
              );
            }
          }

          res.status(200).send(filteredArray);
        } catch (err) {
          console.error(err);
        }
      };

      getParallelURLData();
    } catch (error) {
      res.status(400).send({
        error: "tags parameter is required",
      });
      console.log(error);
    }
  } else {
    try {
      const response = await fetch(
        `https://api.hatchways.io/assessment/blog/posts?tag=${tag}&sortBy=${sortBy}&direction=${direction}`
      );
      let data = await response.json();
      data = data.posts;

      if (sortBy) {
        if (direction === "desc") {
          data = data.sort((a, b) => (b[sortBy] > a[sortBy] ? 1 : -1));
        } else {
          data = data.sort((a, b) => (b[sortBy] < a[sortBy] ? 1 : -1));
        }
      }

      res.status(200).send(data);
    } catch (error) {
      res.status(400).send({ error: "tag parameter is required" });
      console.log(error);
    }
  }
});

module.exports = postsRouter;
