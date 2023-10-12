import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import Radio from './MUIRadio';
import { screen, fireEvent } from '@testing-library/react';
import renderTestDom from '../../../test/renderTestDom';

describe('MUIRadio component', () => {
  it('should be visible', () => {
    renderTestDom(<Radio />);
    const radio = screen.getByRole('radio');
    expect(radio).toBeInTheDocument();
  });

  it('should be visibel when the hidden prop is set to false', () => {
    renderTestDom(<Radio hidden={false} />);
    const radio = screen.getByRole('radio');
    expect(radio).not.toBeVisible();
  });

  it('should remain visible when the checkbox is checked', () => {
    renderTestDom(<Radio checked={true} />);
    const radio = screen.getByRole('radio');
    fireEvent.click(radio);
    expect(radio).toBeChecked();
  });

  it('should work with different input devices', () => {
    renderTestDom(<Radio />);
    const radio = screen.getByRole('radio');
    fireEvent.click(radio);
    fireEvent.keyDown(radio, { key: 'Enter' });
    expect(radio).toBeChecked();
  });

  it('should fire the onChange event when checked or unchecked', () => {
    const onChangeMockFunction = vi.fn();
    renderTestDom(<Radio onChange={onChangeMockFunction} />);
    const radio = screen.getByRole('radio');
    fireEvent.click(radio);
    expect(onChangeMockFunction).toHaveBeenCalled();
  });
});
