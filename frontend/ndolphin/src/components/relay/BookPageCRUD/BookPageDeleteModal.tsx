interface PageDeleteModalProps {
  isOpen: boolean;
  commentId: number;
  onClose: () => void;
  onConfirm: (comment: number) => void;
}

const PageDeleteModal: React.FC<PageDeleteModalProps> = ({ commentId, isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="flex flex-col items-center bg-white p-5 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">경고</h2>
        <p>정말 삭제하시겠습니까?</p>
        <p>현재 작성된 페이지가 삭제됩니다.</p>
        <div className="mt-4 flex justify-end">
          <button onClick={() => { onConfirm(commentId) }} className="bg-red-500 text-white px-4 py-2 rounded mr-2">
            삭제
          </button>
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageDeleteModal;
