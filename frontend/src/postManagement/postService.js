const API_URL = 'http://localhost:8080/api/posts';

export const createPost = async (userId, caption, imageUrl) => {
  try {
    const response = await fetch(`${API_URL}/add?userId=${userId}&caption=${caption}&imageUrl=${imageUrl}`, {
      method: 'POST',
    });
    return await response.json();
  } catch (error) {
    console.error('Create post failed:', error);
  }
};

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/all`);
    return await response.json();
  } catch (error) {
    console.error('Fetch posts failed:', error);
    return [];
  }
};

export const getPost = async (postId) => {
  try {
    const response = await fetch(`${API_URL}/get/${postId}`);
    return await response.json();
  } catch (error) {
    console.error('Fetch post failed:', error);
  }
};

export const updatePost = async (postId, caption) => {
  try {
    const response = await fetch(`${API_URL}/update/${postId}?caption=${caption}`, {
      method: 'PUT',
    });
    return await response.json();
  } catch (error) {
    console.error('Update post failed:', error);
  }
};

export const deletePost = async (postId) => {
  try {
    await fetch(`${API_URL}/delete/${postId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Delete post failed:', error);
  }
};
