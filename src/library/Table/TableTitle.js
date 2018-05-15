/* @flow */
import React from 'react';
import { createStyledComponent } from '../styles';
import { ThemeProvider, withTheme } from '../themes';
import Text from '../Text';

type Props = {
  appearance?: TitleAppearance,
  children: React$Node,
  element?: TitleAppearance,
  id: string,
  theme: Object
};
export type TitleAppearance = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export const componentTheme = (baseTheme: Object) => ({
  TableTitle_color: baseTheme.h4_color,
  TableTitle_fontSize: baseTheme.h4_fontSize,
  TableTitle_fontWeight: baseTheme.h4_fontWeight,
  TableTitle_marginBottom: baseTheme.space_stack_sm,

  ...baseTheme
});

const Caption = createStyledComponent(
  'caption',
  ({ theme: baseTheme }) => {
    const theme = componentTheme(baseTheme);

    return {
      marginBottom: theme.TableTitle_marginBottom
    };
  },
  {
    displayName: 'Caption',
    rootEl: 'caption'
  }
);

/**
 * TableTitle TODO
 */
const Title = ({ appearance, children, element, id, theme }: Props) => {
  const textProps = {
    align: 'start',
    appearance,
    element,
    id
  };

  let title = <Text {...textProps}>{children}</Text>;

  if (
    theme.TableTitle_color ||
    theme.TableTitle_fontSize ||
    theme.TableTitle_fontWeight
  ) {
    const appliedAppearance = appearance || element || 'h4';
    // prettier-ignore
    const getOverride = (variable) =>
      theme[`TableTitle_${variable}`]
        ? { [`Text_${variable}_${appliedAppearance}`]: theme[`TableTitle_${variable}`] }
        : undefined;
    const textTheme = {
      ...getOverride('color'),
      ...getOverride('fontSize'),
      ...getOverride('fontWeight')
    };

    title = <ThemeProvider theme={textTheme}>{title}</ThemeProvider>;
  }

  return <Caption>{title}</Caption>;
};

export default withTheme(Title);
