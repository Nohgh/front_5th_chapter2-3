import useAddPosts from "@/features/post/model/useAddPosts";
import usePostStore from "@/features/post/model/usePostStore";
import { useModalStore } from "@/shared/model/useModalStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea, Button } from "@/shared/ui";

const AddPostModal = () => {
  const { showAddDialog, setShowAddDialog } = useModalStore();
  const { newPost, setNewPost } = usePostStore();
  const { addPosts } = useAddPosts();

  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={() => addPosts(newPost)}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPostModal;
