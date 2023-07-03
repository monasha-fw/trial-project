export interface IRoute {
  method: string;
  path: string;
  action: any;
  authorizeFor?: Array<string>;
  multer?: [];
  requireSubscription?: boolean;
  /// swagger specific
  tag?: string;
  description?: string;
  /// example: [{200:success}]
  responses: Array<{ [status: number]: string }>;
}
