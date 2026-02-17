import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/ui/Button";
import BlogCard from "../components/BlogCard";
import api from "../services/api";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const response = await api.get("/my-blogs");
        setBlogs(response.data.blogs || response.data || []);
      } catch (err) {
        console.error("Failed to fetch my blogs:", err);
        setError("Failed to load your blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <h1 className="text-3xl font-bold tracking-tight">My Blogs</h1>
          <Link to="/create-blog">
            <Button className="w-full md:w-auto">Create New Blog</Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">{error}</div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-24 bg-[#111] rounded-xl border border-gray-800 border-dashed">
            <p className="text-gray-400 mb-4">
              You haven't posted any blogs yet.
            </p>
            <Link to="/create-blog">
              <Button variant="outline">Write your first blog</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
