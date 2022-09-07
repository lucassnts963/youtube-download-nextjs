declare type IFormat = {
  mimeType: string;
  qualityLabel: string;
  bitrate: number;
  audioBitrate: number;
  itag: number;
  width: number;
  height: number;
  lastModified: string;
  contentLength: string;
  quality: string;
  fps: 25;
  projectionType: string;
  averageBitrate: number;
  audioQuality: string;
  approxDurationMs: string;
  audioSampleRate: string;
  audioChannels: number;
  url: string;
  hasVideo: boolean;
  hasAudio: boolean;
  container: string;
  codecs: string;
  videoCodec: string;
  audioCodec: string;
  isLive: boolean;
  isHLS: boolean;
  isDashMPD: boolean;
};

declare type IAuthor = {
  id: string;
  name: string;
  user: string;
  channel_url: string;
  external_channel_url: string;
  user_url: string;
  thumbnails: Image[];
  verified: false;
  subscriber_count: number;
};

declare type IStoryboards = {
  templateUrl: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  thumbnailCount: number;
  interval: number;
  columns: number;
  rows: number;
  storyboardCount: number;
};

declare type IImage = {
  url: string | null;
  width: number;
  height: number;
};

declare type IVideoDetails = {
  title: string;
  description: string;
  lengthSeconds: string;
  ownerProfileUrl: string;
  externalChannelId: string;
  isFamilySafe: boolean;
  availableCountries: string[];
  isUnlisted: boolean;
  hasYpcMetadata: boolean;
  viewCount: string;
  category: string;
  publishDate: string;
  ownerChannelName: string;
  uploadDate: string;
  videoId: string;
  keywords: string[];
  channelId: string;
  isOwnerViewing: boolean;
  isCrawlable: boolean;
  allowRatings: boolean;
  author: IAuthor;
  isPrivate: boolean;
  isUnpluggedCorpus: boolean;
  isLiveContent: boolean;
  media: any;
  likes: number | null;
  dislikes: number | null;
  age_restricted: boolean;
  video_url: string;
  storyboards: IStoryboards[];
  chapters: any[];
  thumbnails: Image[];
};
