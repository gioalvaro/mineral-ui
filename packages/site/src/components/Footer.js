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
import React from 'react';
import { createStyledComponent } from '@mineral-ui/component-utils';
import Link from './Link';
import styleReset from './styleReset';

type Props = {|
  className?: string
|};

const Root = createStyledComponent('div', (props, theme) => ({
  ...styleReset(theme),
  color: theme.borderColor,
  fontSize: theme.font_size_a,
  margin: theme.measurement_d,

  '@media(min-width: 32em)': {
    display: 'flex',

    '& > :last-child': {
      marginLeft: 'auto'
    }
  }
}));

export default function Footer({ className }: Props) {
  return (
    <Root className={className}>
      <div>Copyright © 2017 CA</div>
      <div>
        We welcome feedback and contributions on
        {' '}
        <Link href="https://github.com/mineral-ui/mineral-ui">
          GitHub
        </Link>
      </div>
    </Root>
  );
}