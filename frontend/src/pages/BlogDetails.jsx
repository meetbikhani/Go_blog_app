import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CommentSection from "../components/CommentSection";
import api from "../services/api";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Button from "../components/ui/Button";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/blogs/${id}`);
        setBlog(response.data.blog || response.data);
      } catch (err) {
        console.error("Failed to fetch blog details:", err);
        setError("Failed to load blog.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">
            {error || "Blog not found"}
          </h2>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <article>
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
              {blog.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-gray-400 border-b border-gray-800 pb-8">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-white font-medium">
                  {blog.author?.name || "Anonymous"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {blog.created_at
                    ? new Date(blog.created_at).toLocaleDateString()
                    : "Recently"}
                </span>
              </div>
            </div>
          </header>

          <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap">
            {blog.content}
          </div>
        </article>

        <CommentSection blogId={id} />
      </div>
    </div>
  );
};

export default BlogDetails;
