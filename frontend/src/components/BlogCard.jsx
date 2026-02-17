import { Link } from "react-router-dom";
import { User, Calendar } from "lucide-react";

const BlogCard = ({ blog }) => {
  const date = blog.created_at
    ? new Date(blog.created_at).toLocaleDateString()
    : "Recently";

  return (
    <Link to={`/blog/${blog.id}`} className="block group">
      <div className="bg-[#111] border border-gray-800 rounded-xl p-6 transition-all duration-300 transform group-hover:scale-[1.02] group-hover:border-white/50 group-hover:shadow-xl group-hover:shadow-white/5 h-full flex flex-col">
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-gray-200 line-clamp-2">
          {blog.title}
        </h3>

        <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
          {blog.content}
        </p>

        <div className="flex justify-between items-center text-xs text-gray-500 mt-auto border-t border-gray-800 pt-4">
          <div className="flex items-center gap-2">
            <User className="w-3 h-3" />
            <span>{blog.author?.name || "Anonymous"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3" />
            <span>{date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
