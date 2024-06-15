import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { getCommentsByBlogID } from "../api/api";

function formatDate(date) {
  const day = date.getDate();

  const suffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
      ? "nd"
      : day === 3 || day === 23
      ? "rd"
      : "th";

  return format(date, `do 'of' MMMM, yyyy`).replace("do", `${day}${suffix}`);
}

export default function BlogSummary({ blog }) {
  const [blogComments, setBlogComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    if (blog) {
      getCommentsByBlogID(blog.blog_id)
        .then(({ comments }) => {
          setIsLoading(false);
          setBlogComments(comments);
        })
        .catch(
          ({
            response: {
              status,
              data: { message },
            },
          }) => {
            setIsLoading(false);
            setError({ status, message: message });
          }
        );
    }
  }, []);

  const date = new Date(blog.date_published);

  const formattedDate = formatDate(date);

  const shortenedTitle = (title) => {
    const maxLength = 50;
    return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
  };

  if (isLoading)
    return (
      <div >
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Loading blogs...</p>
      </div>
    );
  if (error)
    return (
      <div>
        <i className="fa-solid fa-exclamation"></i>
        <p>
          Oops, there's been an error: {error.status} {error.message}
        </p>
      </div>
    );

  return (
    <div
    
     >
      <div >
        <div >
          <Link to={`/blogs/${blog.blog_id}`}>
            <div
             
              >
              <img
    
                src={
                  blog.image_url
                    ? blog.image_url
                    : "https://picsum.photos/300/300"
                }
                alt="Blog cover image"
              />
            </div>
          </Link>
        </div>
        <div
      
       >
          <h5>{shortenedTitle(blog.title)}</h5>
        </div>

        <div >
          <p >Written by:</p>
          <p>{blog.username}</p>

          <p>{formattedDate}</p>
        </div>
        <div
      
          title="Comments">
          <i className="fa-solid fa-comment text-success"></i>
          <p >{blogComments.length}</p>
        </div>
      </div>
    </div>
  );
}
