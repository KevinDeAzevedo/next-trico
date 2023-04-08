'use client';

import { DiscussionEmbed } from 'disqus-react';

export default function DisqusComments({ post }) {
  const disqusShortname = 'trico-1';
  const disqusConfig = {
    url: 'https://your-site-url/test',
    identifier: 'id', // Single post id
    title: 'title', // Single post title
  };
  return (
    <div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
}
