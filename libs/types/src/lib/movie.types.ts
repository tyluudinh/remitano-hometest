// Types shared between frontend and backend
export interface Movie extends CreateMovie {
  _id: string;
  shared_by: string; // link to user
  youtube_video_id: string;
}

export interface CreateMovie {
  title: string;
  description: string;
  youtube_link: string;
}


export enum MovieErrorCodes {
  alreadyExists = 'MOVIE.ALREADY_EXISTS',
  notFound = 'MOVIE.NOT_FOUND',
}
