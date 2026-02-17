import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "./ui/Button";
import api from "../services/api";

const CommentSection = ({ blogId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`/blogs/${blogId}/comments`);
        setComments(response.data.comments || response.data || []);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      fetchComments();
    }
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      await api.post(`/blogs/${blogId}/comments`, { content: newComment });
      const response = await api.get(`/blogs/${blogId}/comments`);
      setComments(response.data.comments || response.data || []);
      setNewComment("");
    } catch (err) {
      console.error("Failed to post comment:", err);
      alert("Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-16 border-t border-gray-800 pt-12">
      <h3 className="text-2xl font-bold mb-8">Comments ({comments.length})</h3>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-12">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="flex-grow">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add to the discussion..."
                className="w-full bg-[#111] border border-gray-800 rounded-lg p-4 text-white focus:outline-none focus:border-white transition-colors min-h-[100px]"
                required
              />
              <div className="mt-2 flex justify-end">
                <Button
                  type="submit"
                  disabled={submitting || !newComment.trim()}
                >
                  {submitting ? "Posting..." : "Post Comment"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-[#111] p-6 rounded-lg text-center mb-12 border border-gray-800">
          <p className="text-gray-400 mb-4">Log in to join the conversation.</p>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/login")}
          >
            Login to Comment
          </Button>
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-500 italic">No comments yet.</p>
      ) : (
        <div className="space-y-8">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 text-sm font-bold">
                {comment.author?.name
                  ? comment.author.name.charAt(0).toUpperCase()
                  : "A"}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-white">
                    {comment.author?.name || "Anonymous"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {comment.created_at
                      ? new Date(comment.created_at).toLocaleDateString()
                      : ""}
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
