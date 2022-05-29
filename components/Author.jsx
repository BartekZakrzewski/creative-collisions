import React from 'react';
import Image from 'next/image';

import Link from 'next/link';
import { grpahCMSImageLoader } from '../util';

const Author = ({ auth }) => (
  <div className="flex flex-col-reverse">
    <Link href={`/authors/${auth.slug}`}>
      <div className="cursor-pointer text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
        <div className="absolute left-0 right-0 -top-14">
          <Image
            unoptimized
            loader={grpahCMSImageLoader}
            alt={auth.name}
            height="100px"
            width="100px"
            className="align-middle rounded-full"
            src={auth.photo.url}
          />
        </div>
        <h3 className="text-white mt-4 mb-4 text-xl font-bold">{auth.name}</h3>
        <p className="hidden md:inline-block lg:inline-block text-white text-ls">{auth.bio}</p>
      </div>
    </Link>
  </div>
);

export default Author;
