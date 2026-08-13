/**
 * usePosts — posts data hook (architecture placeholder).
 *
 * Planned return values:
 * - posts, isLoading, error
 * - fetchPosts(), createPost(), updatePost(), deletePost()
 *
 * Will consume postService once API integration is implemented.
 */
export default function usePosts() {
  return {
    posts: [],
    isLoading: false,
    error: null,
    fetchPosts: async () => {},
    createPost: async () => {},
    updatePost: async () => {},
    deletePost: async () => {},
  }
}
