import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import AuthHeader from "./auth-header";
import BackButton from "./back-button";

interface CardWrapperProps {
  title: string;
  label: string;
  backHerf: string;
  backLabel: string;
  children: React.ReactNode;
}

const CardWrapper = ({
  title,
  label,
  backHerf,
  backLabel,
  children,
}: CardWrapperProps) => {
  return (
    <Card className=" md:w-1/3 shadow-md">
      <CardHeader>
        <AuthHeader title={title} label={label} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton backHerf={backHerf} backLabel={backLabel} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
