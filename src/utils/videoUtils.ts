/**
 * Helper utility to parse video links (YouTube, Shorts, Vimeo, Google Drive, direct MP4)
 */

export function parseVideoUrl(input: string): {
  type: 'youtube' | 'vimeo' | 'url' | 'unknown';
  embedUrl?: string;
  directUrl?: string;
} {
  const trimmed = input.trim();
  if (!trimmed) return { type: 'unknown' };

  // YouTube Shorts: https://youtube.com/shorts/{id} or https://www.youtube.com/shorts/{id}
  const ytShortsMatch = trimmed.match(/(?:youtube\.com\/shorts\/)([\w-]{11})/);
  if (ytShortsMatch) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${ytShortsMatch[1]}?autoplay=1&rel=0`,
    };
  }

  // Standard YouTube: https://www.youtube.com/watch?v={id} or https://youtu.be/{id}
  const ytMatch = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  if (ytMatch) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
    };
  }

  // Vimeo: https://vimeo.com/{id}
  const vimeoMatch = trimmed.match(
    /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/
  );
  if (vimeoMatch && vimeoMatch[3]) {
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[3]}?autoplay=1`,
    };
  }

  // Google Drive: https://drive.google.com/file/d/{id}/...
  const gdriveMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (gdriveMatch) {
    return {
      type: 'url',
      embedUrl: `https://drive.google.com/file/d/${gdriveMatch[1]}/preview`,
      directUrl: trimmed,
    };
  }

  // Direct video file or generic url
  return {
    type: 'url',
    directUrl: trimmed,
  };
}
