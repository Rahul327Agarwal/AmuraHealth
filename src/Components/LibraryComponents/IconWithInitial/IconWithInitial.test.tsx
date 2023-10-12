import { screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import renderTestDom from './../../../test/renderTestDom';
import IconWithInitial, { initial_character_limit } from './IconWithInitial';
import { CalendarIconV2 } from './IconWithInitial.svg';

const Text_Initial = 'ah';
const initial_with_may_characters = 'many characters long';

describe('IconWithInitial Component', () => {
  it('Should contain an SVG denoting the presence of icon', () => {
    const { container } = renderTestDom(<IconWithInitial icon={<CalendarIconV2 />} initial={Text_Initial} />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).not.toBeNull();
  });

  it('Initials should be present and visible', () => {
    renderTestDom(<IconWithInitial icon={<CalendarIconV2 />} initial={Text_Initial} />);
    const initial = screen.getByText(Text_Initial.slice(0, initial_character_limit));
    expect(initial).toBeInTheDocument();
    expect(initial).toBeVisible();
  });

  it('Initials should not exceed character limit', () => {
    renderTestDom(<IconWithInitial icon={<CalendarIconV2 />} initial={initial_with_may_characters} />);
    const initial = screen.getByTestId('initial');
    expect(initial?.textContent?.length).toBe(initial_character_limit);
  });

  it('Initials should not be present if empty', () => {
    renderTestDom(<IconWithInitial icon={<CalendarIconV2 />} initial={''} />);
    const initial = screen.queryByTestId('initial');
    expect(initial).not.toBeInTheDocument();
  });
});
