/**
 * A User Returned By The Database
 */
export interface UserShape {
  /**
   * The unique identifier for the user
   */
  id: string;
  /**
   * The name of the user
   */
  name: string;
  /**
   * The email of the user
   */
  email: string;
}