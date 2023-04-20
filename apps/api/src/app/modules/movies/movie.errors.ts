import { MovieErrorCodes } from '@remitano-hometest/types';
import { ErrorBase } from '../../libs/errors/error.base';

export class MovieAlreadyExistsError extends ErrorBase {
  readonly code = MovieErrorCodes.alreadyExists;
  static message: string;

  constructor(metadata: any) {
    console.log(metadata);
    const message = `Movie ${metadata.youtube_link} already exists`;

    super(message, message);
  }
}

export class MovieNotFoundError extends ErrorBase {
  readonly code = MovieErrorCodes.notFound;

  static message = 'Movie not found';

  constructor(metadata?: unknown) {
    super(MovieNotFoundError.message, metadata);
  }
}
