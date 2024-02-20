import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              slug
              photo {
                url
              }
            }
            createdAt
            realDate
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges;
};

export const getAuthorss = async () => {
  const query = gql`
    query MyQuery {
      authors {
        bio
        name
        photo {
          url
        }
        slug
        posts {
          featuredImage {
            url
          }
          slug
          title
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.authors;
};

export const getAuthors = async (slug) => {
  const query = gql`
    query GetAuthors($slug: String!) {
      author(where: {slug: $slug}) {
        name
        slug
        posts {
          slug
        }
        bio
        fullBio{
          raw
        }
        photo {
          url
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.author;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
        categories {
          name
          slug
        }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.categories;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          slug
          photo {
            url
          }
        }
        createdAt
        realDate
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        realDate
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug, categories });

  return result.posts;
};

export const getAdjacentPosts = async (createdAt, slug) => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!,$slug:String!) {
      next:posts(
        first: 1
        orderBy: realDate_ASC
        where: {slug_not: $slug, AND: {createdAt_gte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        realDate
        slug
      }
      previous:posts(
        first: 1
        orderBy: realDate_DESC
        where: {slug_not: $slug, AND: {createdAt_lte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        realDate
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug, createdAt });

  return { next: result.next[0], previous: result.previous[0] };
};

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              slug
              photo {
                url
              }
            }
            createdAt
            realDate
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          slug
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
        realDate
      }
    }   
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const getFeaturedPostsAuth = async (auth) => {
  const query = gql`
    query GetCategoryPost($auth: String!) {
      author(where: {slug: $auth}) {
        posts {
          featuredImage {
            url
          }
          slug
          title
          createdAt
          realDate
          author {
            name
            photo {
              url
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { auth });

  return result.author.posts;
};

export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug:String!) {
      comments(where: {post: {slug:$slug}}){
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.comments;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: realDate_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        realDate
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.posts;
};
