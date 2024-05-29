import {DeleteObjectCommand} from "@aws-sdk/client-s3";
import {s3Client} from "@/lib/file-actions/s3";

export const deleteFile = async (key: string) => {
  const command = new DeleteObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string,
    Key: key,
  });

  try {
    const data = await s3Client.send(command);
    console.log("File deleted successfully", data);
  } catch (error) {
    console.error("Error deleting file", error);
  }
}
