import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Header from "./header";

interface CardWrapperProps {
  title: string;
  label: string;
  children: React.ReactNode;
}

const CardWrapper = ({ title, label, children }: CardWrapperProps) => {
  return (
    <Card className=" md:w-2/3 shadow-md mt-10">
      <CardHeader>
        <Header title={title} label={label} />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
