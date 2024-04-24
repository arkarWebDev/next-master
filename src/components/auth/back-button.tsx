import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
  backHerf: string;
  backLabel: string;
}
const BackButton = ({ backHerf, backLabel }: BackButtonProps) => {
  return (
    <Button variant={"link"} className="font-normal w-full" asChild>
      <Link href={backHerf}>{backLabel}</Link>
    </Button>
  );
};

export default BackButton;
