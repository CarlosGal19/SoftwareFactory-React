import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axiosClient from '../../config/axios';

interface FormData {
	title: string;
	content: string;
	url_img?: string;
}

interface CreatePostProps {
	topicId: string;
}

const CreatePost: React.FC<CreatePostProps> = ({ topicId }) => {
	const [formData, setFormData] = useState<FormData>({ title: '', content: '', url_img: '' });
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [showSuccessAlert, setShowSuccessAlert] = useState(false);

	useEffect(() => {
		if (showSuccessAlert) {
			const timer = setTimeout(() => {
				setShowSuccessAlert(false);
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [showSuccessAlert]);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		const token = localStorage.getItem('jwt');

		try {
			await axiosClient.post('/posts', { ...formData, topic_id: topicId }, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setFormData({ title: '', content: '', url_img: '' });
			setShowForm(false);
			setShowSuccessAlert(true);
		} catch (error: any) {
			console.error('Error while creating the post:', error.response.data.message || 'Unknown error');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			{!showForm ? (
				<div className="flex justify-center">
					<input
						type="text"
						placeholder="Create a new post"
						className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer w-64"
						onClick={() => setShowForm(true)}
						readOnly
					/>
				</div>
			) : (
				<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
					<div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
						<h2 className="text-2xl font-semibold mb-4">Create a new post</h2>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label className="block text-gray-700">Title:</label>
								<input
									type="text"
									name="title"
									value={formData.title}
									onChange={handleInputChange}
									required
									className="mt-1 px-3 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-gray-200"
								/>
							</div>
							<div>
								<label className="block text-gray-700">Content:</label>
								<textarea
									name="content"
									value={formData.content}
									onChange={handleInputChange}
									required
									className="mt-1 px-3 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-gray-200"
								/>
							</div>
							<div>
								<label className="block text-gray-700">Image URL (optional):</label>
								<input
									type="text"
									name="url_img"
									value={formData.url_img}
									onChange={handleInputChange}
									className="mt-1 px-3 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-gray-200"
								/>
							</div>
							<button
								type="submit"
								disabled={isSubmitting}
								className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded w-full"
							>
								{isSubmitting ? 'Creating...' : 'Create post'}
							</button>
							<button
								type="button"
								onClick={() => setShowForm(false)}
								className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full"
							>
								Cancel
							</button>
						</form>
					</div>
				</div>
			)}

			{showSuccessAlert && (
				<div className="fixed top-16 right-5 z-50">
					<div className="bg-green-500 text-white p-4 rounded-lg shadow-lg">
						Post has been created successfully
					</div>
				</div>
			)}
		</>
	);
};


export default CreatePost;