import axios from "axios";
import { QueryResponse } from "../types";

export async function getResponse(prompt: string): Promise<QueryResponse> {
  const bodyform = new FormData();

  bodyform.append("data", prompt);

  const { data } = await axios.put(
    `https://unbounded.eu-1.sharedwithexpose.com/query`,
    bodyform
  );

  return data;
}

export async function addPersonalInfo(information: string): Promise<void> {
  const bodyform = new FormData();

  bodyform.append("data", information);

  await axios.put(`https://unbounded.eu-1.sharedwithexpose.com/add`, bodyform);
}
