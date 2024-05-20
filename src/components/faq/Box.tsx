import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface BoxProps {
  value: string;
  question: string;
  answer: string;
}
const Box = ({ value, question, answer }: BoxProps) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={value}>
        <AccordionTrigger>{question}</AccordionTrigger>
        <AccordionContent>{answer}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Box;
