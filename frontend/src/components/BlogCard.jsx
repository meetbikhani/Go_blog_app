import { Link } from "react-router-dom";
import { User, Calendar } from "lucide-react";

const BlogCard = ({ blog }) => {
  const date = blog.CreatedAt
    ? new Date(blog.CreatedAt).toLocaleDateString("en-GB")
    : "Recently";

  return (
    <Link to={`/blog/${blog.ID}`} className="block group">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img 
          src={blog.image || `https://picsum.photos/seed/${blog.ID}/800/400`}
          alt={blog.title}
          className="w-full h-full object-top transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-gray-200 line-clamp-2">
          {blog.title}
        </h3>
        {/* 
        <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
          {blog.content}
        </p> */}

        <div className="flex justify-between items-center text-xs text-gray-500 mt-auto border-t border-gray-800 pt-4">
          <div className="flex items-center gap-2">
            <User className="w-3 h-3" />
            <span>{blog.user?.name || "Anonymous"}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-3 h-3" />
          <span> {date}</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
