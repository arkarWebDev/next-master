const paths = {
  HomePage() {
    return "/";
  },
  CreateTopic() {
    return "/topics";
  },
  SingleTopic(slug: string) {
    return `/topics/${slug}`;
  },
  CreatePost(slug: string) {
    return `/topics/${slug}/posts/new`;
  },
  SinglePost(slug: string, postId: string) {
    return `/topics/${slug}/posts/${postId}`;
  },
};

export default paths;
