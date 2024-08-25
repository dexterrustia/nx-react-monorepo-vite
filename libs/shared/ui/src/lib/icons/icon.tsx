import Image from 'next/image';
import { memo } from 'react';
import styled from '@emotion/styled';

export type IconOptions = {
  type?: 'icon' | 'image';
  size?: 'small' | 'medium' | 'large';
};

export type IconProps = {
  svg: string;
  alt: string;
  options?: IconOptions;
};

const iconSizeMap = {
  small: 32,
  medium: 48,
  large: 64,
};

const imageSizeMap = {
  small: 200,
  medium: 400,
  large: 600,
};

const Container = styled.div<{ options?: IconOptions }>`
  width: ${(props) => {
    const { type = 'icon', size = 'medium' } = props.options || {
      type: 'icon',
      size: 'medium',
    };

    const baseSize = type === 'icon' ? iconSizeMap[size] : imageSizeMap[size];
    const responsiveSize = (baseSize * 10) / 100;
    return `${responsiveSize}vw`;
  }};
  max-width: ${(props) => {
    const { type = 'icon', size = 'medium' } = props.options || {
      type: 'icon',
      size: 'medium',
    };

    const baseSize = type === 'icon' ? iconSizeMap[size] : imageSizeMap[size];
    return `${baseSize}px`;
  }};
`;

const Icon = ({ svg, alt, options }: IconProps): JSX.Element => {
  return (
    <Container options={options}>
      <Image
        src={svg}
        alt={alt}
        width={0}
        height={0}
        priority
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </Container>
  );
};

const optionsAreEqual = (prev: IconProps, next: IconProps): boolean => {
  return (
    prev.options?.size === next.options?.size &&
    prev.options?.type === next.options?.type
  );
};

export default memo(Icon, optionsAreEqual);
