import { useMutation } from "react-query"
import { destroy } from "../../firebase"

export const useDashboardMutation = () => {
  const mutation = useMutation(destroy)
  return mutation
}
