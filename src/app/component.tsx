import { useReadContract } from "thirdweb/react";
import { contract } from "./client";

export default function Component() {
  const { data: count, isLoading: loadingCount } = useReadContract({ 
    contract, 
    method: "getCount", 
    params: [] 
  });
  return loadingCount ? <p>...</p> : <h2>{count?.toString()}</h2>
}