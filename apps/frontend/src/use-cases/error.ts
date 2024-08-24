export class PublicError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends PublicError {
  constructor() {
    super("Resource not found");
    this.name = "NotFoundError";
  }
}

export class GoogleError extends PublicError {
  constructor() {
    super("Google Api error");
    this.name = "GoogleError";
  }
}

export class StrapiError extends PublicError {
  constructor() {
    super("Strapi Error");
    this.name = "StrapiError";
  }
}

export class DateError extends PublicError {
  constructor() {
    super("Date error");
    this.name = "DateError";
  }
}
