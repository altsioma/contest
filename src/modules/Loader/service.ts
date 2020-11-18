import { data } from "@/../data";
import { sleep } from "@/utils/sleep";

export const getData = async (): Promise<typeof data> => {
  await sleep(1000);
  return data;
};
