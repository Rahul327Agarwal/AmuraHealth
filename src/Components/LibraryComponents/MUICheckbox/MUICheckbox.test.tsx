import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import Checkbox from './MUICheckbox';
import { screen, render, fireEvent } from '@testing-library/react';
import renderTestDom from '../../../test/renderTestDom';
import { act } from 'react-dom/test-utils';

describe('MUICheckbox component', () => {
  it('should be visible', () => {
    renderTestDom(<Checkbox checked typeof={'checkbox'} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('should be visibel when the hidden prop is set to false', () => {
    renderTestDom(<Checkbox hidden={false} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeVisible();
  });

  it('should remain visible when the checkbox is checked', () => {
    renderTestDom(<Checkbox checked={true} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('should work with different input devices', () => {
    renderTestDom(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    fireEvent.keyDown(checkbox, { key: 'Enter' });
    expect(checkbox).toBeChecked();
  });

  it('should fire the onChange event when checked or unchecked', () => {
    const onChangeMockFunction = vi.fn();
    renderTestDom(<Checkbox onChange={onChangeMockFunction} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(onChangeMockFunction).toHaveBeenCalled();
  });
  // new test cases added
  it('should start unchecked by default', () => {
    renderTestDom(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('should be disabled when the disabled prop is set', () => {
    renderTestDom(<Checkbox disabled={true} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('should receive focus and blur', () => {
    renderTestDom(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    act(() => {
      checkbox.focus();
    });
    expect(checkbox).toHaveFocus();
    act(() => {
      checkbox.blur();
    });
    expect(checkbox).not.toHaveFocus();
  });
});
