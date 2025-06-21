'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const isValidImageUrl = (url) => {
    try {
      const valid = new URL(url);
      return /\.(jpeg|jpg|gif|png|webp|svg)$/.test(valid.pathname);
    } catch (_) {
      return false;
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // Basic validations
  //   if (!title || !author || !coverImage || !body) {
  //     setError('All fields are required.');
  //     return;
  //   }

  //   if (!isValidImageUrl(coverImage)) {
  //     setError('Please provide a valid image URL (jpg, png, etc.)');
  //     return;
  //   }

  //   // Clear previous error
  //   setError('');

  //   const newPost = {
  //     title,
  //     author,
  //     coverImage,
  //     body,
  //     createdAt: new Date().toISOString(),
  //   };

  //   try {
  //     const res = await fetch('/api/posts', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(newPost),
  //     });

  //     if (res.ok) {
  //       // Redirect or show success
  //       router.push('/');
  //     } else {
  //       const data = await res.json();
  //       setError(data?.message || 'Failed to create post');
  //     }
  //   } catch (err) {
  //     setError('An error occurred while submitting the post.');
  //     console.error(err);
  //   }
  // };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
          {error}
        </div>
      )}

      <form  className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        {/* <input
          type="text"
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border p-2 rounded"
          required
        /> */}
        <input
          type="url"
          placeholder="Cover Image URL"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Write your post here. You can use {{block ...}} tags."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full border p-2 rounded h-60"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
