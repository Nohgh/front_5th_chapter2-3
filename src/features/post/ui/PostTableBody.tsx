import { Button, TableBody, TableCell, TableRow } from "@/shared/ui";
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import useQueryParams from "@/shared/lib/useQueryParams";
import HighlightText from "@/shared/ui/HighLightText";
import { useModalStore } from "@/shared/model/useModalStore";
import usePostStore from "../model/usePostStore";
import useOpenPostDetail from "../model/useOpenPostDetail";
import { useOpenUserModal } from "@/features/user/model/useOpenUserModal";
import useDeletePost from "../model/useDeletePost";

const PostTableBody = () => {
  const { posts, setSelectedPost } = usePostStore();
  const { selectedTag, searchQuery, setSelectedTag, updateURL } = useQueryParams();
  const { setShowEditDialog } = useModalStore();
  const { openUserModal } = useOpenUserModal();
  const { openPostDetail } = useOpenPostDetail();
  const { deletePost } = useDeletePost();

  return (
    <TableBody>
      {posts.map((post) => (
        <TableRow key={post.id}>
          <TableCell>{post.id}</TableCell>
          <TableCell>
            <div className="space-y-1">
              <div>
                <HighlightText text={post.title} highlight={searchQuery} />
              </div>

              <div className="flex flex-wrap gap-1">
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                      selectedTag === tag
                        ? "text-white bg-blue-500 hover:bg-blue-600"
                        : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                    }`}
                    onClick={() => {
                      setSelectedTag(tag);
                      updateURL();
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(post.author)}>
              <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
              <span>{post.author?.username}</span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-4 h-4" />
              <span>{post.reactions?.likes || 0}</span>
              <ThumbsDown className="w-4 h-4" />
              <span>{post.reactions?.dislikes || 0}</span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
                <MessageSquare className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedPost(post);
                  setShowEditDialog(true);
                }}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default PostTableBody;
