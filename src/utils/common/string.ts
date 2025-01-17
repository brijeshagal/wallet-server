import { JoinDelimiter } from "../../constants/common/string";

export function joinStrings(...inputs: (string | number)[]): string {
  return inputs.join(JoinDelimiter);
}
