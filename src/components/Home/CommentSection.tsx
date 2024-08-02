// CommentSection.tsx
import { FC, useState } from 'react';

type Comment = {
    id: number;
    user: string;
    content: string;
};

type CommentSectionProps = {
    comments: Comment[];
    onAddComment: (content: string) => void;
};

const CommentSection: FC<CommentSectionProps> = ({ comments, onAddComment }) => {
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim()) {
            onAddComment(newComment);
            setNewComment('');
        }
    };

    return (
        <div className="mt-4">
            <h3 className="font-semibold text-lg">Comments</h3>
            <ul className="mt-2 space-y-2">
                {comments.map((comment) => (
                    <li key={comment.id} className="bg-gray-100 p-2 rounded-lg">
                        <strong>{comment.user}</strong>: {comment.content}
                    </li>
                ))}
            </ul>
            <div className="mt-2 flex">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-grow border border-gray-300 p-2 rounded-lg"
                />
                <button onClick={handleAddComment} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                    Comment
                </button>
            </div>
        </div>
    );
};

export default CommentSection;
