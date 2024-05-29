import {PutObjectCommand} from "@aws-sdk/client-s3";
import {s3Client} from "@/lib/s3";
import {FileType} from "@/types/file";

export const uploadFile = async (file: File, email: string, type: FileType, extension = '') => {
  const filename = file.name;

  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string,
    Key: `${email}/${type + extension}-${filename}`,
    Body: file,
    ContentType: file.type,
  };

  const command = new PutObjectCommand(params);
  try {
    const response = await s3Client.send(command);
  } catch (error) {
    console.error("Error uploading file", error);
  }
}
