import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { getBlogs } from "../api/api";
import BlogSummary from "./BlogSummary";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function BlogPage() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [searchBlogs, setSearchBlogs] = useState([]);
  let [searchTerms, setSearchTerms] = useState("");
  let [notFound, setNotFound] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getBlogs()
      .then(({ blogs }) => {
        setIsLoading(false);
        setAllBlogs(blogs);
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
  }, [searchBlogs]);

  useEffect(() => {
    let timeout;

    if (notFound) {
      timeout = setTimeout(() => {
        setNotFound(null);
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [notFound]);

  const handleInputChange = (e) => {
    setSearchTerms(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const searchTerm = searchTerms.toLocaleLowerCase();

    if (allBlogs) {
      const filteredBlogs = allBlogs.filter((blog) => {
        const searchTermsArray = searchTerm.split(" ");

        return (
          blog.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
          searchTermsArray.some((searchWord) =>
            blog.username.toLowerCase().includes(searchWord)
          ) ||
          searchTermsArray.some((searchWord) =>
            blog.title.toLocaleLowerCase().includes(searchWord)
          )
        );
      });

      setSearchBlogs(filteredBlogs);
      if (filteredBlogs.length === 0) {
        setNotFound("Couldn't find any blog tags based on your search.");
      }
    }
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
    <div>
      {allBlogs.length > 0 && (
        <div >
          <div >
            <i
              onClick={() => {
                setSearchBlogs([]);
                setSearchTerms("");
                setNotFound("");
              }}
          
           ></i>
          </div>
          <form
     
            onSubmit={(e) => handleSearch(e)}>
            <div>
              <label
                htmlFor="topic-search"
           
                aria-label="Search"
                aria-describedby="button-addon2"></label>
              <input
     
        
                onChange={(e) => handleInputChange(e)}
                type="text"
                placeholder="What are you looking for?"
              />
              <button
      
              >
                Search
              </button>
            </div>
          </form>
        </div>
      )}

      <div
    
      >
        {notFound && (
          <Alert
      
            variant="danger">
            {notFound}
          </Alert>
        )}
      </div>

      <div>
        {allBlogs.length > 0 ? (
          <div>
            {searchBlogs && searchBlogs.length > 0
              ? searchBlogs.map((blog) => (
                  <BlogSummary
                    key={blog.blog_id}
                    blog={blog}
                  />
                ))
              : allBlogs.map((blog) => (
                  <BlogSummary
                    key={blog.blog_id}
                    blog={blog}
                  />
                ))}
          </div>
        ) : (
          <div >
            <div >
              <Alert
                variant="success"
              >
                <div >
                  No one has posted any blogs yet... is there anything you'd
                  like to share?
                </div>
              </Alert>
            </div>

            <div
>
              {user ? (
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Home
                </button>
              ) : (
                <div>
                  <div >
                    <h4>Join the community</h4>
                    <button
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </button>
                    <button
                      onClick={() => navigate("/register")}
                     >
                      Register
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
