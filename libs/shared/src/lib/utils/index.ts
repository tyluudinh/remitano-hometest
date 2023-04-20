const validYoutubeLinkPattern = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/(watch\?v=)?([\w-]{11})$/;

function isValidYoutubeLink(link: string): boolean {
  return validYoutubeLinkPattern.test(link);
}

function getYoutubeVideoId(link: string): string {
  const pattern = /[?&]vi?=([^&]*)/;
  const match = pattern.exec(link);
  if (match) {
      return match[1];
  } else {
      throw new Error('Invalid Youtube link');
  }
}

export {
  isValidYoutubeLink,
  validYoutubeLinkPattern,
  getYoutubeVideoId
}
