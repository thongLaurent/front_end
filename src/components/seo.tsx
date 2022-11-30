import React from 'react';
import Head from 'next/head';

type SeoProps = {
  title: string;
  description: string;
  canonical?: string;
  css?: string;
  js?: string;
  image?: string;
};

export const SEO: React.FC<SeoProps> = ({
  title,
  description,
  canonical,
  css,
  js,
  image,
}) => (
  <Head>
    <title>{"Offer Cart"}</title>
    
  </Head>
);
