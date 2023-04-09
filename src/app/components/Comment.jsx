'use client';

import { DiscussionEmbed } from 'disqus-react';

export default function DisqusComments({ url, id, title }) {
  const disqusShortname = 'trico-1';
  const disqusConfig = {
    url: url,
    identifier: id, // Single post id
    title: title, // Single post title
  };
  return (
    <div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
}
