import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { AuthorDetails, Loader, Categories, PostWidget, FeaturedPostCard } from '../../components';
import { getAuthorss, getAuthors, getFeaturedPostsAuth } from '../../services';

const Authors = ({ ath }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if ((ath !== undefined) && (ath !== null)) {
      getFeaturedPostsAuth(ath.slug).then((result) => {
        setFeaturedPosts(result);
        setDataLoaded(true);
      });
    }
  }, [ath]);

  const customLeftArrow = (
    <div className="absolute arrow-btn left-0 text-center py-3 cursor-pointer bg-pink-600 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </div>
  );

  const customRightArrow = (
    <div className="absolute arrow-btn right-0 text-center py-3 cursor-pointer bg-pink-600 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </div>
  );

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <>
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-5">
          <div className="col-span-1 lg:col-span-6">
            <div className="flex flex-col">
              <AuthorDetails auth={ath} />
            </div>
            <Carousel infinite customLeftArrow={customLeftArrow} customRightArrow={customRightArrow} responsive={responsive} itemClass="px-4">
              {dataLoaded && featuredPosts.map((post, index) => (
                <FeaturedPostCard key={index} post={post} />
              ))}
            </Carousel>
          </div>
          <div className="col-span-1 lg:col-span-2">
            <div className="relative lg:sticky top-8">
              <PostWidget />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Authors;

export async function getStaticProps({ params }) {
  const data = await getAuthors(params.slug);
  return {
    props: {
      ath: data,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAuthorss();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}

