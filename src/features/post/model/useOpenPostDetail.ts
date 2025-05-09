import { Post } from "@/entities/post/model/post.types";
import usePostStore from "./usePostStore";
import { useModalStore } from "@/shared/model/useModalStore";
import useFetchComments from "@/features/commnet/model/useFetchComments";

const useOpenPostDetail = () => {
  const { setSelectedPost } = usePostStore();
  const { setShowPostDetailDialog } = useModalStore();
  const { fetchComments } = useFetchComments();

  const openPostDetail = (post: Post) => {
    setSelectedPost(post);
    fetchComments(post.id);
    setShowPostDetailDialog(true);
  };
  return { openPostDetail };
};

export default useOpenPostDetail;
