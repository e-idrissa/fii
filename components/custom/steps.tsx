import { useFormState } from "./context";
import Identity from "./steps/identity";
import Responsibles from "./steps/responsibles";
import Salvation from "./steps/salvation";
import Complete from "./steps/complete";
import Engagement from "./steps/engagement";

type Props = {};

const Steps = (props: Props) => {
  const { step } = useFormState();

  const steps = [
    "identity",
    "responsibles",
    "salvation",
    "engagement",
    "complete",
  ];

  switch (step) {
    case 0:
      return <Identity steps={steps} />;
    case 1:
      return <Responsibles steps={steps} />;
    case 2:
      return <Salvation steps={steps} />;
    case 3:
      return <Engagement steps={steps} />;
    case 4:
      return <Complete />;
    default:
      return <Identity steps={steps} />;
  }
};

export default Steps;
