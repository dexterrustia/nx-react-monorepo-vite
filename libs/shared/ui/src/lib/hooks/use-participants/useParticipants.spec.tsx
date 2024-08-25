import { act, renderHook } from '@testing-library/react';
import { Participant } from '@xpand/utils/_types';
import {
  UseParticipantsProps,
  UseParticipantsReturn,
  useParticipants,
} from '.';

describe('useParticipants', () => {
  type Phone = {
    prefix: string;
    number: string;
  };

  const participants: Participant<Phone>[] = [
    {
      id: 'id1',
      mail: '1@1.com',
      name: 'name1',
      phoneNumbers: [{ prefix: '+1', number: '1111111111' }],
      roles: ['employee'],
      type: 'EMPLOYEE',
    },
    {
      id: 'id2',
      mail: '2@2.com',
      name: 'name2',
      phoneNumbers: [{ prefix: '+2', number: '2222222222222' }],
      roles: ['employee'],
      type: 'EMPLOYEE',
    },
  ];

  test('initialized correctly with props', () => {
    const { result } = renderHook<
      UseParticipantsReturn<Phone>,
      UseParticipantsProps<Phone>
    >(() => {
      return useParticipants({
        options: participants,
      });
    });

    const r = result.current;

    expect(r.appendParticipants).toBeTruthy();
    expect(r.chosenParticipants.length).toBe(0);
    expect(r.setSelectedIds).toBeTruthy();
    expect(r.displaySelectedParticipants.length).toBe(0);
    expect(r.displayOptions[0]).toEqual({
      id: 'id1',
      label: 'name1',
      type: 'EMPLOYEE',
    });
  });

  test('renders with default chosen participants', () => {
    const { result } = renderHook<
      UseParticipantsReturn<Phone>,
      UseParticipantsProps<Phone>
    >(() => {
      return useParticipants({
        options: participants,
        defaultChosenParticipants: participants,
      });
    });

    expect(result.current.chosenParticipants.length).toBe(2);
  });

  test('should set a selected participant and append', async () => {
    const { result } = renderHook<
      UseParticipantsReturn<Phone>,
      UseParticipantsProps<Phone>
    >(() => {
      return useParticipants({
        options: participants,
      });
    });

    expect(result.current.displaySelectedParticipants.length).toBe(0);
    act(() => result.current.setSelectedIds([participants[0].id]));
    expect(result.current.displaySelectedParticipants.length).toBe(1);

    act(() => result.current.appendParticipants());
    expect(result.current.chosenParticipants.length).toBe(1);
  });

  test('should exclude given id from the display options', () => {
    const { result } = renderHook<
      UseParticipantsReturn<Phone>,
      UseParticipantsProps<Phone>
    >(() => {
      return useParticipants({
        options: participants,
        hideFromOptions: [participants[0].id],
      });
    });

    expect(result.current.displayOptions.length).toBe(1);
  });

  test('should remove a chosen participant', () => {
    const { result } = renderHook<
      UseParticipantsReturn<Phone>,
      UseParticipantsProps<Phone>
    >(() => {
      return useParticipants({
        options: participants,
      });
    });

    act(() => result.current.setSelectedIds([participants[0].id]));
    act(() => result.current.appendParticipants());
    expect(result.current.chosenParticipants.length).toBe(1);

    act(() => result.current.removeChosenParticipant(participants[0].id));
    expect(result.current.chosenParticipants.length).toBe(0);
  });
});
