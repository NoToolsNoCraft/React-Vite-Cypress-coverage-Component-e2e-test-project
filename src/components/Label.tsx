import { Text } from "@radix-ui/themes";
import useLanguage from "../hooks/useLanguage";

type LabelProps = {
  labelId: string;
  getLabel?: (id: string) => string;
};

const Label = ({ labelId, getLabel }: LabelProps) => {
  const language = useLanguage();
  const labelGetter = getLabel ?? language.getLabel;

  return <Text>{labelGetter(labelId)}</Text>;
};

export default Label;
