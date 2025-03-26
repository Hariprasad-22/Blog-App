import React, { useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserAuthorContextObj } from "../../contexts/UserAuthorContext";
const PostArticle = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { currentUser } = useContext(UserAuthorContextObj);
  const navigate = useNavigate();

  async function postArticle(articleObj) {
    //create article object as per article schema
    const authorData = {
      nameofAuthor: currentUser.firstName,
      email: currentUser.email,
      profileImageUrl: currentUser.profileImageUrl,
    };
    articleObj.authorData = authorData;
    //articel id (timestamp)
    articleObj.articleId = Date.now();
    //Date of creation
    let currentDate = new Date();
    articleObj.dateOfCreation =
      currentDate.getDate() +
      "-" +
      currentDate.getMonth() +
      "-" +
      currentDate.getFullYear() +
      "-" +
      currentDate.toLocaleTimeString("en-US", { hour12: true });
    //Date of modification
    articleObj.dateOfModification =
      currentDate.getDate() +
      "-" +
      currentDate.getMonth() +
      "-" +
      currentDate.getFullYear() +
      "-" +
      currentDate.toLocaleTimeString("en-US", { hour12: true });
    //comments
    articleObj.comments = [];
    ///article state
    articleObj.isArticleActive = true;
    console.log(articleObj);

    let res = await axios.post(
      "http://localhost:5000/author-api/article",
      articleObj
    );
    if (res.status === 201) {
      navigate(`/author-profile/${currentDate.email}/articles`);
    } else {
      //error
    }

    // await axios.post('',articleObj)
  }

  return (
    <div className="article-form container w-50 p-3 rounded-3 mb-5">
      <h2 className="text-center">Write an Article...</h2>
      <form onSubmit={handleSubmit(postArticle)}>
        <div class="mb-3">
          <label class="form-label fs-4 fw-semibold">Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter title of article"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-danger">{errors.title.message}</p>
          )}
        </div>
        <div class="mb-3">
          <label class="form-label fs-4 fw-semibold">Select a Category</label>
          <select
            className="form-select"
            {...register("category", { required: "Category is required" })}
          >
            <option value="">Select a Category</option>
            <option value="Computer Graphics">Computer Graphics</option>
            <option value="Data Science">Data Science</option>
            <option value="Artificial Intelligence">
              Artificial Intelligence
            </option>
          </select>
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
        </div>
        <div class="mb-3 fs-4 fw-semibold">
          <label class="form-label">Content</label>
          <textarea
            className="form-control"
            rows="8"
            placeholder="Write your article here..."
            {...register("content", { required: "Content is required" })}
          />
          {errors.content && (
            <p className="text-danger">{errors.content.message}</p>
          )}
        </div>
        <button type="submit" class="btn btn-success ">
          Post
        </button>
      </form>
    </div>
  );
};

export default PostArticle;
