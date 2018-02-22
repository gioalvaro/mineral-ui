/**
 * Copyright 2017 CA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */
import React, { cloneElement } from 'react';
import { ellipsis } from 'polished';
import { createStyledComponent, getNormalizedValue, pxToEm } from '../styles';
import IconDanger from '../Icon/IconDanger';
import IconSuccess from '../Icon/IconSuccess';
import IconWarning from '../Icon/IconWarning';

type Props = {
  /** TODO */
  control:
    | React$StatelessFunctionalComponent<*>
    | React$ComponentType<*>
    | string,
  /** TODO */
  controlProps: Object,
  /** Disables the input */
  disabled?: boolean,
  /** Icon located at the start of the input */
  iconStart?: React$Element<*>,
  /** Icon located at the end of the input */
  iconEnd?: React$Element<*>,
  /** Text to display before input value */
  prefix?: React$Node,
  /** Indicates that the user cannot modify the value of the input */
  readOnly?: boolean,
  /** Available sizes */
  size?: 'small' | 'medium' | 'large' | 'jumbo',
  /** Text to display after input value */
  suffix?: React$Node,
  /** Available variants */
  variant?: 'success' | 'warning' | 'danger'
};

export const componentTheme = (baseTheme: Object) => ({
  ControlItems_color_placeholder: baseTheme.color_gray_60,
  ControlItems_color_text: baseTheme.color_gray_80,
  ControlItems_fontSize: baseTheme.fontSize_ui,
  ControlItems_fontSize_small: pxToEm(12),
  ControlItems_height_small: baseTheme.size_small,
  ControlItems_height_medium: baseTheme.size_medium,
  ControlItems_height_large: baseTheme.size_large,
  ControlItems_height_jumbo: baseTheme.size_jumbo,
  ControlItems_paddingHorizontal: baseTheme.space_inset_md,

  ControlItemsIcon_marginHorizontal: baseTheme.space_inline_sm,

  ...baseTheme
});

const styles = {
  prefix: ({ iconStart, size, theme: baseTheme }) => {
    const theme = componentTheme(baseTheme);
    const rtl = theme.direction === 'rtl';

    const fontSize =
      size === 'small'
        ? theme.ControlItems_fontSize_small
        : theme.ControlItems_fontSize;
    const marginWithIcon = getNormalizedValue(
      theme.ControlItems_paddingHorizontal,
      fontSize
    );
    const marginWithoutIcon = getNormalizedValue(
      `${parseFloat(theme.ControlItemsIcon_marginHorizontal) / 2}em`,
      fontSize
    );

    return {
      flex: '0 0 auto',
      fontSize,
      marginLeft: rtl ? marginWithoutIcon : iconStart ? 0 : marginWithIcon,
      marginRight: rtl ? (iconStart ? 0 : marginWithIcon) : marginWithoutIcon,
      whiteSpace: 'nowrap',
      ...ellipsis('8em')
    };
  },
  control: ({
    disabled,
    hasPlaceholder,
    iconEnd,
    iconStart,
    prefix,
    size,
    suffix,
    theme: baseTheme,
    variant
  }) => {
    const theme = componentTheme(baseTheme);
    // const theme = baseTheme;

    const rtl = theme.direction === 'rtl';
    const fontSize =
      size === 'small'
        ? theme.ControlItems_fontSize_small
        : theme.ControlItems_fontSize;
    const paddingWithoutIcon = getNormalizedValue(
      theme.ControlItems_paddingHorizontal,
      fontSize
    );

    return {
      color: disabled
        ? theme.color_text_disabled
        : hasPlaceholder
          ? theme.ControlItems_color_placeholder
          : theme.ControlItems_color_text,
      fontSize,
      fontStyle: hasPlaceholder && !disabled ? 'italic' : null,
      height: getNormalizedValue(
        theme[`ControlItems_height_${size}`],
        fontSize
      ),
      paddingLeft:
        ((iconStart || prefix) && !rtl) ||
        ((iconEnd || variant || suffix) && rtl)
          ? 0
          : paddingWithoutIcon,
      paddingRight:
        ((iconEnd || variant || suffix) && !rtl) ||
        ((iconStart || prefix) && rtl)
          ? 0
          : paddingWithoutIcon
    };
  },
  suffix: ({ iconEnd, size, theme: baseTheme, variant }) => {
    const theme = componentTheme(baseTheme);
    const rtl = theme.direction === 'rtl';

    const fontSize =
      size === 'small'
        ? theme.ControlItems_fontSize_small
        : theme.ControlItems_fontSize;
    const marginWithIcon = getNormalizedValue(
      theme.ControlItems_paddingHorizontal,
      fontSize
    );
    const marginWithoutIcon = getNormalizedValue(
      `${parseFloat(theme.ControlItemsIcon_marginHorizontal) / 2}em`,
      fontSize
    );

    return {
      flex: '0 0 auto',
      fontSize,
      marginLeft: rtl
        ? iconEnd || variant ? 0 : marginWithIcon
        : marginWithoutIcon,
      marginRight: rtl
        ? marginWithoutIcon
        : iconEnd || variant ? 0 : marginWithIcon,
      whiteSpace: 'nowrap',
      ...ellipsis('8em')
    };
  }
};

const Prefix = createStyledComponent('span', styles.prefix);
const Suffix = createStyledComponent('span', styles.suffix);

const variantIcons = {
  danger: <IconDanger />,
  success: <IconSuccess />,
  warning: <IconWarning />
};

function getIcons({
  disabled,
  iconStart,
  iconEnd,
  readOnly,
  size,
  variant,
  variantIcons
}) {
  if (disabled || readOnly) {
    return [];
  }

  const iconSize = size === 'small' ? 'medium' : pxToEm(24);
  const startIcon =
    iconStart &&
    cloneElement(iconStart, {
      size: iconSize,
      key: 'iconStart'
    });

  const endIconSource = variant
    ? variantIcons[variant]
    : iconEnd ? iconEnd : null;

  const endIcon =
    endIconSource &&
    cloneElement(endIconSource, {
      size: iconSize,
      key: 'iconEnd'
    });

  return [startIcon, endIcon];
}

/**
 * ControlItems
 */
export default function ControlItems({
  disabled,
  iconEnd,
  iconStart,
  prefix: prefixIn,
  readOnly,
  size,
  control,
  controlProps: controlPropsIn,
  suffix: suffixIn,
  variant
}: Props) {
  const [startIcon, endIcon] = getIcons({
    disabled,
    iconStart,
    iconEnd,
    readOnly,
    size,
    variant,
    variantIcons
  });

  const prefixAndSuffixProps = {
    iconEnd,
    iconStart,
    size,
    variant
  };

  const prefix = prefixIn ? (
    <Prefix {...prefixAndSuffixProps} key="prefix">
      {prefixIn}
    </Prefix>
  ) : null;
  const suffix = suffixIn ? (
    <Suffix {...prefixAndSuffixProps} key="suffix">
      {suffixIn}
    </Suffix>
  ) : null;

  const controlProps = {
    ...controlPropsIn,
    disabled,
    iconEnd,
    iconStart,
    prefix: prefixIn,
    size,
    suffix: suffixIn,
    variant
  };

  const Control = createStyledComponent(control, styles.control);

  return [
    startIcon,
    prefix,
    <Control {...controlProps} key="control" />,
    suffix,
    endIcon
  ];
}