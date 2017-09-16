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
import { createStyledComponent } from '../../../utils';
import Link from '../Link';
import Markdown from '../Markdown';
import pages from './';

const styles = {
  page: {
    listStyle: 'none'
  },
  pageTitle: ({ theme }) => ({
    fontSize: theme.fontSize_h2,
    textTransform: 'capitalize'
  }),
  section: ({ theme }) => ({
    paddingLeft: theme.spacing_quad
  })
};

const Page = createStyledComponent('li', styles.page);
const PageTitle = createStyledComponent('h2', styles.pageTitle);
const Section = createStyledComponent('div', styles.section);

function renderSections(page) {
  page.sections &&
    page.sections.map((section, i) => {
      if (!page.path) return null;
      const path = section.id ? `${page.path}#${section.id}` : section.path;
      return (
        <Section key={`section-${i}`}>
          <h3>
            <Link to={path}>
              {section.title}
            </Link>
          </h3>
          <Markdown>
            {section.desc}
          </Markdown>
        </Section>
      );
    });
}

export default function Guidelines() {
  return (
    <div>
      {pages.map((page, i) => {
        if (page.path === '/guidelines') {
          return (
            <Page key={`page-${i}`}>
              <PageTitle>
                {page.title}
              </PageTitle>
              <Markdown>
                {page.desc}
              </Markdown>
              {Array.isArray(page.sections) && renderSections(page)}
            </Page>
          );
        }
      })}
    </div>
  );
}