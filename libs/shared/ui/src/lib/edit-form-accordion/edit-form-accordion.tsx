import { Accordion, AccordionProps } from '@mui/material';
import { ReactNode, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export type EditFormAccordionProps = AccordionProps & {
  /** form properties inside the accordion */
  formProperties: string[];
  /** child elements */
  children: NonNullable<ReactNode>;
};

export const EditFormAccordion = ({
  formProperties,
  expanded = false,
  children,
  ...props
}: EditFormAccordionProps): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState<boolean>(expanded);

  const {
    formState: { errors: formErrors },
  } = useFormContext();

  const accordionShouldOpen = (): boolean => {
    const newArray = [...Object.keys(formErrors), ...formProperties];
    return new Set(newArray).size !== newArray.length;
  };

  return (
    <Accordion
      {...props}
      expanded={accordionShouldOpen() || isExpanded}
      onChange={(_e, expanded) => {
        if (accordionShouldOpen() && !expanded) {
          return;
        }
        setIsExpanded(expanded);
      }}
    >
      {children}
    </Accordion>
  );
};

export default EditFormAccordion;
