import { useState, Dispatch, SetStateAction, useMemo } from 'react';
import { Participant, ParticipantDisplay } from '@xpand/utils/_types';

export type UseParticipantsProps<TPhone> = {
  /** Options to display in the autocomplete */
  options: Participant<TPhone>[];
  /** Ids of options to not display */
  hideFromOptions?: string[];
  /** Sets default chosen participants state */
  defaultChosenParticipants?: Participant<TPhone>[];
};

export type UseParticipantsReturn<TPhone> = {
  /** Callback trigged to add new participant. Usually involves a setValue from react hook form */
  appendParticipants: () => void;
  /** The actual chosen participants */
  chosenParticipants: Participant<TPhone>[];
  /** List of ids that is currently selected in a form auto complete */
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
  /** Options to be displayed in a form auto complete */
  displayOptions: ParticipantDisplay[];
  /** List of selected participants to display */
  displaySelectedParticipants: ParticipantDisplay[];
  /** Callback that should handle the removal of a participant */
  removeChosenParticipant: (id: string) => void;
};

export const useParticipants = <TPhone,>({
  options,
  hideFromOptions = [],
  defaultChosenParticipants = [],
}: UseParticipantsProps<TPhone>): UseParticipantsReturn<TPhone> => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [chosenParticipants, setChosenParticipants] = useState<
    Participant<TPhone>[]
  >(defaultChosenParticipants);

  /** Returns a list with filtered options based on the `hideFromOptions` prop */
  const filteredOptions = useMemo(() => {
    return options.filter((option) => !hideFromOptions.includes(option.id));
  }, [options, hideFromOptions]);

  /** Returns the current selected participants in the autocomplete field */
  const selectedParticipants = useMemo(() => {
    const mapped: Participant<TPhone>[] = [...filteredOptions]
      .filter((participant) => selectedIds.includes(participant.id))
      .map((participant) => {
        return {
          ...participant,
        };
      });
    return mapped;
  }, [selectedIds]);

  /** Returns the options mapped into a display format type, which are used to display the options in the auto complete field */
  const displayOptions = useMemo(() => {
    const mapped: ParticipantDisplay[] = filteredOptions
      .map((x) => {
        return {
          label: x.name,
          id: x.id,
          type: x.type || 'EMPLOYEE',
        };
      })
      .filter((x) => !chosenParticipants.some((y) => y.id === x.id))
      .sort?.((a, b) => a.label?.localeCompare(b.label || '') || 0);
    return mapped;
  }, [filteredOptions]);

  /** Returns the current selected participants in the autocomplete mapped into a display format type */
  const displaySelectedParticipants = useMemo(() => {
    const mapped: ParticipantDisplay[] = selectedParticipants.map((x) => {
      return {
        label: x.name,
        id: x.id,
        type: x.type || 'EMPLOYEE',
      };
    });
    return mapped;
  }, [selectedParticipants]);

  /** Adds the current selected participants in the autocomplete as chosen participants */
  const appendParticipants = () => {
    const newParticipants = filteredOptions.filter((participant) =>
      selectedIds.includes(participant.id)
    );
    setChosenParticipants((prev) => [...prev, ...newParticipants]);
  };

  /** Removes a chosen participant by id*/
  const removeChosenParticipant = (id: string) => {
    setChosenParticipants((prev) => [
      ...prev.filter((participant) => participant.id !== id),
    ]);
  };

  return {
    appendParticipants,
    chosenParticipants,
    setSelectedIds,
    displayOptions,
    displaySelectedParticipants,
    removeChosenParticipant,
  };
};

export default useParticipants;
