import {ListObjectsV2Command} from "@aws-sdk/client-s3";
import {s3Client} from "@/lib/file-actions/s3";

export const getUserFiles = async (email: string) => {
  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string,
    Prefix: `${email}/`,
  };

  const command = new ListObjectsV2Command(params);
  try {
    const response = await s3Client.send(command);
    return response.Contents;
  } catch (error) {
    console.error("Error getting user file-actions", error);
  }
}
