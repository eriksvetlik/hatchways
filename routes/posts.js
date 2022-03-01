const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const postsRouter = require("express").Router();
const request = require("request");

// GET /api/posts/tag/sortBy/direction
postsRouter.get("/:tag/:sortBy?/:direction?", async (req, res) => {
  let { tag, sortBy, direction } = req.params;
  const sortByParams = ["id", "reads", "likes", "popularity", undefined];
  const directionParams = ["asc", "desc", undefined];

  // send error if entered sortBy does not match valid sortBys
  if (tag === undefined) {
    return res.status(400).send({
      error: "tag parameter is required",
    });
  }

  // send error if entered sortBy does not match valid sortBys
  if (!sortByParams.includes(sortBy)) {
    return res.status(400).send({
      error: "sortBy parameter is invalid",
    });
  }

  // send error if entered direction does not match valid directions
  if (!directionParams.includes(direction)) {
    return res.status(400).send({
      error: "sortBy parameter is invalid",
    });
  }

  // if entered tag includes a comma, separate tags and fetch multiple URLs
  if (tag.includes(",")) {
    try {
      // create empty tagURLs array
      let tagURLs = [];
      // add tags to new array
      let tagArray = tag.split(",");
      // for each tag in tagArray, push the URL with the tag to tagURLs
      tagArray.forEach((tag) => {
        tagURLs.push(
          `https://api.hatchways.io/assessment/blog/posts?tag=${tag}&sortBy=${sortBy}&direction=${direction}`
        );
      });

      // create requestAsync function to pass URLs and make request calls
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
          // returns the data from all the URLs in tagURLs using requestAsync()
          let data = await Promise.all(tagURLs.map(requestAsync));
          // create empty combinedArray array
          let combinedArray = [];
          // for each element in the data, assign tagsData equal to the data.post object
          for (let i = 0; i < data.length; i++) {
            let tagsData = data[i].posts;
            // for each element in the array, push the tagsData object to the combinedArray
            for (let j = 0; j < tagsData.length; j++) {
              combinedArray.push(tagsData[j]);
            }
          }

          // function to remove duplicate elements in an array with same key value
          function getUniquePosts(array, key) {
            return [
              ...new Map(array.map((item) => [item[key], item])).values(),
            ];
          }

          // remove objects in the combinedArray with the same id
          let filteredArray = getUniquePosts(combinedArray, "id");

          // if sortBy is entered, sort the array by asc or desc order by that value
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

          // send the sorted filterArray
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
    // if entered tag does not include a comma, fetch URL with that tag
    try {
      const response = await fetch(
        `https://api.hatchways.io/assessment/blog/posts?tag=${tag}&sortBy=${sortBy}&direction=${direction}`
      );
      let data = await response.json();
      data = data.posts;

      // if sortBy is entered, sort the array by asc or desc order by that value
      if (sortBy) {
        if (direction === "desc") {
          data = data.sort((a, b) => (b[sortBy] > a[sortBy] ? 1 : -1));
        } else {
          data = data.sort((a, b) => (b[sortBy] < a[sortBy] ? 1 : -1));
        }
      }

      // send the sorted filterArray
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send({ error: "tag parameter is required" });
      console.log(error);
    }
  }
});

module.exports = postsRouter;
