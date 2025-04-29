export interface ResultModel<T> {
  data?: T;
  errorMessages?: string[];
  isSuccessful: boolean;
  statusCode: number;
}
