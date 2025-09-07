"use client";

import { deletePost } from "@/actions/post-actions";
import { useState } from "react";
import Modal from "../modal";

export default function DeletePostButton({ postId }) {
  const [showModal, setShowModal] = useState(false);

  const handleDeletePost = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  };

  const handleCancelDeletion = () => setShowModal(false);

  return (
    <>
      <button
        onClick={handleDeletePost}
        className="cursor-pointer font-tajawal"
      >
        حذف
      </button>
      <Modal
        isOpen={showModal}
        onClose={handleCancelDeletion}
        title="هل أنت متأكد من حذف المقالة؟"
        children={
          <>
            <button onClick={() => deletePost(postId)}>نعم</button>
            <button onClick={handleCancelDeletion}>كلا</button>
          </>
        }
      />
    </>
  );
}
