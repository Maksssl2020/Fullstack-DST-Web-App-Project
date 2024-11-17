export interface UserPhotoUpdateRequest {
  photo: File;
  photoType: "AVATAR" | "IDENTIFY";
}
