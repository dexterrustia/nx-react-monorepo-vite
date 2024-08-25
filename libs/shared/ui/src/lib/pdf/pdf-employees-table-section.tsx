import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Participant } from '@xpand/utils/_types';
import { BasePhone, concatPhoneNumbers } from '@xpand/utils/phone';
import useTranslation from 'next-translate/useTranslation';
import { PdfParagraphSubTitle } from '.';

export type ParticipantTableSectionProps<TPhone> = {
  /** Text to display to the right of the title */
  titlePrefix: string;
  /** List of users/employees/participants to render in the data grid */
  participants: Participant<TPhone>[];
  /** Custom title to render at the top of the section. Overwrites the `titlePrefix` prop. */
  customTitle?: string;
  /** Hides the grid and only displays title and the `emptyMessage` if provided */
  displayEmptyWhenNoParticipants?: boolean;
  /** Used to display that no employees/participants exists in the `participants` array. Only rendered when `displayEmptyWhenNoParticipants` is `true`. */
  emptyMessage?: string;
  /** Hides the user type column */
  hideUserType?: boolean;
  /** Hides the role column */
  hideRole?: boolean;
  /** Hides the title column */
  hideTitle?: boolean;
};

export const PdfEmployeesTableSection = <TPhone extends BasePhone>({
  titlePrefix,
  participants,
  customTitle,
  displayEmptyWhenNoParticipants,
  emptyMessage,
  hideRole = false,
  hideTitle = false,
  hideUserType = false,
}: ParticipantTableSectionProps<TPhone>): JSX.Element => {
  const { t } = useTranslation();

  const displayNoParticipants =
    displayEmptyWhenNoParticipants && !participants.length;

  return (
    <>
      <PdfParagraphSubTitle marginTop={5}>
        {!customTitle
          ? `${titlePrefix} ${t('common:participants.otherParticipants')}`
          : customTitle}
      </PdfParagraphSubTitle>
      {displayNoParticipants && (
        <Typography variant="body2">{emptyMessage}</Typography>
      )}
      {!displayNoParticipants && (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('common:participants.columns.name')}</TableCell>
                  <TableCell>
                    {t('common:participants.columns.phone')}
                  </TableCell>
                  <TableCell>
                    {t('common:participants.columns.email')}
                  </TableCell>
                  {!hideTitle && (
                    <TableCell>
                      {t('common:participants.columns.title')}
                    </TableCell>
                  )}
                  {!hideRole && (
                    <TableCell>
                      {t('common:participants.columns.role')}
                    </TableCell>
                  )}
                  {!hideUserType && (
                    <TableCell>
                      {t('common:participants.columns.userType')}
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>

              <TableBody>
                {participants.map((p) => {
                  return (
                    <TableRow key={p.id}>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>
                        {concatPhoneNumbers(p.phoneNumbers)}
                      </TableCell>
                      <TableCell>{p.mail}</TableCell>
                      {!hideTitle && <TableCell>{p.title}</TableCell>}
                      {!hideRole && (
                        <TableCell>
                          {p.roles
                            ?.flatMap((role: string) =>
                              role
                                ? t(`common:standardRolesDropdown.${role}`)
                                : []
                            )
                            .join(', ') || ''}
                        </TableCell>
                      )}
                      {!hideUserType && (
                        <TableCell>
                          {t(`common:userTypesDropdown.${p.userType}`)}
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default PdfEmployeesTableSection;
