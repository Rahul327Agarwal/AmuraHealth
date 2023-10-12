import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import Token from './MUIToken';
import { screen, fireEvent, render } from '@testing-library/react';
import renderTestDom from '../../../test/renderTestDom';

describe('MUIToken component', () => {
  it('should render the chip', () => {
    renderTestDom(<Token />);
    const token = screen.getByTestId('token');
    expect(token).toBeInTheDocument();
  });

  it('should have the correct text', () => {
    renderTestDom(<Token label={'MY Token'} />);
    const token = screen.getByTestId('token');
    expect(token).toHaveTextContent('MY Token');
  });

  //   it('should fire the onDelete event when deleted', () => {
  //     const onDeleteFunction = vi.fn();
  //     renderTestDom(<Token  label={'MY Token'} onDelete={onDeleteFunction} />);
  //     const token = screen.getByTestId('token');
  //     fireEvent.click(token);
  //     expect(onDeleteFunction).toHaveBeenCalled();
  //   });

  it('should work with different input devices', () => {
    renderTestDom(<Token />);
    const token = screen.getByTestId('token');
    fireEvent.keyDown(token, { key: 'Enter' });
    fireEvent.click(token);
    expect(token).toBeEnabled();
  });
  it('should call the onclick callback when clicked', () => {
    const onClickMock = vi.fn();
    renderTestDom(<Token onClick={onClickMock} />);
    const token = screen.getByTestId('token');
    fireEvent.click(token);
    expect(onClickMock).toHaveBeenCalled();
  });
});
