import { RequestToAdmin } from "./RequestToAdmin";

export interface Message {
  messageId: number;
  author: string;
  message: string;
  messageType: string;
  requestToAdminDTO: RequestToAdmin;
}
