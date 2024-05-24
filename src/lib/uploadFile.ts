import {PutObjectCommand} from "@aws-sdk/client-s3";
import {s3Client} from "@/lib/s3";

export const uploadFile = async (file: File, userId: string) => {
  const filename = file.name;

  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string,
    Key: `${userId}/${filename}`,
    Body: file,
    ContentType: file.type,
  };

  const command = new PutObjectCommand(params);
  try {
    const response = await s3Client.send(command);
    console.log(response);
  } catch (error) {
    console.error("Error uploading file", error);
  }
}
