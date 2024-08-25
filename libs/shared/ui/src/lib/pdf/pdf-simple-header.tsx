import Image from 'next/image';
import { PdfHeaderMainTitle, PdfHeaderSubTitle } from '.';
import {
  PdfDefaultHeaderTextWrapper,
  PdfDefaultHeaderWrapper,
} from './pdf-header';
import StatusChip, { StatusChipProps } from '../status-chip';
import styled from '@emotion/styled';

type PdfSimpleHeaderProps = {
  mainTitle: string;
  subTitle: string;
  /** Renders a status chip to the right of the main title when defined */
  statusChip?: StatusChipProps;
};

type HeaderContentProps = PdfSimpleHeaderProps;

const MainTitleStatusChipWrapper = styled.div`
  display: flex;
  align-items: center;

  & > div {
    margin-left: ${({ theme }) => theme.spacing(2)};
  }
`;

const HeaderContent = ({
  mainTitle,
  subTitle,
  statusChip,
}: HeaderContentProps) => {
  return (
    <>
      <PdfDefaultHeaderTextWrapper>
        {mainTitle && (
          <MainTitleStatusChipWrapper>
            <PdfHeaderMainTitle variant="h1">{mainTitle}</PdfHeaderMainTitle>
            {statusChip && <StatusChip {...statusChip} />}
          </MainTitleStatusChipWrapper>
        )}
        {subTitle && <PdfHeaderSubTitle>{subTitle}</PdfHeaderSubTitle>}
      </PdfDefaultHeaderTextWrapper>
      <Image src="/Logo.svg" width={30} height={60} alt="" />
    </>
  );
};

export const PdfSimpleHeader = (props: PdfSimpleHeaderProps): JSX.Element => {
  return (
    <PdfDefaultHeaderWrapper>
      <HeaderContent {...props} />
    </PdfDefaultHeaderWrapper>
  );
};
