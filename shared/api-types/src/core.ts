/**
 * A custom message from the server
 */
export type CustomMessage = {
  /**
   * The message from the server
   */
  message: string
}

/**
 * Enum for HTTP Status Codes.
 */
export enum HttpStatusCode {
  /**
   * 200 OK: The request has succeeded.
   */
  OK = 200,

  /**
   * 201 Created: The request has been fulfilled and resulted in a new resource being created.
   */
  Created = 201,

  /**
   * 202 Accepted: The request has been accepted for processing, but the processing has not been completed.
   */
  Accepted = 202,

  /**
   * 204 No Content: The server successfully processed the request, but is not returning any content.
   */
  NoContent = 204,

  /**
   * 400 Bad Request: The server could not understand the request due to invalid syntax.
   */
  BadRequest = 400,

  /**
   * 401 Unauthorized: The client must authenticate itself to get the requested response.
   */
  Unauthorized = 401,

  /**
   * 403 Forbidden: The client does not have access rights to the content.
   */
  Forbidden = 403,

  /**
   * 404 Not Found: The server can not find the requested resource.
   */
  NotFound = 404,

  /**
   * 405 Method Not Allowed: The method specified in the request is not allowed for the resource.
   */
  MethodNotAllowed = 405,

  /**
   * 500 Internal Server Error: The server has encountered a situation it doesn't know how to handle.
   */
  InternalServerError = 500,

  /**
   * 501 Not Implemented: The server does not support the functionality required to fulfill the request.
   */
  NotImplemented = 501,

  /**
   * 502 Bad Gateway: The server, while acting as a gateway or proxy, received an invalid response from the upstream server.
   */
  BadGateway = 502,

  /**
   * 503 Service Unavailable: The server is not ready to handle the request due to temporary overloading or maintenance.
   */
  ServiceUnavailable = 503
}